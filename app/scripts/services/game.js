/**
 * Created by Arjun Basu on 10/29/2014.
 */
'use strict';


angular.module('TicTacToe')
.service('gameProvider',function(){
    this.gameBoard = [];
    var size = 0;


    /**
     * This checks whether the board is empty or not. Returns true if the board is empty.
     * This method is basically used for checking a draw condition.
     * @returns {boolean}
     */
    this.checkEmpty = function(){
      for(var i = 0; i < size; i++){
        for(var j = 0; j < size; j++){
          if(this.gameBoard[i][j] === null){
            return true;
          }
        }
      }

      return false;
    };


    /**
     * the initialization function. Takes an argument regarding the size and
     * creates a gameBoard matrix of that dimensions. Sets all the cells to null.
     * @param newSize
     */
    this.init = function(newSize){

      size = newSize;
      this.gameBoard = [];

      for(var i = 0; i < size; i++){
        this.gameBoard[i] = [];
        for(var j = 0; j < size; j++){
          this.gameBoard[i][j] = null;
        }
      }

    };

    /**
     * It sets all the game pieces to null. Used to reset the state of the board
     */

    this.reset = function(){

      for(var i = 0; i < size; i++){
        for(var j = 0; j < size; j++){
          this.gameBoard[i][j] = null;
        }
      }

    };


    /**
     * The Check win function. It takes a position i,j as a parameter. It then proceeds to check whether a three
     * in a row is achieved from that position , either horizontally, vertically , via the left or the right diagonals.
     * Returns true or false accordingly.
     * @param i
     * @param j
     * @returns {boolean}
     */
    this.checkWin = function(i,j){

      /**
       * Check for out of bound values and null valued location
       */


      if(i < 0 || j < 0 || i >= size || j >= size || ! this.gameBoard[i][j] ){
        return false;
      }

      /**
       * For each case three scenarios are evaluated . Whether the three consecutive property is achieved with the next two pieces
       * or the previous two pieces or from two adjacent pieces, either horizontally, vertially or via the diagonals.
       *
       * Consider a 4X4 board.
       * So if the parameters are 0,1 it will check whether {(0,0), (0,1) , (0,2)} , {( 0,1),(0,2),(0,3))} form tree consecutive patterns
       * Similarly for vertical , left and right diagonals.
       *
       */

      /**
       * Check for horizontal match
       *
       */

      if ((i < size - 2 && this.gameBoard[i][j] === this.gameBoard[i + 1][j] && this.gameBoard[i+1][j] === this.gameBoard[i + 2][j]) ||
        (i - 2 >= 0 && this.gameBoard[i][j] === this.gameBoard[i - 1][j] && this.gameBoard[i-1][j] === this.gameBoard[i - 2][j]) ||
        (i < size-1 && i > 0 && this.gameBoard[i][j] === this.gameBoard[i - 1][j] && this.gameBoard[i-1][j] === this.gameBoard[i + 1][j])) {
        return true;
      }


      /**
       * Check for vertical match
       */

      if ((j < size - 2 && this.gameBoard[i][j] === this.gameBoard[i][j + 1] && this.gameBoard[i][j+1] === this.gameBoard[i][j + 2]) ||
        (j - 2 >= 0 && this.gameBoard[i][j] === this.gameBoard[i][j - 1] && this.gameBoard[i][j-1] === this.gameBoard[i][j - 2]) ||
        (j < size-1 && j > 0 && this.gameBoard[i][j] === this.gameBoard[i][j - 1] && this.gameBoard[i][j-1] === this.gameBoard[i][j + 1])) {
        return true;
      }

      /**
       * Check for left diagonal
       */

      if (( i < size - 2 && j < size - 2 && this.gameBoard[i][j] === this.gameBoard[i + 1][j + 1] && this.gameBoard[i+1][j+1] === this.gameBoard[i + 2][j + 2]) ||
        ( i - 2 >= 0 && j - 2 >= 0 && this.gameBoard[i][j] === this.gameBoard[i - 1][j - 1] && this.gameBoard[i-1][j-1] === this.gameBoard[i - 2][j - 2]) ||
        (i < size-1 && i > 0 && j < size-1 && j > 0 && this.gameBoard[i][j] === this.gameBoard[i - 1][j - 1] && this.gameBoard[i-1][j-1] === this.gameBoard[i + 1][j + 1])) {
        return true;
      }


      /**
       * Check for right diagonal
       */

      if (( i < size - 2 && j - 2 >= 0 && this.gameBoard[i][j] === this.gameBoard[i + 1][j - 1] && this.gameBoard[i+1][j-1] === this.gameBoard[i + 2][j - 2]) ||
        ( i - 2 >= 0 && j < size - 2 && this.gameBoard[i][j] === this.gameBoard[i - 1][j + 1] && this.gameBoard[i-1][j+1] === this.gameBoard[i - 2][j + 2]) ||
        ( i < size-1 && i > 0 && j < size-1 && j > 0 && this.gameBoard[i][j] === this.gameBoard[i - 1][j + 1] && this.gameBoard[i - 1][j+1] === this.gameBoard[i + 1][j - 1])){
        return true;
      }

      /**
       * If the match is not found then simply return false.
       */
      return false;

    };

    /**
     * This Function sets the players move to the game board. It first checks if it's already occupied. If so
     * returns false, otherwise sets the player's move in the game board.
     * @param player
     * @param i
     * @param j
     * @returns {boolean}
     */

    this.setMove = function(player,i,j){

      /**
       * If the location is already marked don't do anything.
       */
      if(this.gameBoard[i][j] !== null){
        return false;
      }
      if(player === 1){
        this.gameBoard[i][j] = 'X';
      }

      else{
        this.gameBoard[i][j] = 'O';
      }

      return true;


    };
  });
