
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


ligatorServices.service('TagServicexx',['$q','$http',
    function($q,$http){
        this.getAllTags = function(tag_name){
            var deferred = $q.defer();
            $http({method: 'GET', url: '/GeneHive/api/v2/EntityQuery/DistinctVariableValues/' + tag_name}).
                success(function(data, status, headers, config) {
                    deferred.resolve(data);
                }
            ).
                error(function(data, status, headers, config) {
                    deferred.reject();
                }
            );
            return deferred.promise;
        }
        // returns the entities that contain 'seeking_tags' or 'offering_tags'
        // variable values that match the seeking and offering parameters
        this.searchEntitiesxx = function(seeking,offering){
            var deferred = $q.defer();
            var qparams = "";
            for(i in seeking){
                qparams += "&seeking_tags=" + seeking[i];
            }
            for(i in offering){
                qparams += "&offering_tags=" + offering[i];
            }
            // always remove the first char 
            qparams = qparams.substring(1,qparams.length);
            
            $http({method: 'GET', url: '/GeneHive/api/v2/EntityQuery/Any?' + qparams}).
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
]); // end tag service
