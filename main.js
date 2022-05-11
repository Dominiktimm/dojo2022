


"use strict";

let grid_game = [
    ["0","0","0","0","0"],
    ["0","0","0","0","0"],
    ["0","0","0","0","0"],
    ["0","0","0","0","0"],
    ["0","0","0","0","0"]
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
    selection_color: "0",
    input() {
        this.selection = [];
        let input_field = parseInt(prompt("Please select field (1 - 25)"));
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
        for(let i = 0; i < grid.length; i++) {
            for(let j = 0; j < grid[i].length; j++) {
                switch(grid[i][j]) {
                    case input_field: 
                    this.selection.push(i, j);
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
        let color = this.random_num();
        this.selection_color = color;
    
        neighbors.forEach(e => {
            let field = 0;
            for(let i = 0; i < grid.length; i++) {
                for(let j = 0; j < grid[i].length; j++){
                  field++;
                  if(field === e) {
                    // changes the color of the user neighbors
                    grid_game[i][j] = this.selection_color;
                  }
                }
            }
        });
    },

    selection_switch() {
        // changes color of the user selection
        grid_game[this.selection[0]][this.selection[1]] = this.selection_color;
        this.check_for_winner();
    },
    // returns random color 0, 1, 2, 3
    random_num(){
        let num = Math.floor(Math.random() * (3 - 0 + 1) + 0).toString();
        return num;
    },

    check_for_winner(){
        function test (color) {
        let row_found = true;
        for(let i = 0; i < grid_game.length; i++) {
            for(let j = 0; j < grid_game.length; j++){
                row_found = row_found && (grid_game[i][j] == color);
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
            alert(`game won ${color}`);
            game_over = true;
        } else {
            alert(`
            ${grid_game[0]} 
            ${grid_game[1]}
            ${grid_game[2]}
            ${grid_game[3]}
            ${grid_game[4]}
        `);
        // Because I have the game start here, it isnt running through all my tests. 
        // I would have to restructure this whole method to make it work. That it checks for each color. 
            game.start();
        }
    }
    // I was thinking to check for each color, to see if the whole grid has changed to the same color.
    test("0");
    test("1");
    test("2");
    test("3");
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

