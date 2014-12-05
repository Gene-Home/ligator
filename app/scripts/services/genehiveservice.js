//'use strict';

/**
 * @ngdoc service
 * @name ligatorApp.geneHiveService
 * @description
 * # geneHiveService
 * Service in the ligatorApp.
 */
var geneHiveServices = angular.module('geneHiveServices', ['ngResource']);

geneHiveServices.SUCCESS = {};
geneHiveServices.ERROR = {};
geneHiveServices.SUCCESS.USER_CREATED_NO_EMAIL = 'X';
geneHiveServices.SUCCESS.USER_CREATED_WITH_EMAIL = 'Y';
geneHiveServices.ERROR.USER_CONFIRMATION_EMAIL = 'Z';
geneHiveServices.ERROR.USER_CREATION = 12;
geneHiveServices.ERROR.BAD_USER_OBJECT = 23;


/**
* Use the following:
* for profile
* {
    "name": "userName",
    "class": "profile",
    "description": "i like to do stuff",
    "offering": "lots of painting",
    "seeking": "someone who can clean"
}
* for project
*/
geneHiveServices.factory('EntityService',['$resource',
  	function($resource){
    	return $resource('/GeneHive/api/v2/Entities/:ename', {}, {
      		update: {method:'PUT'},
      		create: {method:'POST'},
          query:{method:'GET', isArray:true},
          all:{
                method:'GET',
                url:'/GeneHive/api/v2/EntityQuery/All',
                isArray:true
              },
          any:{
                method:'GET',
                url:'/GeneHive/api/v2/EntityQuery/Any',
                isArray:true
              } 
    	});
  	}]
 );// end Entity service
geneHiveServices.factory('Entity',['$resource',
    function($resource){
      return $resource('/GeneHive/api/v2/Entities/:entityname', {entityname:'@name'}, {
          update:{
            method:'PUT'
          },
          create:{
            method:'POST',
            url: '/GeneHive/api/v2/Entities/'
          },
          query:{method:'GET', isArray:true},
          matchAll:{
                method:'GET',
                url:'/GeneHive/api/v2/EntityQuery/All',
                isArray:true
              },
          matchAny:{
                method:'GET',
                url:'/GeneHive/api/v2/EntityQuery/Any',
                isArray:true
              } 
      });
    }]
 );// end Entity service

geneHiveServices.service('SignUpService',['$q','$http',
    function($q,$http){
        /**
         * Creates a new User in the systems and sends out a confirmation
         * email to the new User's email address. The body of the email is determined
         * by GeneHive's Configuration: template.password-reset-url-body.
         * @param newUser - an object with {username,email,group}
         * @param sendEmail - if true, will send a confirmation email the the
         * user and the user. If false, the user must me manually confirmed by
         * a super user.
         *
         */
        this.signUp = function(newUser,sendEmail){
            var deferred = $q.defer();
            var goodUser = true;
            var errorString = "";
            if(newUser.username == null){
                goodUser = false;
                errorString += " username field is missing "
            }
            if(newUser.email == null){
                goodUser = false;
                errorString += " email field is missing "
            }
            if(newUser.group == null){
                goodUser = false;
                alert('Hey ther user group is fales');
                errorString += " group field is missing "
            }
            if(!goodUser){
                alert('Hey I am returing something bad!');
                deferred.reject([geneHiveServices.ERROR.BAD_USER_OBJECT,errorString]);
                return deferred.promise;
            }
            //OK now we have a good user!

            // first create the user - then send email
            // to user for confirmation
            $http.post('/GeneHive/api/v2/Users',newUser).
                then( function(response){
                    if(sendEmail) {
                        var emailJson = {};
                        emailJson.email = response.data.email;
                        emailJson = angular.toJson(emailJson);
                        $http.post('/GeneHive/api/v2/ConfirmUser', emailJson).
                            then(function(response){
                                deferred.resolve([geneHiveServices.SUCCESS.USER_CREATED_WITH_EMAIL,response]);
                            },function(reason){
                                console.log(reason);
                                deferred.reject([geneHiveServices.ERROR.USER_CONFIRMATION_EMAIL,reason]);
                            });
                    }else{
                       deferred.resolve([geneHiveServices.SUCCESS.USER_CREATED_NO_EMAIL,response]);
                    }
                },function(reason){// reject the new user POST
                    console.log(reason);
                    deferred.reject([geneHiveServices.ERROR.USER_CREATION,reason])
                }
            );
            return deferred.promise;
        }; // end signUp
    }
]);// end SignUp service
/**
* The AuthSerice provides the following:
* login - logs a user in to the system - meaning that:
*  - the user's username and password are checked against the genehive server and are valid
*  - if valid the username is stored in the $rootScope as 'currentUser'
*  - if valid the user's username and password are stored in the header's of every subsequent
*     http request as Auth Basic until the user is explicitly logged out
*  - its is stored in a cookie so that the user can reload the site
* logout - removes the user's credentials from the cookie store, the header and the $rootScope
* remindPassword - sends a password reminder to the user with the given email assuming it exists
* confirmUser - accepts an incomming token and confirms/activates the user
*/
 geneHiveServices.service('AuthService', ['$rootScope','$q','$base64', '$cookieStore', '$http', 
 		function ($rootScope,$q,$base64, $cookieStore, $http) {
        setCredentials = function (username, password) {
                var encoded = $base64.encode(username + ':' + password);
                $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
                $cookieStore.put('authdata', encoded);
            };
        clearCredentials = function () {
            document.execCommand("ClearAuthenticationCache");
            $cookieStore.remove('authdata');
            $http.defaults.headers.common.Authorization = 'Basic ';
        };
      /**
      * Sets the user's creds in the header
      * and sets the current username in rootScope as 'currentUser' 
      */  
      this.cookieLogin = function(){
        var authData = $cookieStore.get('authdata');
        if (authData){
          $http.defaults.headers.common['Authorization'] = 'Basic ' + authData;
          var ua = $base64.decode(authData);
          $rootScope.currentUser = ua.split(":")[0];
          return true;
        }else{
          return false;
        }
      }  
      this.getCurrentUsername = function(){
        return this.currentUsername;
      }
      /**
      * Removes the username/password from header and 
      * removes current user from rootScope
      */
      this.logout = function(){
        clearCredentials();
        delete($rootScope.currentUser);

      }
      this.remindPassword = function(email){
        var deferred = $q.defer();
        var postBody = '{"email" :' +  email + '}';
        $http.post('/GeneHive/api/v2/PasswordTokens',postBody).
        then(function(success){
          deferred.resolve();
          },function(fail){
            deferred.reject(fail);
          }
        )
        return deferred.promise;
      }// end remindPassword

      // initialize to whatever is in the cookie, if anything
      this.login = function(username,password){
    	 var deferred = $q.defer();
    	 setCredentials(username,password);
        
       
        this.currentUsername = username;
 		   $http({method: 'GET', url: '/GeneHive/api/v2/CheckPassword',params:{username:username,password:password}}).
    		success(function(data, status, headers, config) {
    			if(data['correct']){
            // set the current user to the name that was sent
            $rootScope.currentUser = config.params.username;    
    				$http.defaults.headers.common['Authorization'] = 'Basic ' + $cookieStore.get('authdata');			
    				deferred.resolve();	
    			}else{
    				var dfdf = 43;
    				clearCredentials();	
    				deferred.reject("this failed!!");	
    			}	
    		}).
    		error(function(data, status, headers, config) {
      			// called asynchronously if an error occurs
      			// or server returns response with an error status.
      			clearCredentials();
      			deferred.reject("this failed!!");
    		})
    	return deferred.promise;
    }
    this.activateUser = function(username,token){
            var deferred = $q.defer();
            var tok = {};
            tok.token = token;
            tok = angular.toJson(tok);
            $http.put('/GeneHive/api/v2/Users/' + username,{"token":token}).then(
                function(response){
                    // worked well so lets put this guy's creds in the header
                    //var username = response.data.username;
                    //var password = response.data.password;
                    // we do not get the password so we cant just 
                    // log him in
                    //setCredentials(username,password);
                    deferred.resolve(response);
                },function(reason){
                    console.log(reason);
                    deferred.reject('something is wrong: ' + reason);

                })
            return deferred.promise;
    };
    /**
    * Sends a new password and restet token to the system.
    * Does not set the User's creds in the cookie
    */
    this.resetPassword = function(username,password,token){
            var deferred = $q.defer();
            var tok = {};
            tok.token = token;
            tok = angular.toJson(tok);
            $http.put('/GeneHive/api/v2/Users/' + username,{"token":token,"password":password}).then(
                function(response){
                    deferred.resolve('ok');
                },function(reason){
                    deferred.reject('something is wrong');
                })
            return deferred.promise;
    }

}]);
geneHiveServices.service('ConfirmationService2',['$q','$http','AuthService',
    function($q,$http,AuthService){
        this.confirmUser = function(username,token){
            var deferred = $q.defer();
            var tok = {};
            tok.token = token;
            tok = angular.toJson(tok);
            $http.put('/GeneHive/api/v2/Users/' + username,{"token":token}).then(
                function(response){
                    // worked well so lets put this guy's creds in the header
                    var username = response.data.username;
                    var password = response.data.password;
                    AuthService.setCredentials(username,password);
                    deferred.resolve('ok');
                },function(reason){
                    deferred.reject('something is wrong');
                })
            return deferred.promise;
        }

    }
]);
