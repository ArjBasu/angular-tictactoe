'use strict';

describe('GameProvider', function () {

  // load the controller's module
  beforeEach(module('TicTacToe'));

  var gameService,SIZE = 5;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, gameProvider) {

    gameService = gameProvider;

    gameService.init(SIZE);

  }));

  it('It should contain all the methods and properties ',function(){
    expect(gameService.gameBoard).toBeDefined();
    expect(gameService.init).toBeDefined();
    expect(gameService.reset).toBeDefined();
    expect(gameService.setMove).toBeDefined();
    expect(gameService.checkWin).toBeDefined();

  });

  it('The init method should initialize the array properly',function(){

    for(var i = 0; i < SIZE; i++){
      expect(gameService.gameBoard[i].length).toBe(SIZE);
      for (var j = 0; j < SIZE; j++){
        expect(gameService.gameBoard[i][j]).toBeNull();
      }
    }
  });

  it('The reset method should reset the board',function(){


    for(var i = 0; i < SIZE; i++){
      for(var j = 0; j < SIZE; j++){
        expect(gameService.gameBoard[i][j]).toBeNull();
      }
    }
  });


  it('The setMove method should mark the appropriate location on the board',function(){


    gameService.setMove(1,0,0);

    expect(gameService.gameBoard[0][0]).toBe('X');

    gameService.setMove(2,1,1);

    expect(gameService.gameBoard[1][1]).toBe('O');
  });


  it('The setMove method should not mark a location which is already marked',function(){

    gameService.setMove(1,0,0);

    gameService.setMove(2,0,0);

    expect(gameService.gameBoard[0][0]).toBe('X');
  });

  it('Verify that that the checkWin function works properly',function(){
    gameService.gameBoard[0][0] = gameService.gameBoard[0][1] = gameService.gameBoard[0][2] = 'X';
    expect(gameService.checkWin(0,0)).toBe(true);
    expect(gameService.checkWin(0,2)).toBe(true);
    expect(gameService.checkWin(0,1)).toBe(true);

    gameService.reset();

    gameService.gameBoard[0][0] = gameService.gameBoard[1][0] = gameService.gameBoard[2][0] = 'O';
    expect(gameService.checkWin(0,0)).toBe(true);
    expect(gameService.checkWin(2,0)).toBe(true);
    expect(gameService.checkWin(1,0)).toBe(true);

    gameService.reset();

    gameService.gameBoard[0][0] = gameService.gameBoard[1][1] = gameService.gameBoard[2][2] = 'X';
    expect(gameService.checkWin(0,0)).toBe(true);
    expect(gameService.checkWin(2,2)).toBe(true);
    expect(gameService.checkWin(1,1)).toBe(true);

    gameService.reset();

    gameService.gameBoard[2][3] = gameService.gameBoard[3][2] = gameService.gameBoard[4][1] = 'O';
    expect(gameService.checkWin(2,3)).toBe(true);
    expect(gameService.checkWin(4,1)).toBe(true);
    expect(gameService.checkWin(3,2)).toBe(true);

    gameService.reset();

    gameService.gameBoard[2][3] = gameService.gameBoard[3][2] = gameService.gameBoard[4][4] = 'O';

    expect(gameService.checkWin(2,3)).toBe(false);
    expect(gameService.checkWin(3,2)).toBe(false);
    expect(gameService.checkWin(4,4)).toBe(false);

  });


  it('It should not check if the value is null',function(){
    expect(gameService.checkWin(0,0)).toBe(false);
  });

  it('The checkEmpty function should be working properly',function(){
    expect(gameService.checkEmpty()).toBe(true);
    for(var i = 0; i < SIZE; i++){
      for(var j = 0; j < SIZE; j++){
        gameService.setMove(1,i,j);
      }
    }

    expect(gameService.checkEmpty()).toBe(false);
  });





});
