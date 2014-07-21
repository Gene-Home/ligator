angular.module('ligatorApp')
  .controller('UserHomeCtrl',['$scope','$rootScope','$http','AuthService','ProfileService','EntityService',
   function ($scope,$rootScope,$http,AuthService,ProfileService,EntityService) {

    // Start off showing home
    $scope.subview = 'showHome';
    // for the moment , hacking around the 
    // fact that I need to obtain my tag variable
    // from a field of on object in $scope rather
    // than directly on $scope itself .. not sure why
    $scope.newTag = {};
    $scope.userProfile = {class:'profile'};
    $scope.loadUser = function(){
      ProfileService.getProfile($rootScope.currentUser).then(
        function(success){
          // returns the profile
          $scope.userProfile = success;
        },
        function(failed){
          // we really should know if it was not there
          // or something bad happened
          //alert('something went wrong' + failed);
        }
        )
    }
    $scope.loadUser();
    $scope.addTag = function(){
      if(!$scope.userProfile.tags ){
        $scope.userProfile.tags = [];
      }
      // see if the tag exists
      // if not add it
      // add the tag to the profile
      if($scope.newTag.value){
        $scope.userProfile.tags.push($scope.newTag.value);
      }
    }
    $scope.getView = function(){
      if ($scope.subview == 'showHome'){
          return 'views/userhome.html'
      }else{
        return 'views/editProfile.html'
      }
    }

    $scope.showUserHome = function(){
      $scope.subview = 'showHome';
    }
    $scope.showEditProfile = function(){
      $scope.subview = 'editProfile';

    }
    $scope.updateProfile = function(){
      // check to see if this is to create 
      // or update
      if($scope.userProfile.name == null){
        $scope.addProfile();
      }else{

      EntityService.update({ ename:$rootScope.currentUser }, $scope.userProfile).$promise.then(
        function(success){
          $scope.showUserHome();     
          //alert('good line 32 ' + success)
        },
        function(failure){
          alert('bad line 35 ' + failure)
        }

      )
    }
    };
    $scope.addProfile = function(){
      // HAVE TO MAKE SURE TO SET THE NAME FIELD
      // BEFORE A CREATE
      $scope.userProfile.name = $rootScope.currentUser;
      EntityService.create({},$scope.userProfile).$promise.then(
        function(success){
          $scope.showUserHome();     
          //alert('good line 32 ' + success)
        },
        function(failure){
          alert('bad line 35 ' + failure)
        }

      )
    };
    $scope.things = {};
    $scope.things.xx = 1;
    $scope.things.yy = 2;
    $scope.things.z ;
    $scope.adder = function(){
      $scope.things.z = $scope.things.xx + $scope.things.yy
    }
  }]);