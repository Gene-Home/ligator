/**
Activate a new user via a url with a username and token parameter. 
This will activate the user in the system. Once activated, he is 
allowed to log in but has no profile still.
**/
angular.module('ligatorApp')
.controller('ActivateCtrl',['$scope','$http','$location','EntityService','AuthService',
	function($scope,$http,$location,EntityService,AuthService){
			
		$scope.init = function () {
			var qparams = $location.search();
			var username = qparams.username;
			var token = qparams.token;
			$scope.success = true;
			if(username == null || token== null){
				$scope.success = false;
			}else{
				AuthService.activateUser(username,token)	
					.then(function(success){
						$scope.success = true;
					},function(failure){
						$scope.success = false;
					});
			}
		}
		$scope.init();
	}
]);
