//'use strict';

/**
 * @ngdoc service
 * @name ligatorApp.geneHiveService
 * @description
 * # geneHiveService
 * Service in the ligatorApp.
 */

var geneHiveServices = angular.module('geneHiveServices', ['ngResource']);


geneHiveServices.factory('User',['$resource',
  	function($resource){
    	return $resource('/GeneHive/api/v2/Users/:uname', {}, {
      		query: {method:'GET', isArray:true},
      		update: {method:'PUT'},
      		create: {method:'POST'}
    	});
  	}]
 );// end User service

geneHiveServices.factory('SignUp',['$http',
    function($http){
      var signup = function(userJson){
        $http({method: 'POST', data:,url: '/GeneHive/api/v2/Users'}).
        then( function(user){
            var userEmail = user['email'];
             $http.post('/GeneHive/api/v2/ConfirmUser',userEmail);
          },function(reason){
            alert('falied: ' + reason);
          },function(update){
            alert('Got It: ' + update);
          }
        )
      } // end signup
    ]
 );// end User service
 geneHiveServices.service('AuthService', ['$q','$base64', '$cookieStore', '$http', 
 		function ($q,$base64, $cookieStore, $http) {
 	    var setCredentials = function (username, password) {
            var encoded = $base64.encode(username + ':' + password);
            $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
            $cookieStore.put('authdata', encoded);
    	};
      var clearCredentials = function () {
            document.execCommand("ClearAuthenticationCache");
            $cookieStore.remove('authdata');
            $http.defaults.headers.common.Authorization = 'Basic ';
      };
      // initialize to whatever is in the cookie, if anything
      this.login = function(username,password){
    	 var deferred = $q.defer();
    	 setCredentials(username,password);
 		   $http({method: 'GET', url: '/GeneHive/api/v2/CheckPassword',params:{username:username,password:password}}).
    		success(function(data, status, headers, config) {
    			if(data['correct']){
    				$http.defaults.headers.common['Authorization'] = 'Basic ' + $cookieStore.get('authdata');			
    				deferred.resolve("it worked!");	
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
}]);
