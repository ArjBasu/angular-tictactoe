'use strict';

/**
 * @ngdoc function
 * @name App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the App
 */
angular.module('TicTacToe')
  .controller('SelectController', function ($rootScope,$scope,$location) {


    /* This function is called upon the form submit in the select page
      It sets the value of the rootScope gridSize to the scope.gridSize so that
      it can be used by the game view to create the grid.
     */
    $scope.startGame = function(){
      $location.path('/game');
      $rootScope.gridSize = $scope.gridSize;
    };
  });
