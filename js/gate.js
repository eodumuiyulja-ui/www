(() => {
  const gate = document.getElementById('gate');
  const registration = document.getElementById('registration');
  const site = document.getElementById('site');
  const enterBtn = document.getElementById('enterBtn');
  const skipBtn = document.getElementById('skipBtn');
  const accessBtn = document.getElementById('accessBtn');
  const regTitle = document.getElementById('regTitle');
  const regText = document.getElementById('regText');
  const regLog = document.getElementById('regLog');
  const gateSystemText = document.getElementById('gateSystemText');
  const particles = document.getElementById('particles');

  let timers = [];

  // Create ambient particles
  function createParticles() {
    if (!particles) return;
    for (let i = 0; i < 32; i++) {
      const dot = document.createElement('i');
      dot.style.left = `${(i * 37 + 13) % 100}%`;
      dot.style.top = `${(i * 53 + 9) % 100}%`;
      dot.style.animationDuration = `${10 + (i % 7) * 1.8}s`;
      dot.style.animationDelay = `${-(i % 11) * 1.1}s`;
      particles.appendChild(dot);
    }
  }

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function addLog(msg, type = '') {
    const line = document.createElement('div');
    line.className = `log-line ${type}`;
    line.textContent = `> ${msg}`;
    regLog.appendChild(line);
  }

  function showSite() {
    clearTimers();
    gate.classList.add('hidden');
    registration.classList.add('hidden');
    site.classList.remove('hidden');
  }

  function runSequence() {
    clearTimers();
    regLog.innerHTML = '';
    accessBtn.classList.add('hidden');
    enterBtn.disabled = true;
    skipBtn.disabled = true;

    gate.classList.remove('fade-out', 'hidden');
    registration.classList.add('hidden');
    site.classList.add('hidden');
    gate.classList.add('connecting');
    gateSystemText.textContent = 'INTERDIMENSIONAL GATE SYSTEM';

    const steps = [
      [600,  '관문 에너지 반응 확인', 'ok'],
      [1400, '차원 좌표 검색 중...'],
      [2300, 'CENTRAL HUB 좌표 확인', 'ok'],
      [3200, '연결 안정성 검사 완료', 'ok'],
      [4000, '관문 개방', 'ok']
    ];

    steps.forEach(([delay, msg]) => {
      timers.push(setTimeout(() => {
        gateSystemText.textContent = msg.toUpperCase();
      }, delay));
    });

    // Transition to registration
    timers.push(setTimeout(() => {
      gate.classList.add('fade-out');
      registration.classList.remove('hidden');
      regTitle.textContent = '중앙 허브 도착';
      regText.textContent = '방문자의 중앙 허브 진입이 확인되었습니다.';

      addLog('GATE CONNECTION: ESTABLISHED', 'ok');
      addLog('DESTINATION: ORBIS CENTRAL HUB', 'ok');
      addLog('VISITOR STATUS: UNREGISTERED', 'warn');
      addLog('TRAVELER REGISTRATION: IN PROGRESS');
    }, 4800));

    // Finish registration
    timers.push(setTimeout(() => {
      regTitle.textContent = '여행자 등록 완료';
      regText.textContent = '신규 방문자가 오르비스 소속 여행자로 등록되었습니다.';
      addLog('ASSIGNED RANK: 05 / TRAVELER', 'ok');
      addLog('ACCESS PERMISSION: TRAVELER', 'ok');
      addLog('WELCOME TO ORBIS.', 'ok');
      accessBtn.classList.remove('hidden');
      enterBtn.disabled = false;
      skipBtn.disabled = false;
    }, 6200));
  }

  function skipSequence() {
    clearTimers();
    gate.classList.add('hidden');
    registration.classList.remove('hidden');
    regTitle.textContent = '여행자 등록 완료';
    regText.textContent = '인트로를 건너뛰었습니다. 방문자 등록이 완료되었습니다.';
    regLog.innerHTML = '';
    ['GATE CONNECTION: ESTABLISHED', 'DESTINATION: ORBIS CENTRAL HUB',
     'ASSIGNED RANK: 05 / TRAVELER', 'ACCESS PERMISSION: TRAVELER']
      .forEach(msg => addLog(msg, 'ok'));
    accessBtn.classList.remove('hidden');
  }

  // Event listeners
  enterBtn.addEventListener('click', runSequence);
  skipBtn.addEventListener('click', skipSequence);
  accessBtn.addEventListener('click', showSite);

  // Init
  createParticles();
})();