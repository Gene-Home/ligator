
angular.module('ligatorApp')
.controller('SignUpCtrl',['$scope','$http','SignUpService',
		function($scope,$http,SignUpService){
			$scope.user={};		
            $scope.signUp = function(){
			$scope.user.group='testgroup';

		SignUpService.signUp($scope.user)	
		.then(function(success){
			alert(success);
		},function(failure){
			alert(failure);
		});
	
	};

}]);
