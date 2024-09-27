'use strict'

// DONE
function updateLives() {
    const elHeartsContainer = document.querySelector('.lives')
    var heartHTML = ''

    for (var i = 0; i < gGame.livesCount; i++) {
        heartHTML += HEART
    }
    elHeartsContainer.innerHTML = heartHTML
}