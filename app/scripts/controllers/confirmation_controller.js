
angular.module('ligatorApp')
.controller('ConfirmCtrl',['$scope','$http','$location','ConfirmationService','EntityService','AuthService',
		function($scope,$http,$location,ConfirmationService,EntityService,AuthService){
			
			$scope.userConfirmed = true;
			$scope.confirmedMessage = "";
            $scope.member = {};
            $scope.createMember = function(){
                EntityService.create($scope.member).then(
                    function(success){
                        alert('I suceess');
                    },
                    function(failure){
                        alert("I fail")
                    }
                )
            }
			var singInUser = function(){

			}
			$scope.init = function () {
				var qparams = $location.search();
				var username = qparams.username;
				var token = qparams.token;
				if(username == null || token== null){
					$scope.success = false;
					$scope.confirmedMessage = "This is a bogus request, please try again";
				}else{
					ConfirmationService.confirmUser(username,token)	
						.then(function(success){
                           console.log('Success!', data);
							$scope.userConfirmed = true;
							alert(success);
						},function(failure){
							alert(failure);
						});
				}
    		
			
		}
		$scope.user={};
		$scope.init();

}]);
