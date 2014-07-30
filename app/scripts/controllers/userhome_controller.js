angular.module('ligatorApp')
  .controller('UserHomeCtrl',['$scope','$rootScope','$http','AuthService','ProfileService','EntityService','TagService',
   function ($scope,$rootScope,$http,AuthService,ProfileService,EntityService,TagService) {

    // Start off showing home
    $scope.subview = 'showHome';
    // for the moment , hacking around the 
    // fact that I need to obtain my tag variable
    // from a field of on object in $scope rather
    // than directly on $scope itself .. not sure why
    $scope.newTag = {};
    $scope.userProfile = {class:'profile'};
    $scope.userProject = {class: 'project'};


    $scope.loadUser = function(){
      ProfileService.getProfile($rootScope.currentUser).then(
        function(success){
          // returns the profile
          $scope.userProfile = success;
          //then we load the projects
          $scope.loadProjects();
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
      }
      if($scope.subview =='editProfile'){
        return 'views/editProfile.html'
      }
      if($scope.subview == 'editProject'){
        return 'views/editProject.html'
      }
    }

    $scope.showUserHome = function(){
      // load the projects
      $scope.loadProjects();
      $scope.subview = 'showHome';
    }
    $scope.showEditProfile = function(){
      // load up all the possible tags 
      // first
      TagService.getAllTags('seeking_tags').then(
        function(success){
          $scope.allTags = success;
          TagService.getAllTags('offering_tags').then(
            function(success){
                $scope.allTags.push.apply($scope.allTags,success);
            
              //$scope.allTags += success;
              $scope.subview = 'editProfile';
            },
            function(failure){
              alert("bad in offering " + failure)
            })
            
        },
        function(failure){
          alert("bad " + failure)
        }
        )
    }
    $scope.showEditProject = function(){
      $scope.subview = 'editProject'
    }
    $scope.updateProfile = function(){
      // check to see if this is to create 
      // or update
    //  $scope.userProfile.seeking_tags = ["dogs","cats","birds","tigers"];
    //  $scope.userProfile.offering_tags = ["bikes","cars","planes","trains"];
      if($scope.userProfile.name == null){
        $scope.addProfile();
      }else{

      EntityService.update({ ename:$scope.userProfile.name }, $scope.userProfile).$promise.then(
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
      $scope.userProfile.name = $rootScope.currentUser+'-profile';
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
    $scope.addProject = function(){
      $scope.userProject.name = $rootScope.currentUser + $scope.userProject.title;
      $scope.userProject.status = "0";
      EntityService.create({},$scope.userProject).$promise.then(
        function(success){
          $scope.showUserHome();     
          //alert('good line 32 ' + success)
        },
        function(failure){
          alert('bad line 35 ' + failure)
        }

      )   
    }
    $scope.loadProjects = function(){
      
      EntityService.query({status:0}).$promise.then(
        function(success){
        $scope.userProjects = success;    
        },
        function(failure){
          alert("BAD PROJECTS " + failure)
        }
        )
    }
    $scope.things = {};
    $scope.things.xx = 1;
    $scope.things.yy = 2;
    $scope.things.z ;
    $scope.adder = function(){
      $scope.things.z = $scope.things.xx + $scope.things.yy
    }
  }]);