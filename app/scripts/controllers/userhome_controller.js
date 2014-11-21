angular.module('ligatorApp')
  .controller('UserHomeCtrl',['$scope','$rootScope','$http','AuthService','Entity','TagService','$state',
   function ($scope,$rootScope,$http,AuthService,Entity,TagService,$state) {

    // for the moment , hacking around the
    // fact that I need to obtain my tag variable
    // from a field of on object in $scope rather
    // than directly on $scope itself .. not sure why
    $scope.newTag = {};


    $scope.loadUser = function(){
      Entity.matchAll({username:$rootScope.currentUser,class:'member'}).$promise.then(
        function(success){
          // returns the member -- maybe does not exist yet
          // if so we need to create one
          if(success.length > 0){
            $scope.member = success[0];
          }else{
            $scope.member = new Entity({class:'member'});
          }
          //then we load the projects ...
          $scope.loadProjects();
          $scope.loadOrganizations();
        },
        function(failed){
          alert(failed)
          // we really should know if it was not there
          // or something bad happened
          //alert('something went wrong' + failed);
        }
      )
    }
    $scope.loadUser();

    $scope.addTag = function(entityObject,tagCollection){
      if(!$scope.member.seeking_tags ){
        $scope.member.seeking_tags = [];
      }
      // see if the tag exists
      // if not add it
      // add the tag to the member
      if($scope.newTag.newTag){
        $scope.member.seeking_tags.push($scope.newTag.newTag);
      }
    }


    $scope.showUserHome = function(message){
      $scope.successMessage = message;
      $scope.loadProjects();
      $scope.loadOrganizations();
      $state.go('user.home');
    }
    $scope.showEditOrganization = function(orgName){
      Entity.matchAll({orgname:orgName,class:'organization'},
        function(success){
          $scope.userOrg = success[0];
          $scope.isNew = false;
          $scope.loadAllTags('user.editOrganization');

        },
        function(failure){
          alert('bad project loading org')
        }
      )
    }
    $scope.showEditMember = function(){
      // load up all the possible tags
      TagService.getAllTags('seeking_tags').then(
        function(success){
          $scope.allTags = success;
          TagService.getAllTags('offering_tags').then(
            function(success){
                $scope.allTags.push.apply($scope.allTags,success);

              //$scope.allTags += success;
              //$scope.subview = 'editMember';
              $state.go('user.editMember');
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
    $scope.showEditProject = function(projectTitle){

      Entity.matchAll({title:projectTitle,class:'project'},
        function(success){
          $scope.userProject = success[0];
          $scope.isNew = false;
          $scope.loadAllTags('user.editProject');

        },
        function(failure){
          alert('bad project loading')
        }
      )
    }
    $scope.showCreateProject = function(){
      if(angular.isUndefined($scope.userProject)){
          $scope.userProject = new Entity({class:'project'});
        }
      $scope.isNew = true;
      $scope.loadAllTags('user.editProject');
    }
    $scope.showCreateOrganization = function(){
      if(angular.isUndefined($scope.userOrg)){
          $scope.userOrg = new Entity({class:'organization'});
        }
      $scope.isNew = true;
      $scope.loadAllTags('user.editOrganization');
    }
    $scope.updateMember = function(){
      // check to see if this is to create
      // or update
      //  $scope.member.seeking_tags = ["dogs","cats","birds","tigers"];
      //  $scope.member.offering_tags = ["bikes","cars","planes","trains"];
      // assume if memeber has a null username, the member has yet to be created
      if($scope.member.username == null){
        $scope.addMember();
      }else{
        $scope.member.$update(
        function(success){
          $scope.showUserHome("Your Profile Has Been Updated!");
          //alert('good line 32 ' + success)
        },
        function(failure){
          alert('bad line 35 ' + failure)
        }

      )
    }
    };
    $scope.addMember = function(){
      $scope.member.username = $rootScope.currentUser;
      // the name property must be unique for every entity
      // in the system so lets make one up - perhaps this functionality
      // belongs somewhere more centralized -- perhaps always username + class??
      $scope.member.name = 'member-' + $scope.member.username;
      $scope.member.$create(function(success){
          // go back to the home page with a nice message
          $scope.showUserHome("Your Profile Has Been Updated!");
          //alert('good line 32 ' + success)
        },
        function(failure){
          alert('bad line 137 ' + failure)
        }

      )
    };

    $scope.addOrganization = function(){
      $scope.userOrg.class = 'organization';
      $scope.userOrg.username = $rootScope.currentUser;
      $scope.userOrg.name = 'organization-'+ $scope.userOrg.orgname;
      $scope.userOrg.$create(
        function(success){
          $scope.showUserHome("Created a new Org: " + $scope.userOrg.orgname);
          //alert('good line 32 ' + success)
        },
        function(failure){
          alert('bad line 134 ' + failure)
        }

      )
    };
    $scope.updateProject = function(){
      $scope.userProject.$update(
        function(success){
          $scope.showUserHome("Your Project Has Been Updated!");
          //alert('good line 32 ' + success)
        },
        function(failure){
          alert('bad line 170 ' + failure)
        }
      )
    }
    $scope.updateOrganization = function(){
      $scope.userOrg.$update(
        function(success){
          $scope.showUserHome("Your Organization Has Been Updated!");
          //alert('good line 32 ' + success)
        },
        function(failure){
          alert('bad line 181 ' + failure)
        }
      )
    }
    $scope.addProject = function(){
      $scope.userProject.username = $rootScope.currentUser;
      // again, using class & something else to create a name
      $scope.userProject.name = 'project-' + $scope.userProject.title;
      $scope.userProject.$create(
        function(success){
          $scope.showUserHome("Your Project: " + $scope.userProject.title + " has been created!");
          //alert('good line 32 ' + success)
        },
        function(failure){
          alert('bad line 164 ' + failure)
        }

      )
    }
    $scope.loadProjects = function(){
      // just give a
      Entity.matchAll({username:$rootScope.currentUser,class:'project'}).$promise.then(
        function(success){
        $scope.userProjects = success;
        },
        function(failure){
          alert("BAD PROJECTS " + failure)
        }
        )
    };
    $scope.loadOrganizations = function(){
      // just give a
      Entity.matchAll({username:$rootScope.currentUser,class:'organization'}).$promise.then(
        function(success){
          $scope.userOrganizations = success;
        },
        function(failure){
          alert("BAD ORGS " + failure)
        }
        )
    }

    $scope.loadAllTags = function(goToState){
     TagService.getAllTags('seeking_tags').then(
        function(success){
          $scope.allTags = success;
          TagService.getAllTags('offering_tags').then(
            function(success){
                $scope.allTags.push.apply($scope.allTags,success);

              //$scope.allTags += success;
              //$scope.subview = 'editMember';
              $state.go(goToState);
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
     $scope.things = 12;

    $scope.things = {};
    $scope.things.xx = 1;
    $scope.things.yy = 2;
    $scope.things.z ;
    $scope.adder = function(){
      $scope.things.z = $scope.things.xx + $scope.things.yy
    }
  }]);
