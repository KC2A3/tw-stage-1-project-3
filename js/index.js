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
      // TODO: 写当游戏时间结束后要发生的事
    }, gameTime)
  }
  /**
   * 初始化设置.
   */
  function resetScoreAndTime() {
    score = 0;
    scoreBoard.innerText = score;
    timeUp = false;
  }
  /**
   * 出洞.
   */
  function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    comeOutAndStop(hole, time);
  }
  /**
   * 随机生成地鼠出洞的停留时间. 该时间其实是[min, max]间的随机数.
   *
   * @param min 随机数的下界.
   * @param max 随机数的上界.
   * @returns {number}
   */
  function randomTime(min, max) {
    var random = Math.floor(Math.random() * (max - min + 1) + min);
    return random;
  }
  /**
   * 随机选择地鼠钻出的地洞，如果与上一个是相同地洞，则重新选择一个地洞.
   *
   * @param holes
   * @returns {*}
   */
  function randomHole(holes) {
    let outHole = Math.floor(Math.random() * 6 + 1);
    if (outHole == previousHole) {
      outHole = Math.floor(Math.random() * 6 + 1);
    }
    previousHole = outHole;
    return holes[outHole];
  }
  /**
   * 地鼠出洞并停留相应时间，如果游戏时间未结束(timeUp)，继续出洞(peep).
   *
   * @param hole 地鼠所出地洞.
   * @param time 地鼠停留时间.
   */
  function comeOutAndStop(hole, time) {
    hole.classList.add("up");
    moleStay = setTimeout(newHole(), time);
  }

  function newHole {
    hole.classList.add("down");
    peep();
  }
  /**
   * 打地鼠。为每个moles添加点击事件，点击后分数显示+1，地鼠入洞。
   */
  moles.forEach(mole => mole.addEventListener('click', function(e) {
  let hole = holes[previousHole];
  hole.classList.add("down");
  score += 1;
  scoreBoard.innerText = score;
  peep();
  }));
};