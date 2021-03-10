'use strict';
// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  // starting elements
  scores = [0, 0];
  // the scores are for the total/ accumulation of scores.
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  diceEl.classList.add('hidden');

  // reset the total score of player 1 to 0
  document.getElementById('score--0').textContent = 0;
  // reset the total score of player 2 to 0
  document.getElementById('score--1').textContent = 0;
  // reset the current score of player 1 to 0
  document.getElementById('current--0').textContent = 0;
  // reset the current score of player 2 to 0
  document.getElementById('current--1').textContent = 0;
  // the dice should be hidden-add the hidden class using classlist
  diceEl.classList.add('hidden');
  // remove the winner class
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  // remove the active class
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display file
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. Check for rolled 1: if true, switch to next player
    if (dice != 1) {
      //   Add dice to current number
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //   Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to score of active player
    scores[activePlayer] += currentScore;
    // what they are trying to say is that if the activeplayer is 1 then the score of the activeplayer should besummed with the currentscore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check if score is at least 100
    if (scores[activePlayer] >= 100) {
      // finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

// resetting the game
btnNew.addEventListener('click', init);
