const msg = document.getElementById("msg");
let boxes = [...document.querySelectorAll(".box")];
const reset = document.getElementById("reset");
const newGameBtn = document.getElementById("new-btn");

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // columns
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

let turnX = true; // true = Player X, false = Player O
let gameActive = true; // to stop clicks after win/draw

// Optional: Track moves (useful if you want stats later)
// let playerXMoves = [];
// let playerOMoves = [];

// Main click handler for each box
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    // Only allow click if box is empty and game is active
    if (box.textContent !== "" || !gameActive) return;

    if (turnX) {
      box.textContent = "X";
      box.style.color = "red";
      // playerXMoves.push(index);
    } else {
      box.textContent = "O";
      box.style.color = "blue";
      // playerOMoves.push(index);
    }

    box.style.pointerEvents = "none"; // disable this box permanently
    turnX = !turnX; // switch turn

    checkWinner(); // Check after every move
  });
});

// Check for winner or draw
function checkWinner() {
  let winnerFound = false;

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    const val1 = boxes[a].textContent;
    const val2 = boxes[b].textContent;
    const val3 = boxes[c].textContent;

    if (val1 === "" || val2 === "" || val3 === "") continue;

    if (val1 === val2 && val2 === val3) {
      winnerFound = true;
      msg.textContent = `Player ${val1} Wins!`;
      msg.style.color = val1 === "X" ? "red" : "blue";

      // Highlight winning line
      boxes[a].style.backgroundColor = "#90EE90";
      boxes[b].style.backgroundColor = "#90EE90";
      boxes[c].style.backgroundColor = "#90EE90";

      gameActive = false;
      enableNewGameButton();
      return;
    }
  }

  // Check for draw
  const isDraw = boxes.every((box) => box.textContent !== "");
  if (isDraw && !winnerFound) {
    msg.textContent = "It's a Draw!";
    msg.style.color = "orange";
    gameActive = false;
    enableNewGameButton();
  }
}

// Reset game (during play)
reset.addEventListener("click", resetGame);

// New game after win/draw
newGameBtn.addEventListener("click", resetGame);

function resetGame() {
  turnX = true;
  gameActive = true;
  msg.textContent = "";

  boxes.forEach((box) => {
    box.textContent = "";
    box.style.backgroundColor = "";
    box.style.color = "";
    box.style.pointerEvents = "auto"; // re-enable clicks
  });

  newGameBtn.style.display = "none"; // hide new game button
}

function enableNewGameButton() {
  newGameBtn.style.display = "block";
}

// Initially hide new game button
newGameBtn.style.display = "none";
