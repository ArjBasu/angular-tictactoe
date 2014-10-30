'use strict';

/**
 * @ngdoc function
 * @name TicTactoe.controller:GameController
 * @description
 * # GameController
 * Controller of the App
 */
angular.module('TicTacToe')
  .controller('BoardController', function ($rootScope,$scope,gameProvider) {


    /** This function is used to decide which classes are to be applied to each cell via ng-class directive.
     * The blankCell class is to be applied when the cell is empty
     * The blankX class is to be applied to empty cells when it's the turn of player 1
     * The blankY class is to be applied to empty cells when it's the turn of player 2.
     * The cellX is to applied to cells where player 1 has placed a cross
     * The cellY is to be applied ot cells where player 2 has places a O.
     * @param col
     * @returns {{blankCell: boolean, blankX: boolean, blankY: boolean, filledCell: boolean, cellX: boolean, cellY: boolean}}
     */
    $scope.getClasses = function(col){
      return { blankCell: col === null,
        blankX: $scope.player === 1 && col === null,
        blankY: $scope.player === 2 && col === null,
        filledCell: col !== null,
        cellX: col === 'X',
        cellY: col === 'O'};

    };


    /** This piece of code is used to make the game Board responsive to the size when the grid Size is less than 20.
     *
     */

    if($rootScope.gridSize <= 20){
      $scope.getWidth = {
        width:(70*$rootScope.gridSize) + 50 + 'px'
      };
    }


    /**
     * Initializes the game board.
     */

    gameProvider.init($rootScope.gridSize);

    /**
     * Get the gameBoard from the gameProvider service
     *
     * @type {Array}
     */
    $scope.gameBoard = gameProvider.gameBoard;

    /**
     * This variable keeps track of the play state. Possible values are 'playing','win','draw'. This is used to display
     * the overlay after the game is won/drawn.
     */

    $scope.result = 'playing';
    $scope.player = 1;


    /**
     * Resets the board state , also sets the play chance to player 1.
     */
    $scope.reset = function(){
      gameProvider.reset();
      $scope.player = 1;

    };

    /**
     * This checks whether a win or draw has been achieved , used to trigger the overlay.
     * @returns {boolean}
     */

    $scope.checkWinDraw = function(){
      return ($scope.result === 'draw' || $scope.result === 'win');

    };

    /**
     * The function which is triggered when the user clicks on a cell. It checks whether the cell
     * was already full or not. If it wasn't full then it proceeds to check whether a three in a row
     * is achieved or if a draw is reached. Otherwise it passes the turn to the other player.
     * @param i
     * @param j
     */

    $scope.move = function(i,j){
      if(gameProvider.setMove($scope.player,i,j)){


        if(gameProvider.checkWin(i,j)){

          $scope.result = 'win';
        }

        else if(!gameProvider.checkEmpty()){
          $scope.result = 'draw';

        }

        else{
          if($scope.player === 1){
            $scope.player = 2;
          }
          else {
            $scope.player = 1;
          }
        }
      }

    };

    /**
     * The function which triggers the reset of the board and changes the state to playing.
     */
    $scope.playAgain = function(){
      $scope.reset();
      $scope.result = 'playing';
    };

  });
