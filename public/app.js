const msg = document.getElementById("msg");
// spread operator!!!!!!!! what a sexy ahhh operator is this???
let boxes = [...document.querySelectorAll(".box")];
// buttons
const reset = document.getElementById("reset"); // reset while playing
const newGameBtn = document.getElementById("new-btn"); // start new game after finishing the current game

const winConditions = {
  // horizontal
  case: [0, 1, 2],
  case: [3, 4, 5],
  case: [6, 7, 8],
  // vertical
  case: [0, 3, 6],
  case: [1, 4, 7],
  case: [2, 5, 8],
  // diagnal
  case: [0, 4, 8],
  case: [2, 4, 6],
};

// player turns
let turn0 = true;
let turn1 = false;

// let firstPlayerData = [0, 0, 0, 0, 0];
// let secondPlayerData = [0, 0, 0, 0];

boxes.forEach((box) => {
  box.addEventListener("click", function () {
    if (turn0) {
      box.style.backgroundColor = "gray";
      box.textContent = "X";
      turn0 = false;

      // check winner func goes up here
    } else {
      box.style.backgroundColor = "white";
      box.textContent = "o";
      turn0 = true;
    }
  });
  reset.addEventListener("click", function () {
    box.style.backgroundColor = "";
    box.textContent = "";
  });
});

// 1. how to integrate the winning conditions with the box elements
// 2. how to check the win conditions after each players actions
// 3. disable the cards after its clicked. For preventing the overlapping on the buttons
// how to select the box as element and then disable it
