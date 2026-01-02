const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const PLAYER = "X";
const SYSTEM = "O";

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach(cell => cell.addEventListener("click", handlePlayerMove));

function handlePlayerMove(e) {
  const index = e.target.dataset.index;

  if (!gameActive || board[index] !== "") return;

  makeMove(index, PLAYER);

  if (checkWinner(PLAYER)) {
    endGame("🎉 You Win! Amazing move!");
    return;
  }

  if (isDraw()) {
    endGame("😐 It's a Draw!");
    return;
  }

  setTimeout(systemMove, 500);
}

function systemMove() {
  let emptyCells = board
    .map((val, idx) => val === "" ? idx : null)
    .filter(v => v !== null);

  let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  makeMove(randomIndex, SYSTEM);

  if (checkWinner(SYSTEM)) {
    endGame("🤖 System Wins! Try again!");
    return;
  }

  if (isDraw()) {
    endGame("😐 It's a Draw!");
  }
}

function makeMove(index, player) {
  board[index] = player;
  cells[index].innerText = player;
  cells[index].classList.add(player);
}

function checkWinner(player) {
  return winningCombinations.some(comb =>
    comb.every(index => board[index] === player)
  );
}

function isDraw() {
  return board.every(cell => cell !== "");
}

function endGame(message) {
  gameActive = false;
  statusText.innerText = message;
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  statusText.innerText = "";
  cells.forEach(cell => {
    cell.innerText = "";
    cell.classList.remove("X", "O");
  });
}

