function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    /*Create 2D array that will represent the state of the game board*/
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i][j] = "-"
        }
    }

    //Retrieve the current gameboard
    const getBoard = () => board;

    /*
    The player will choose where to put the token, if a cell is already taken it will indicate to take another one 
    */
    const selectPosition = (column, row, player) => {

        if (board[column][row] === "-") {
            board[column][row].addToken(player);
        } else {
            return; // Exit the function if the condition is false
        }
    }

    /*
    Print the board in the console
    */
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    }
    return { getBoard, selectPosition, printBoard };
}


/*
A cell represents one square of the board
 " - ": Means an empty square
 " X ": Player´s 1 token
 " 0 ": Player´s 2 token
*/
function Cell() {
    let value = "-";
    //Get player token to change the value of the cell
    const addToken = (player) => {
        value = player;
    }

    // Retrieve the current value of a cell
    const getValue = () => value;

    return { addToken, getValue };
}
