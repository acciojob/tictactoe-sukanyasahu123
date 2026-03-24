let player1 = "";
let player2 = "";
let currentPlayer = "X";
let gameActive = false;
let board = [];

const message = document.querySelector(".message");
const boardDiv = document.getElementById("board");

document.getElementById("submit").addEventListener("click", function () {
  player1 = document.getElementById("player-1").value;
  player2 = document.getElementById("player-2").value;

  if (!player1 || !player2) return;

  currentPlayer = "X";
  gameActive = true;
  board = ["1","2","3","4","5","6","7","8","9"];

  message.textContent = `${player1}, you're up`;

  createBoard();
});

function createBoard() {
  boardDiv.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.id = i + 1;
    cell.textContent = board[i];

    cell.addEventListener("click", handleClick);
    boardDiv.appendChild(cell);
  }
}

function handleClick(e) {
  const index = e.target.id - 1;

  if (!gameActive) return;
  if (board[index] === "X" || board[index] === "O") return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    const winner = currentPlayer === "X" ? player1 : player2;
    message.textContent = `${winner}, congratulations you won!`;
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  message.textContent =
    currentPlayer === "X"
      ? `${player1}, you're up`
      : `${player2}, you're up`;
}

function checkWin() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  return winPatterns.some(([a,b,c]) => {
    return board[a] === board[b] && board[b] === board[c];
  });
}