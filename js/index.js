window.onload = function() {
  const holes = document.querySelectorAll('.hole');
  const scoreBoard = document.querySelector('.score');
  const moles = document.querySelectorAll('.mole');
  const startBtn = document.getElementById('start_btn');
  let titleH1 = document.getElementById('title');
  let timeUp = false;
  let score = 0;
  let gameTime = 10000;
  let lastHole;
  let moleStay;
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
    setTimeout(() => {
      startBtn.innerText = "newgame";
      timeUp = true;
      clearTimeout(moleStay);
    }, gameTime)
  }

  function resetScoreAndTime() {
    score = 0;
    scoreBoard.innerText = score;
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
    return time = Math.floor(Math.random() * (max - min + 1) + min);
  }

  function randomHole(holes) {
    let outHole = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    if (outHole === lastHole) {
      outHole = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    }
    lastHole = outHole;
    return holes[outHole];
  }

  function holeup(hole) {
    hole.classList.add('up');
  }

  function holedown(hole) {
    hole.classList.remove('up');
  }

  function comeOutAndStop(hole, time) {
    holeup();
    moleStay = setTimeout(function() {
      holedown();
      peep();
    }, time);
  }
  moles.forEach(mole => mole.addEventListener('click', function(e) {
    let hole = holes[lastHole];
    holedown();
    score += 1;
    scoreBoard.innerText = score;
    peep();
  }));
};