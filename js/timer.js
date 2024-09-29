'use strict'

// DONE
function startTimer() {
    if (!gGame.isOn) return
    gTimerInterval = setInterval(() => {
        gGame.secsPassed++
        updateTimerDisplay()
    }, 1000)

}

// DONE
function stopTimer() {
    if (gGame.isOn) return
    clearInterval(gTimerInterval)
}

// DONE
function resetTimer() {
    clearInterval(gTimerInterval)
    gTimerInterval = 0
    gGame.secsPassed = 0
    document.querySelector('.timer').innerText = '00:00'
}


function updateTimerDisplay() {
    const minutes = Math.floor(gGame.secsPassed / 60).toString().padStart(2, '0');
    const seconds = (gGame.secsPassed % 60).toString().padStart(2, '0');
    document.querySelector('.timer').innerText = `${minutes}:${seconds}`;
}