
var ligatorServices = angular.module('ligatorServices', ['ngResource']);


/**
* CRUD service for the profile
* 
*/

ligatorServices.ERROR = {}
ligatorServices.SUCCESS = {}
ligatorServices.ERROR.USERNAME_NOT_PROVIDED = 1;
ligatorServices.ERROR.PROFILE_NOT_FOUND = 2;
ligatorServices.ERROR.PROFILE_NOT_FOUND = 3;


ligatorServices.service('TagService',['$q','$http',
    function($q,$http){
        this.getAllTags = function(tag_name){
            var deferred = $q.defer();
            var qparams = "distinct=" + tag_name;

            $http({method: 'GET', url: '/GeneHive/api/v2/Entities?' + qparams}).
            success(function(data, status, headers, config) {
                deferred.resolve(data);
                }
            ).
            error(function(data, status, headers, config) {
                deferred.reject();
                }
            )
            return deferred.promise;
        }
        // an array of tag:csvValues
        this.searchEntities = function(seeking,offering){
        var deferred = $q.defer();
        var qparams = "seeking_tags=" + seeking + "&offering_tags=" + offering
        
         $http({method: 'GET', url: '/GeneHive/api/v2/Tags?' + qparams}).
            success(function(data, status, headers, config) {
                deferred.resolve(data);
                }
            ).
            error(function(data, status, headers, config) {
                deferred.reject();
                }
            )
            return deferred.promise;   
        }
        
    }

    ]);

ligatorServices.service('ProfileService',['$q','$http',
    function($q,$http){
    	
    	this.getProfile = function(username){
    		var deferred = $q.defer();
    		if(username == null){
    			deferred.reject('ligatorServices.ERROR.USERNAME_NOT_PROVIDED');
                return deferred.promise;
    		}
    		$http.get('/GeneHive/api/v2/Entities/' + username + '-profile').then(
    			function(response){
    				deferred.resolve(response.data);
    			},
    			function(reason){
    				deferred(ligatorServices.ERROR.PROFILE_NOT_FOUND);
    			})
    		return deferred.promise;
    	};

    	this.getProfiles = function(){
    		var deferred = $q.defer();
    		$http.get('/GeneHive/api/v2/Entities/').then(
    			function(response){
    				deferred.resolve(response);
    			},
    			function(reason){
    				// something bad happened
    				deferred.reject(reason);
    			})
    		return deferred.promise;
    	};
    }
    ])