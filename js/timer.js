'use strict'

// DONE
function startTimer() {
    if (!gGame.isOn) return
    gTimerInterval = setInterval(() => {
        gGame.secsPassed++
        const minutes = String(Math.floor(gGame.secsPassed / 60)).padStart(2, '0')
        const seconds = String(gGame.secsPassed % 60).padStart(2, '0')
        document.querySelector('.timer').innerText = `${minutes}:${seconds}`
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
    gGame.secsPassed = 0
    document.querySelector('.timer').innerText = '00:00'
}