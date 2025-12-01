// const title = document.getElementById("title");
let boxes = [...document.querySelectorAll(".box")];
const reset = document.getElementById("reset");
const newGameBtn = document.getElementById("new-btn");
const title = document.getElementById("title");
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

// Main click handler for each box
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    // Only allow click if box is empty and game is active
    if (box.textContent !== "" || !gameActive) return;

    if (turnX) {
      box.textContent = "X";
      // box.style.color = "gray";
      box.style.backgroundColor = "gray";
    } else {
      box.textContent = "O";
      box.style.backgroundColor = "white";
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
      title.textContent = `Player ${val1} Wins!`;
      title.style.color = val1 === "X" ? "29531bff" : "0affc6ff";

      // Highlight winning line
      boxes[a].style.backgroundColor = "#29531bff";
      boxes[b].style.backgroundColor = "#29531bff";
      boxes[c].style.backgroundColor = "#29531bff";

      gameActive = false;
      enableNewGameButton();
      return;
    }
  }

  // Check for draw
  const isDraw = boxes.every((box) => box.textContent !== "");
  if (isDraw && !winnerFound) {
    title.textContent = "It's a Draw!";
    title.style.color = "white";
    gameActive = false;
    enableNewGameButton();
  }
}

reset.addEventListener("click", resetGame);

newGameBtn.addEventListener("click", resetGame);

function resetGame() {
  turnX = true;
  gameActive = true;
  title.textContent = "Tic Tac Toe";
  title.style.color = "white";

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
