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
    const checkGrid = (row, column, playerToken) => {
        if (board[row][column] === "-") {
            board[row][column] = playerToken;
        }
        else {
            return;
            // Exit the function if the condition is false

        }
    }


    /*
    Print the board in the console
    */
    const printBoard = () => {
        console.table(board);
    }
    return { getBoard, checkGrid, printBoard };
}


/*
A cell represents one square of the board
 " - ": Means an empty square
 " X ": Player´s 1 token
 " 0 ": Player´s 2 token
*/

function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = Gameboard();


    const players = [{
        name: playerOneName,
        token: "X"
    },
    {
        name: playerTwoName,
        token: "O"
    }];


    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };


    const newTurn = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
        playRound();
    };

    const playRound = () => {

        columns = prompt("COLUMNS: ");
        rows = prompt("ROWS: ");
        console.log(
            `Dropping ${getActivePlayer().name}'s token into column ${columns}...`
        );
        //SEND POSITION OF THE USER AND ITS TOKEN
        board.checkGrid(rows, columns, getActivePlayer().token);

        //CHECK if someone has won (Not created yet)
        boardInfo = board.getBoard();
        if (
            ((boardInfo[0][0] === getActivePlayer().token) && (boardInfo[0][1] === getActivePlayer().token) && (boardInfo[0][2] === getActivePlayer().token)) || // FIRST ROW WINNER 
            ((boardInfo[1][0] === getActivePlayer().token) && (boardInfo[1][1] === getActivePlayer().token) && (boardInfo[1][2] === getActivePlayer().token)) || // SECOND ROW WINNER 
            ((boardInfo[2][0] === getActivePlayer().token) && (boardInfo[2][1] === getActivePlayer().token) && (boardInfo[2][2] === getActivePlayer().token)) || // THIRD ROW WINNER

            ((boardInfo[0][0] === getActivePlayer().token) && (boardInfo[1][0] === getActivePlayer().token) && (boardInfo[2][0] === getActivePlayer().token)) || // FIRST COLUMN WINNER
            ((boardInfo[0][1] === getActivePlayer().token) && (boardInfo[1][1] === getActivePlayer().token) && (boardInfo[2][1] === getActivePlayer().token)) || // SECOND COLUMN WINNER
            ((boardInfo[0][2] === getActivePlayer().token) && (boardInfo[1][2] === getActivePlayer().token) && (boardInfo[2][2] === getActivePlayer().token)) || // THID COLUMN WINNER

            ((boardInfo[0][0] === getActivePlayer().token) && (boardInfo[1][1] === getActivePlayer().token) && (boardInfo[2][2] === getActivePlayer().token)) || // SECOND COLUMN WINNER
            ((boardInfo[2][0] === getActivePlayer().token) && (boardInfo[1][1] === getActivePlayer().token) && (boardInfo[0][2] === getActivePlayer().token))    // THID COLUMN WINNER
        ) {
            console.log(`${getActivePlayer().name} Won`);
            return;
        }

        else if (!boardInfo.includes("-")) {
            console.log("It's a tie");
            return;
        }

        switchPlayerTurn();
        newTurn();
    };

    // Initial play game message
    newTurn();

    return { getActivePlayer, playRound };
}

// Create an instance of GameController
const gameControllerInstance = GameController();
