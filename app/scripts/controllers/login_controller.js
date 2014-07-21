
angular.module('ligatorApp')
  .controller('LoginCtrl',['$scope','$rootScope','$http','$state','AuthService',
   function ($scope,$rootScope,$http,$state,AuthService) {

     
      $scope.reminding = false;
      $scope.login = function(){
    	 var uname = $scope.userName;
    	 var password = $scope.password;


    	 AuthService.login(uname,password)
    		  .then(function success(data) {
            // show the users profile
            // this should hand off to another state
            // profile view state
            //$rootScope.currentUser = data;
            $state.go('userHome');
  					console.log('Success!', data);
			 }, function error(msg) {
            // let him know that he does not have one
            // if the code is 2 
            // otherwise something is broken 
  		  		console.error('Failure!', msg);
			 });
    }// end login

    $scope.remindPassword = function () {

      AuthService.remindPassword($scope.email).then(
        function(success){
          alert('Email Sent');
          $scope.reminding = false;
        },function(fail){
          alert("Problem " + failed);
      })
    };// end createClass



    if($state.current.data.logging_in){
        $scope.login();
      } else{
        $scope.logout();
      }
      $scope.logout = function(){
        AuthService.logout();

    }
  }]);