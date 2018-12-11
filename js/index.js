window.onload = function() {
  const holes = document.querySelectorAll('.hole');
  const scoreBoard = document.querySelector('.score');
  const moles = document.querySelectorAll('.mole');
  const startBtn = document.getElementById('start_btn');
  let titleH1 = document.getElementById('title');
  let timeUp = false;
  let score = 0;
  let gameTime = 10000;
  let previousHole;
  let moleStay;
  let timeOver;
  startBtn.addEventListener('click', function() {
    showBtnAnimation();
    startGame();
  }, false);

  function showBtnAnimation() {
    event.preventDefault();
    startBtn.classList.add('animate');
    setTimeout(() => {
      startBtn.classList.remove('animate');
      startBtn.style.display = 'none';
    }, 700);
  }

  function startGame() {
    resetScoreAndTime();
    peep();
    timeOver = setTimeout(() => {
      startBtn.innerText = "newgame";
      timeUp = true;
      clearTimeout(moleStay);
    }, gameTime)
  }

  function resetScoreAndTime() {
    score = 0;
    scoreBoard.innerText = score;
    clearTimeout(timeOver);
    timeUp = false;
  }

  function peep() {
    if (!timeUp) {
      clearTimeout(moleStay);
      const time = randomTime(200, 1000);
      const hole = randomHole(holes);
      comeOutAndStop(hole, time);
    }
  }

  function randomTime(min, max) {
    let time = Math.floor(Math.random() * (max - min + 1) + min);
    return time;
  }

  function randomHole(holes) {
    let outHole = Math.floor(Math.random() * 6 + 1);
    if (outHole === previousHole) {
      outHole = Math.floor(Math.random() * 6 + 1);
    }
    previousHole = outHole;
    return holes[outHole];
  }

  function comeOutAndStop(hole, time) {
    hole.classList.add("up");
    moleStay = setTimeout(function() {
      hole.classList.remove("up");
      peep();
    }, time);
  }
  moles.forEach(mole => mole.addEventListener('click', function(e) {
    let clickHole = holes[previousHole];
    clickHole.classList.remove("up");
    score += 1;
    scoreBoard.innerText = score;
    peep();
  }));
};