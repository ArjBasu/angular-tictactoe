/**
 * Created by Arjun Basu on 10/29/2014.
 */

angular.module('TicTacToe')
.service('gameProvider',function(){
    this.gameBoard = [];
    var size = 0;

    this.init = function(newSize){

      size = newSize;
      this.gameBoard = new Array();

      for(var i = 0; i < size; i++){
        this.gameBoard[i] = new Array();
        for(var j = 0; j < size; j++){
          this.gameBoard[i][j] = null;
        }
      }

    };

    this.reset = function(){

      for(var i = 0; i < size; i++){
        for(var j = 0; j < size; j++){
          this.gameBoard[i][j] = null;
        }
      }

    };

    this.checkWin = function(i,j){

      //Check for out of bound values and null valued location

      if(i < 0 || j < 0 || i >= size || j >= size || ! this.gameBoard[i][j] ){
        return false;
      }

      // Check for horizontal match in forward direction and reverse direction

      if ((i < size - 2 && this.gameBoard[i][j] == this.gameBoard[i + 1][j] && this.gameBoard[i+1][j] == this.gameBoard[i + 2][j]) ||
        (i - 2 >= 0 && this.gameBoard[i][j] == this.gameBoard[i - 1][j] && this.gameBoard[i-1][j] == this.gameBoard[i - 2][j]) ||
        (i < size-1 && i > 0 && this.gameBoard[i][j] == this.gameBoard[i - 1][j] && this.gameBoard[i-1][j] == this.gameBoard[i + 1][j])) {
        return true;
      }


      //Check for vertical match upwards and downwards

      if ((j < size - 2 && this.gameBoard[i][j] == this.gameBoard[i][j + 1] && this.gameBoard[i][j+1] == this.gameBoard[i][j + 2]) ||
        (j - 2 >= 0 && this.gameBoard[i][j] == this.gameBoard[i][j - 1] && this.gameBoard[i][j-1] == this.gameBoard[i][j - 2]) ||
        (j < size-1 && j > 0 && this.gameBoard[i][j] == this.gameBoard[i][j - 1] && this.gameBoard[i][j-1] == this.gameBoard[i][j + 1])) {
        return true;
      }

      //Check for match via left diagonal

      if (( i < size - 2 && j < size - 2 && this.gameBoard[i][j] == this.gameBoard[i + 1][j + 1] && this.gameBoard[i+1][j+1] == this.gameBoard[i + 2][j + 2]) ||
        ( i - 2 >= 0 && j - 2 >= 0 && this.gameBoard[i][j] == this.gameBoard[i - 1][j - 1] && this.gameBoard[i-1][j-1] == this.gameBoard[i - 2][j - 2]) ||
        (i < size-1 && i > 0 && j < size-1 && j > 0 && this.gameBoard[i][j] == this.gameBoard[i - 1][j - 1] && this.gameBoard[i-1][j-1] == this.gameBoard[i + 1][j + 1])) {
        return true;
      }


      //Check for match via right diagonal

      if (( i < size - 2 && j - 2 >= 0 && this.gameBoard[i][j] == this.gameBoard[i + 1][j - 1] && this.gameBoard[i+1][j-1] == this.gameBoard[i + 2][j - 2]) ||
        ( i - 2 >= 0 && j < size - 2 && this.gameBoard[i][j] == this.gameBoard[i - 1][j + 1] && this.gameBoard[i-1][j+1] == this.gameBoard[i - 2][j + 2]) ||
        ( i < size-1 && i > 0 && j < size-1 && j > 0 && this.gameBoard[i][j] == this.gameBoard[i - 1][j + 1] && this.gameBoard[i - 1][j+1] == this.gameBoard[i + 1][j - 1])){
        return true;
      }

      return false;

    };

    this.setMove = function(player,i,j){

      //If the location has already been marked , don't do anything
      if(this.gameBoard[i][j] !== null){
        return;
      }
      if(player == 1){
        this.gameBoard[i][j] = 'X';
      }

      else{
        this.gameBoard[i][j] = 'O';
      }

      return this.checkWin(i,j);


    };
  });
