'use strict'

// DONE
function checkWinCondition() {
    const totalCells = gBoard.length ** 2;
    if (gGame.livesCount > 0 &&
        gGame.showCount === totalCells - gGame.minesCount ||
        gGame.showCount === (gBoard.length ** 2 - gGame.minesCount)) {
        winGame();
    }
}

// DONE
function winGame() {
    gGame.isOn = false;
    stopTimer();
    document.querySelector('.smiley-btn').innerText = SMILEY_WIN;
    showModal('Win');

    const currScore = gGame.secsPassed;
    const bestScore = getBestScore(gGame.difficulty);
    
    displayBestScore(gGame.difficulty);

    if (!bestScore || currScore < bestScore) {
        setBestScore(gGame.difficulty, currScore);
        
        // Delay the alert to ensure the popup renders first
        setTimeout(() => {
            alert('New best score!');
        }, 10);
    }
}