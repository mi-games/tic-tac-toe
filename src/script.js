document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const resetBtn = document.getElementById("resetBtn");
  
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;
  
    const checkWinner = () => {
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
          gameBoard[a] &&
          gameBoard[a] === gameBoard[b] &&
          gameBoard[a] === gameBoard[c]
        ) {
          return gameBoard[a];
        }
      }
  
      return gameBoard.includes("") ? null : "T"; // 'T' for tie
    };
  
    const handleCellClick = (index) => {
      if (!gameActive || gameBoard[index] !== "") {
        return;
      }
  
      gameBoard[index] = currentPlayer;
      renderBoard();
  
      const winner = checkWinner();
      if (winner) {
        gameActive = false;
        if (winner === "T") {
          status.textContent = "It's a tie!";
        } else {
          status.textContent = `${winner} wins!`;
        }
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.textContent = `Player ${currentPlayer}'s turn`;
      }
    };
  
    const renderBoard = () => {
      board.innerHTML = "";
      gameBoard.forEach((value, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.textContent = value;
        cell.addEventListener("click", () => handleCellClick(index));
        board.appendChild(cell);
      });
    };
  
    const resetGame = () => {
      gameBoard = ["", "", "", "", "", "", "", "", ""];
      currentPlayer = "X";
      gameActive = true;
      status.textContent = `Player ${currentPlayer}'s turn`;
      renderBoard();
    };
  
    resetBtn.addEventListener("click", resetGame);
  
    resetGame(); // Initialize the game
  });
  