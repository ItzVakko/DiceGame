const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const FirstPlayer = document.querySelector(".player--0");
const SecPlayer = document.querySelector(".player--1");
//Buttons
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
//Functions

let currentScore, activePlayer, playerScores, playingStatus;
const newGame = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  playerScores = [0, 0];
  playingStatus = true;
  diceEl.classList.add("hidden");
  FirstPlayer.classList.remove("player--winner");
  SecPlayer.classList.remove("player--winner");
  FirstPlayer.classList.add("player--active");
  SecPlayer.classList.remove("player--active");
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
};
newGame();

const switchP = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  FirstPlayer.classList.toggle("player--active");
  SecPlayer.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playingStatus) {
    //1. დამიგენერირე რენდომ კამათლის გაგორება
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. ეკრანზე გამომიტანე კამათელი;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    // 3. შეამოწმოს 1 გაგორდა თუ არა, თუ გაგორდა თამაში გადავიდეს მეორეზე
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchP();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playingStatus) {
    playerScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      playerScores[activePlayer];

    if (playerScores[activePlayer] >= 100) {
      playingStatus = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
    }
    switchP();
  }
});

btnNew.addEventListener("click", newGame);
