'use strict';

/**
 * @ngdoc function
 * @name ligatorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ligatorApp
 */
angular.module('ligatorApp')
  .controller('MainCtrl', function ($scope,TagService) {
  	$scope.searchResults = {};
  	$scope.seekingTags = [];
  	$scope.loadTags = function(){
      // load up all the possible tags 
      // first
      TagService.getAllTags('seeking_tags').then(
        function(success){
          $scope.allTags = success;
          TagService.getAllTags('offering_tags').then(
            function(success){
                $scope.allTags.push.apply($scope.allTags,success);
            
            },
            function(failure){
              alert("bad in offering " + failure)
            })
            
        },
        function(failure){
          alert("bad " + failure)
        }
        )
    }

    $scope.searchSystem = function(){
    	// hmm
    	// hack and I know it
    	TagService.searchEntities($scope.seekingQueryTags,$scope.offeringQueryTags).then(
    		function(success){
    			$scope.searchResults = success;
    		},
    		function(failure){
    			alert('bad searching ' + failure);
    		}
    	)
    }
   	$scope.loadTags(); 
  });
