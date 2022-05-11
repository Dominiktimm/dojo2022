"use strict";

let grid_game = [
    ["1","1","1","1","1"],
    ["1","1","1","1","1"],
    ["1","1","1","1","1"],
    ["1","1","1","1","1"],
    ["1","1","1","1","1"]
];

let grid = [
    [1,2,3,4,5],
    [6,7,8,9,10],
    [11,12,13,14,15],
    [16,17,18,19,20],
    [21,22,23,24,25]

];

let game_over = false;
let game = {
    selection:[],

    input() {
        this.selection = [];
        let input_field = prompt("Please select field (1 - 9)");
        if(input_field <= 25 && input_field > 0) {
            this.input_to_coordinates(input_field);
        } else {
            if (confirm("Out of Gameboard - To continue press OK")) {
                game.start();
              } else {
                game_over = true;
              }
        }
    },

    input_to_coordinates(input_field) {
        let grid_1 = [
            ["1","2","3","4","5"],
            ["6","7","8","9","10"],
            ["11","12","13","14","15"],
            ["16","17","18","19","20"],
            ["21","22","23","24","25"]
        ];

        for(let i = 0; i < grid_1.length; i++) {
            for(let j = 0; j < grid_1[i].length; j++) {
                switch(grid_1[i][j]) {
                    case input_field: 
                    this.selection.push(i, j);
                    console.log(game.selection);
                    break;
                }

            };
         };
    },

  find_neighbors(grid, row, column, neighbors) {

    if (row > 0 && grid[row - 1][column]) {
        neighbors.push(grid[row - 1][column]);
    } 
    if (row < grid.length - 1 && grid[row + 1][column]) {
        neighbors.push(grid[row + 1][column]);
    }  
    if (grid[row][column - 1]) {
        neighbors.push(grid[row][column - 1]);
    } 
    if (grid[row][column + 1]) {
        neighbors.push(grid[row][column + 1]);
    }
    console.log(neighbors);
    this.neighbors_switch(neighbors);
  
    },

    neighbors_switch(neighbors) {
        neighbors.forEach(e => {
            let field = 0;
            for(let i = 0; i < grid.length; i++) {
                for(let j = 0; j < grid[i].length; j++){
                  field++;
                  if(field === e) {
                    if(grid_game[i][j] == "1"){
                        grid_game[i][j] = "0";
                    } else {
                        grid_game[i][j] = "1";
                   };
                  }
                }
            }
        });
    },

    selection_switch() {
        if(grid_game[this.selection[0]][this.selection[1]] == "1"){
            grid_game[this.selection[0]][this.selection[1]] = "0";
        } else {
            grid_game[this.selection[0]][this.selection[1]] = "1";
        }
        this.check_for_winner();
    },

    check_for_winner(){
        let row_found = true;
        for(let i = 0; i < grid_game.length; i++) {
            for(let j = 0; j < grid_game.length; j++){
                row_found = row_found && grid_game[i][j] == "0";
            }
        }

        if(row_found == true){
            alert(`
            ${grid_game[0]} 
            ${grid_game[1]}
            ${grid_game[2]}
            ${grid_game[3]}
            ${grid_game[4]}
        `);
            alert("game won");
            game_over = true;
        } else {
            alert(`
            ${grid_game[0]} 
            ${grid_game[1]}
            ${grid_game[2]}
            ${grid_game[3]}
            ${grid_game[4]}
        `);
            game.start();
        }
    },


    start() {
        if(game_over === false){
            this.input();
            this.find_neighbors(grid, game.selection[0], game.selection[1], []);
            this.selection_switch();
        } else {
            console.log("won");
        }  
       
    }

};

game.start();
