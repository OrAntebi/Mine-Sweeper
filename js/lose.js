'use strict'

// DONE
function checkLossCondition() {
    if (gGame.livesCount === 0) loseGame()
}

// DONE
function loseGame() {
    gGame.isOn = false
    stopTimer()
    document.querySelector('.smiley-btn').innerText = SMILEY_LOSS
    showModal('Loss')
}