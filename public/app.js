const msg = document.getElementById("msg");
// buttons
const newGameBtn = document.getElementById("new-game");
const reset = document.getElementById("reset");
// boxes
const boxes = [...document.querySelectorAll(".box")];

const winConditions = [
  // horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal
  [0, 4, 8],
  [2, 4, 6],
];

let turnX = true;
let turnO = false;
let gameActive = true;

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!gameActive || box.textContent !== "") return;

    if (turnX) {
      box.textContent = "x";
      box.style.backgroundColor = "gray";
      checkWinner();
    } else {
      box.textContent = "o";
      box.style.backgroundColor = "white";
      checkWinner();
    }
    gameActive = true;
    turnX = !turnX;
    box.style.pointerEvents = "none";
  });
  reset.addEventListener("click", () => {
    box.textContent = "";
    box.style.backgroundColor = "";
    gameActive = true;
    turnX = true;
  });
});

function checkWinner() {
  let winnerFound = false;

  for (conditions of winConditions) {
    const [a, b, c] = conditions;

    const val1 = boxes[a].textContent;
    const val2 = boxes[b].textContent;
    const val3 = boxes[c].textContent;

    if (val1 === "" || val2 === "" || val3 === "") return;

    if (val1 === val2 && val2 === val3) {
      winnerFound = true;
      msg.textContent = `Winner ${val1}`;

      // highlight the winning pattern
      boxes[a].style.color = "#a1bc98";
      boxes[b].style.color = "#a1bc98";
      boxes[c].style.color = "#a1bc98";

      // gameActive = false;
    }
  }
}

const isDraw = box.every((box) => textContent !== "");
if (isDraw && !winnerFound) {
  msg.textContent = "its a Tie!";
  // gameActive = false;
}
// condition
// process
// check winner
// check is draw
// reset
