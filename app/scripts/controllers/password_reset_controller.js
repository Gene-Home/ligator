angular.module('ligatorApp')
  .controller('PasswordResetCtrl',['$scope','$location','AuthService',
   function ($scope,$location,AuthService) {

   		$scope.init = function () {
			var qparams = $location.search();
			$scope.username = qparams.username;
			$scope.chnagetoken = qparams.token;
		}
		$scope.changePassword = function(){
			if($scope.password1 == $scope.password2){
				AuthService.resetPassword($scope.username,$scope.password1,$scope.token).then(
					function(success){
						$scope.successMessage = "Password Successfully Reset"
					},function(failure){
						$scope.failureMessage = "Password Reset has Failed"
					}
				)	
			}else{
				$scope.failureMessage = "Passwords Do Not Match";
			}
			
		}
		$scope.init();

	}
])