let currentPlayer = "X";
let player1 = "";
let player2 = "";
let gameActive = false;
let board = ["", "", "", "", "", "", "", "", ""];

const boardDiv = document.getElementById("board");
const message = document.getElementById("message");

document.getElementById("submit").addEventListener("click", () => {
  player1 = document.getElementById("player-1").value;
  player2 = document.getElementById("player-2").value;

  if (player1 === "" || player2 === "") {
    alert("Enter both names");
    return;
  }

  gameActive = true;
  message.textContent = player1 + ", you're up";
  createBoard();
});
function createBoard() {
  boardDiv.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i);
    cell.addEventListener("click", handleClick);
    boardDiv.appendChild(cell);
  }
}

function handleClick(e) {
  let index = e.target.getAttribute("data-index");

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    message.textContent =
      (currentPlayer === "X" ? player1 : player2) + " congratulations you won!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.textContent =
    currentPlayer === "X" ? player1 + ", you're up" : player2 + ", you're up";
}

function checkWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  return winPatterns.some(pattern => {
    let [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}