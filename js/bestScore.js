'use strict'

// DONE
function getBestScore(level) {
    return localStorage.getItem(`bestScore_${level}`) || null
}

// DONE
function setBestScore(level, score) {
    localStorage.setItem(`bestScore_${level}`, score);
}

// DONE
function displayBestScore(level) {
    const bestScore = getBestScore(level);

    const minutes = String(Math.floor(bestScore / 60)).padStart(2, '0')
    const seconds = String(bestScore % 60).padStart(2, '0')

    const elBestScore = document.querySelector(`.${level.toLowerCase()}-best-score span`);

    if (bestScore) {
        elBestScore.innerText = `${minutes}:${seconds}`
    } else {
        elBestScore.innerText = '--:--'
    }
}

// DONE
function displayBestScores() {

    Object.keys(gLevels).forEach(level => {
        displayBestScore(gLevels[level].DIFFICULTY)
    })
}
