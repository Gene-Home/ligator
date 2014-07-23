
angular.module('ligatorApp')
.controller('SignUpCtrl',['$scope','$http','SignUpService',
		function($scope,$http,SignUpService){
			$scope.user={};		
            $scope.signUp = function(){
			$scope.user.group='testgroup';


		// send user & true to tell the service
		// to send an email	
		SignUpService.signUp($scope.user,true)	
		.then(function(success){
			alert(success);
		},function(failure){
			alert(failure);
		});
	
	};

}]);
