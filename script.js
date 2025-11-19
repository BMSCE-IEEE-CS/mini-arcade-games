(function () {
  const box = document.getElementById('box');
  const message = document.getElementById('message');
  const resetBtn = document.getElementById('resetBtn');
  const roundsSelect = document.getElementById('roundsSelect');

  const roundSpan = document.getElementById('round');
  const totalRoundsSpan = document.getElementById('totalRounds');
  const lastTimeSpan = document.getElementById('lastTime');
  const bestTimeSpan = document.getElementById('bestTime');
  const avgTimeSpan = document.getElementById('avgTime');
  const highScoreSpan = document.getElementById('highScore'); // ADD THIS IN HTML

  let state = 'idle';
  let timeoutId = null;
  let startTime = 0;
  let results = [];
  let currentRound = 0;
  let totalRounds = parseInt(roundsSelect.value, 10);

  // Load high score
  let highScore = localStorage.getItem("reactionHighScore")
    ? parseInt(localStorage.getItem("reactionHighScore"))
    : null;

  function setState(newState, text) {
    state = newState;
    box.className = 'box ' + newState;
    message.textContent = text;
  }

  function updateHighScoreUI() {
    highScoreSpan.textContent = highScore ? highScore + " ms" : "--";
  }

  function animateFalseStart() {
    let flashes = 0;
    const flashInterval = setInterval(() => {
      box.style.backgroundColor = flashes % 2 === 0 ? "#ef4444" : "#0f1724";
      flashes++;
      if (flashes > 6) {
        clearInterval(flashInterval);
        box.style.backgroundColor = "";
      }
    }, 100);
  }

  function updateUI() {
    roundSpan.textContent = currentRound;
    totalRoundsSpan.textContent = totalRounds;
    lastTimeSpan.textContent = results.length ? results[results.length - 1] : '--';
    bestTimeSpan.textContent = results.length ? Math.min(...results) : '--';

    avgTimeSpan.textContent =
      results.length
        ? Math.round(results.reduce((a, b) => a + b, 0) / results.length)
        : '--';
  }

  function startRound() {
    setState('waiting', 'Get ready... wait for green');
    const delay = 750 + Math.floor(Math.random() * 1750);

    timeoutId = setTimeout(() => {
      setState('go', 'CLICK!');
      startTime = performance.now();
      state = 'go';
    }, delay);
  }

  function falseStart() {
    clearTimeout(timeoutId);
    animateFalseStart(); // NEW ANIMATION
    setState('false', 'False start! Click to continue');
    recordResult(null);
  }

  function recordResult(ms) {
    // FALSE START (should NOT count a round)
    if (ms === null) {
      const penalty = 10000;
      results.push(penalty);
      lastTimeSpan.textContent = 'FS';
      updateUI();
      return;
    }

    // VALID ROUND
    const time = Math.round(ms);
    results.push(time);
    currentRound += 1;

    updateUI();

    // Update high score (ignore penalties)
    if (!highScore || time < highScore) {
      highScore = time;
      localStorage.setItem("reactionHighScore", time);
      updateHighScoreUI();
    }

    // Max rounds crossed
    if (currentRound > totalRounds) {
      alert("Max rounds crossed. Restarting.");
      results = [];
      currentRound = 0;
      totalRounds = parseInt(roundsSelect.value, 10);
      setState('waiting', 'Click to start');
      updateUI();
      return;
    }

    if (currentRound === totalRounds) {
      finishGame();
      return;
    }

    setTimeout(() => {
      setState('waiting', 'Click to start next round');
    }, 800);
  }

  function finishGame() {
    setState('waiting', 'Game complete — click to play again');

    const valid = results.filter(r => r < 5000);
    const best = valid.length ? Math.min(...valid) : '--';
    bestTimeSpan.textContent = best === '--' ? '--' : best;
    updateUI();
  }

  box.addEventListener('click', () => {
    if (state === 'idle' || state === 'waiting') {
      setState('waiting', 'Get ready...');
      startRound();
    } 
    else if (state === 'go') {
      const elapsed = performance.now() - startTime;
      setState('waiting', `${Math.round(elapsed)} ms — good! Click to continue`);
      recordResult(elapsed);
    } 
    else if (state === 'false') {
      setState('waiting', 'Get ready...');
      startRound();
    }
  });

  box.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      box.click();
    }
  });

  box.addEventListener('mousedown', () => {
    if (state === 'waiting' && timeoutId) {
      falseStart();
    }
  });

  resetBtn.addEventListener('click', () => {
    clearTimeout(timeoutId);
    results = [];
    currentRound = 0;
    totalRounds = parseInt(roundsSelect.value, 10);
    setState('waiting', 'Click to start');
    updateUI();
  });

  roundsSelect.addEventListener('change', () => {
    totalRounds = parseInt(roundsSelect.value, 10);
    totalRoundsSpan.textContent = totalRounds;
  });

  // initialize
  totalRoundsSpan.textContent = totalRounds;
  setState('waiting', 'Click to start');
  updateHighScoreUI();
  updateUI();
})();
