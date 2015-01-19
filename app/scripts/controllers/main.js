'use strict';

/**
 * @ngdoc function
 * @name ligatorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ligatorApp
 */
angular.module('ligatorApp')
  .controller('MainCtrl', ['$scope','$rootScope','$resource','$state','Entity',
    function ($scope,$rootScope,$resource,$state,Entity)  {
  	$scope.searchResults = {};
    // Not sure why we cant just
    // put the query tags directly
    // on $scope - but we need an object
    $scope.queryTags = {};
    $scope.queryTags.seekingQueryTags = [];
    $scope.queryTags.offeringQueryTags = [];
  	$scope.loadTags = function(){
      // load up all the possible tags 
      // first
      Entity.distinctValues({variableName:'seeking_tags'}).$promise.then(
      function(success){
        $scope.allTags = success;
        Entity.distinctValues({variableName:'seeking_tags'}).$promise.then(
          function(success){
            // iterate over and only add non-existant ones
            for(var i=0; i<success.length; i++){
              if($scope.allTags.indexOf(success[i]) < 0){
                $scope.allTags.push(success[i]);    
              }
            }
          },
          function(failed){
            alert(failed)
          //alert('something went wrong' + failed);
          }  
        )
      },
      function(failure){
        alert("bad " + failure)
      }
      )
    }// end loadTags

    
    $scope.searchSystem = function(){
    	// hmm
    	// hack and I know it
    	TagService.searchEntities($scope.queryTags.seekingQueryTags,$scope.queryTags.offeringQueryTags).then(
    		function(success){
    			$scope.searchResults = success;
    		},
    		function(failure){
    			alert('bad searching ' + failure);
    		}
    	)
    }
    // check to see if the user is logged in , if not then 
    // need to shove the signup page in his face
    if($rootScope.currentUser == null){
      $state.go('signup');
    }
   	$scope.loadTags(); 
  }]);
