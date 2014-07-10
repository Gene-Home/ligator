
/*
angular.module('ligatorApp')
.controller('AuthCtlr',['$scope','$http','AuthService',
		function($scope,$http,AuthService){

	$scope.login = function(){

	}







}])
*/
angular.module('ligatorApp')
  .controller('AuthCtrl',['$scope','$http','AuthService',
   function ($scope,$http,AuthService) {
    $scope.login = function(){
    	var uname = $scope.userName;
    	var password = $scope.password;
    	AuthService.login(uname,password)
    		.then(function success(data) {
  					console.log('Success!', data);
			}, function error(msg) {
  				console.error('Failure!', msg);
			});
    }
  }]);