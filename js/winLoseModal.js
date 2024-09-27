'use strict'

// DONE
function showModal(gameStatus) {
    if (gameStatus === 'Win') {
        const elOverlay = document.querySelector('.overlay')
        const elWinPopup = document.querySelector('.victory-popup')
        elOverlay.classList.remove('hidden')
        elWinPopup.classList.remove('hidden')
    } else {
        const elOverlay = document.querySelector('.overlay')
        const elLossPopup = document.querySelector('.loss-popup')
        elOverlay.classList.remove('hidden')
        elLossPopup.classList.remove('hidden')
    }
}

// DONE
function hideModal() {
    const elOverlay = document.querySelector('.overlay')
    const elWinPopup = document.querySelector('.victory-popup')
    const elLossPopup = document.querySelector('.loss-popup')

    elOverlay.classList.add('hidden')
    elWinPopup.classList.add('hidden')
    elLossPopup.classList.add('hidden')

}