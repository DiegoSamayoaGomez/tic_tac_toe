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


    function resetGame() {
        const board = [];

        /*Create 2D array that will represent the state of the game board*/
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i][j] = "-"
            }
        }

        console.log("RESET")
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
    return { getBoard, checkGrid, printBoard, resetGame };
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



    const playRound = (rows, columns) => {

        //columns = prompt("COLUMNS: ");
        //rows = prompt("ROWS: ");
        console.log(
            `Dropping ${getActivePlayer().name}'s token into column ${columns}...`
        );
        //SEND POSITION OF THE USER AND ITS TOKEN
        board.checkGrid(rows, columns, getActivePlayer().token);

        //CHECK if someone has won (Not created yet)
        boardInfo = board.getBoard();

        //Convert the 2d array into a single line array and then check if there´s no more empty squares, if so
        //It will be a tie and close the game
        checkTie = (boardInfo) => {
            return [].concat.apply([], ([].concat.apply([], boardInfo))).indexOf("-") !== -1;
        };


        if (
            ((boardInfo[0][0] === getActivePlayer().token) && (boardInfo[0][1] === getActivePlayer().token) && (boardInfo[0][2] === getActivePlayer().token)) || // FIRST ROW WINNER 
            ((boardInfo[1][0] === getActivePlayer().token) && (boardInfo[1][1] === getActivePlayer().token) && (boardInfo[1][2] === getActivePlayer().token)) || // SECOND ROW WINNER 
            ((boardInfo[2][0] === getActivePlayer().token) && (boardInfo[2][1] === getActivePlayer().token) && (boardInfo[2][2] === getActivePlayer().token)) || // THIRD ROW WINNER

            ((boardInfo[0][0] === getActivePlayer().token) && (boardInfo[1][0] === getActivePlayer().token) && (boardInfo[2][0] === getActivePlayer().token)) || // FIRST COLUMN WINNER
            ((boardInfo[0][1] === getActivePlayer().token) && (boardInfo[1][1] === getActivePlayer().token) && (boardInfo[2][1] === getActivePlayer().token)) || // SECOND COLUMN WINNER
            ((boardInfo[0][2] === getActivePlayer().token) && (boardInfo[1][2] === getActivePlayer().token) && (boardInfo[2][2] === getActivePlayer().token)) || // THID COLUMN WINNER

            ((boardInfo[0][0] === getActivePlayer().token) && (boardInfo[1][1] === getActivePlayer().token) && (boardInfo[2][2] === getActivePlayer().token)) || // Diagonal from left to right winner
            ((boardInfo[2][0] === getActivePlayer().token) && (boardInfo[1][1] === getActivePlayer().token) && (boardInfo[0][2] === getActivePlayer().token))    // Diagonal from right to left winner
        ) {
            console.log(`${getActivePlayer().name} Won`);
            return `${getActivePlayer().name} Won!`;
        }
        else if (checkTie(boardInfo) === false) {

            return "It's a tie";
        }

        switchPlayerTurn();

    };

    return { getActivePlayer, playRound, getBoard: board.getBoard, resetGame: board.resetGame };
}

function displayController() {
    const winnerDiv = document.querySelector(".winnerDiv");
    const announceWinner = document.createElement("h1");
    announceWinner.classList = "announceWinner";

    const turn = document.querySelector(".turn");
    const turnPlayer = document.querySelector(".turnPlayer");
    const board = document.querySelector(".board");

    const resetBtn = document.querySelector(".resetBtn")

    // Create an instance of GameController
    const gameControllerInstance = GameController();
    let gameOver = false;

    const updateScreen = () => {
        let gameOver = false;
        //Clear the board 
        board.textContent = "";

        //Get the newest board
        const getBoard = gameControllerInstance.getBoard();

        //Print the current player
        const activePlayer = gameControllerInstance.getActivePlayer();

        //Display player´s turn
        turnPlayer.textContent = `It´s ${activePlayer.name}´s turn "${activePlayer.token}"`;
        turn.appendChild(turnPlayer);

        //Populate the grid with the array board information
        let count = 0;
        getBoard.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                //console.log(rowIndex, columnIndex);
                //Use the counter to assign an ID to each button
                count++;

                //Create a button and assign it an ID
                let gridBtn = document.createElement("button");
                gridBtn.id = count;

                //Add a class to each button
                gridBtn.classList = "grid";
                gridBtn.textContent = cell;

                // Create a data attribute to identify the row and column
                gridBtn.dataset.row = rowIndex;
                gridBtn.dataset.column = columnIndex;

                if (cell !== "-") {
                    gridBtn.disabled = true;

                    // Change the color based on the cell content
                    if (cell === "X") {
                        gridBtn.style.backgroundColor = "black";
                        gridBtn.style.color = "white";
                    } else if (cell === "O") {
                        gridBtn.style.backgroundColor = "white";
                        gridBtn.style.color = "black";
                    }
                }

                board.appendChild(gridBtn);
            });

        });

    }


    //Handle each user click
    board.addEventListener("click", (e) => {
        //Block the whole board if a winner is declared or if there´s a tie
        if (gameOver == true) return;

        //Get row and column and send it to play a round
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;
        const selectID = e.target.id;

        if (!selectedColumn || !selectedRow) return;
        const winner = gameControllerInstance.playRound(selectedRow, selectedColumn);

        //Check if there´s a winner, if so, then display the winner and block the whole board
        if (winner !== undefined) {
            announceWinner.textContent = winner;
            winnerDiv.appendChild(announceWinner);
            gameOver = true;

        }
        //Initial run
        updateScreen();

    });


    //Reset the array
    resetBtn.addEventListener("click", () => {
        gameControllerInstance.resetGame();
        winnerDiv.removeChild(announceWinner);
        displayController();

    });

    updateScreen();


}
//Main function
displayController();