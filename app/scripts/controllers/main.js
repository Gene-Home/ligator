'use strict';

/**
 * @ngdoc function
 * @name ligatorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ligatorApp
 */
angular.module('ligatorApp')
  .controller('MainCtrl', function ($scope,$resource,TagService) {
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
                // iterate over and only add non-existant ones
                for(var i=0; i<success.length; i++){
                  if($scope.allTags.indexOf(success[i]) < 0){
                    $scope.allTags.push(success[i]);    
                  }
                }
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
    $scope.testSystem = function(){
  
     var Profile = $resource('/GeneHive/api/v2/Entities',{},
        {get: {method:'GET', isArray:true}}
      );
     $scope.ps = Profile.get({name:'root-profile'},function(){
        var eee = 32;
        var mmm = 21;

     })

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
