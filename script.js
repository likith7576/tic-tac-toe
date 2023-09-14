const board = document.getElementById("game");
        const cells = document.querySelectorAll(".cell");
        const message = document.getElementById("message");
        const winnerModal = document.getElementById("winner");
        const closeModalBtn = document.getElementById("close");

        let currentPlayer = "O";
        let nextPlayer = ""
        let gameBoard = ["", "", "", "", "", "", "", "", ""];
        let gameOver = false;

        function checkWin() {
            const winPatterns = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];

            for (let pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                    gameOver = true;
                    message.innerText = `${currentPlayer === "X" ? "O" : "X"} wins!`;
                    cells[a].style.backgroundColor = "antiquewhite";
                    cells[b].style.backgroundColor = "antiquewhite";
                    cells[c].style.backgroundColor = "antiquewhite";
                    showWinner();
                    break;
                }
            }

            if (!gameBoard.includes("") && !gameOver) {
                gameOver = true;
                message.innerText = "It's a draw!";
            }
        }

        function showWinner() {
            winnerModal.style.display = "block";
        }

        function closeWinner() {
            winnerModal.style.display = "none";
        }

        closeModalBtn.addEventListener("click", closeWinner);

        function handleClick(event) {
            const cell = event.target;
            const index = Array.from(cells).indexOf(cell);

            if (gameBoard[index] === "" && !gameOver) {
                gameBoard[index] = currentPlayer;
                cell.classList.add(currentPlayer.toLowerCase());
                cell.innerText = currentPlayer;
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                cell.style.transform = "scale(1.0)";
                checkWin();
            }
        }

        cells.forEach((cell) => {
            cell.addEventListener("click", handleClick);
        });

        cells.forEach((cell) => {
            cell.addEventListener("mouseover", () => {
                if (cell.innerText === "" && !gameOver) {
                    cell.style.transform = "scale(1.1)";
                }
            });

            cell.addEventListener("mouseout", () => {
                if (cell.innerText === "" && !gameOver) {
                    cell.style.transform = "scale(0.95)";
                }
            });
        });