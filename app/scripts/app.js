'use strict';

/**
 * @ngdoc overview
 * @name App
 * @description
 * # App
 *
 * Main module of the application.
 */
angular
  .module('TicTacToe', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/select.html',
        controller: 'SelectController'
      })
      .when('/game', {
        templateUrl: 'views/game.html',
        controller: 'GameController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
