/**
Confirm a new user via a url with a username and token parameter. 
This will activate the user in the system. Once activated, he is 
allowed to log in but has no profile still.
**/
angular.module('ligatorApp')
.controller('ConfirmCtrl',['$scope','$http','$location','EntityService','AuthService',
	function($scope,$http,$location,EntityService,AuthService){
			
		$scope.init = function () {
			var qparams = $location.search();
			var username = qparams.username;
			var token = qparams.token;
			if(username == null || token== null){
				$scope.success = false;
				$scope.confirmedMessage = "This is a bogus request, please try again";
			}else{
				AuthService.confirmUser(username,token)	
					.then(function(success){
						alert(success);
					},function(failure){
						alert(failure);
					});
			}
		}
		$scope.init();

	}
]);
