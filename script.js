function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    /*Create 2D array that will represent the state of the game board*/
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    //Retrieve the current gameboard
    const getBoard = () => board;
}


/*
A cell represents one square of the board
 " - ": Means an empty square
 " X ": Player´s 1 token
 " 0 ": Player´s 2 token
*/
function Cell() {
    let value = 0;
    //Get player token to change the value of the cell
    const addToken = (player) => {
        value = player;
    }

    // Retrieve the current value of a cell
    const getValue = () => value;

    return { addToken, getValue };
}