//your JS code here. If required.
let player1 = "";
let player2 = "";

let currentPlayer = 1;

let board = ["", "", "", "", "", "", "", "", ""];

let gameOver = false;

const submit = document.getElementById("submit");

const message = document.querySelector(".message");

const cells = document.querySelectorAll(".cell");

submit.addEventListener("click", function() {

    player1 = document.getElementById("player-1").value.trim();

    player2 = document.getElementById("player-2").value.trim();

    if (player1 === "" || player2 === "") {
        alert("Please enter both player names");
        return;
    }

    document.getElementById("playerForm").style.display = "none";

    document.getElementById("game").style.display = "block";

    message.innerText = player1 + ", you're up";

});

cells.forEach(function(cell) {

    cell.addEventListener("click", function() {

        if (gameOver) {
            return;
        }

        let index = Number(cell.id) - 1;

        // Check whether cell is already filled
        if (board[index] !== "") {
            return;
        }

        let symbol;
        let username;

        if (currentPlayer === 1) {
            symbol = "x";
            username = player1;
        } else {
            symbol = "o";
            username = player2;
        }

        // Update board
        board[index] = symbol;

        cell.innerText = symbol;

        // Winning combinations
        let winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        // Check winner
        let winner = winningCombinations.some(function(combo) {

            return board[combo[0]] !== "" &&
                   board[combo[0]] === board[combo[1]] &&
                   board[combo[1]] === board[combo[2]];

        });

        if (winner) {

            message.innerText = username + " congratulations you won!";

            gameOver = true;

            return;
        }

        // Check draw
        if (!board.includes("")) {
            message.innerText = "It's a draw!";
            gameOver = true;
            return;
        }

        // Switch player
        currentPlayer = currentPlayer === 1 ? 2 : 1;

        if (currentPlayer === 1) {
            message.innerText = player1 + ", you're up";
        } else {
            message.innerText = player2 + ", you're up";
        }

    });

});