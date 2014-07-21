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
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'base64',
    'geneHiveServices',
    'ligatorServices'

  ])
  .config(['$stateProvider',function($stateProvider) {
    $stateProvider
      .state('index',{url: "/",templateUrl: 'views/main.html',controller:'MainCtrl'})
      .state('about',{url: "/about",templateUrl: 'views/about.html',controller: 'AboutCtrl'})
      .state('login',{url: "/login",templateUrl: 'views/login.html',controller: 'LoginCtrl',data:{logging_in:'true'}})
      .state('logout',{url: "/logout",templateUrl: 'views/logout.html',controller: 'LoginCtrl',data:{logging_in:'false'}})
      .state('signup',{url: "/signup",templateUrl: 'views/signup.html',controller: 'SignUpCtrl'})
      .state('confirm',{url: "/confirm",templateUrl: 'views/confirm.html',controller: 'ConfirmCtrl'})
      .state('userHome',{url: "/user",templateUrl: 'views/user.html',controller: 'UserHomeCtrl'})


  }]);
