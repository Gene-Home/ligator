'use strict';

/**
 * @ngdoc function
 * @name ligatorApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the ligatorApp
 */
angular.module('ligatorApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
