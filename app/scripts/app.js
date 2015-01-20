'use strict';

/**
 * @ngdoc overview
 * @name ligatorApp
 * @description
 * # ligatorApp
 *
 * Main module of the application.
 */
angular
  .module('ligatorApp', [
    'localytics.directives',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'base64',
    'ngMap',
    'ui.select',
    'geneHiveServices'

  ])
  .config(['$stateProvider',function($stateProvider) {
    $stateProvider
      .state('index',{url: "/",templateUrl: 'views/main.html',controller:'MainCtrl'})
      .state('about',{url: "/about",templateUrl: 'views/about.html',controller: 'AboutCtrl'})
      .state('login',{url: "/login",templateUrl: 'views/login.html',controller: 'LoginCtrl',data:{logging_in:true}})
      .state('logout',{url: "/logout",templateUrl: 'views/logout.html',controller: 'LoginCtrl',data:{logging_in:false}})
      .state('signup',{url: "/signup",templateUrl: 'views/signup.html',controller: 'SignUpCtrl'})
      .state('activate',{url: "/activate",templateUrl: 'views/activate.html',controller: 'ActivateCtrl'})
      .state('user',{url: "/user",templateUrl:"views/user.html",controller: 'UserHomeCtrl'})
      .state('user.home',{url: "/home",templateUrl:"views/userhome.html"})
      .state('user.editMember',{url: "/editMember",templateUrl:"views/editMember.html"})
      .state('user.editProject',{url: "/editProject",templateUrl:"views/editProject.html"})
      .state('user.editOrganization',{url: "/home",templateUrl:"views/editOrganization.html"})
      .state('pwreset',{url:"/pwreset",templateUrl: 'views/resetPassword.html',controller: 'PasswordResetCtrl'})
      .state('map',{url: "/map",templateUrl: 'views/map.html',controller: 'MapCtrl'})

    }  

  ])
  .run(['AuthService','$rootScope',function(AuthService,$rootScope) {
    $rootScope.debug = false;
    if (AuthService.cookieLogin()){
      // do nothing - let the guy thru
    }else{
      // set something in the root scope saying that
      // we saw someone and passed him to index
     // if($rootScope.visited == undefined){
     //   $rootScope.visited = true;
     //   location = "index.html"
     // }
     // punted for the moment .. we need an auth system for each url
    }
    return false;
}]);
