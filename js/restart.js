'use strict'

// DONE
function onRestartGame() {
    const elSmiley = document.querySelector('.smiley-btn')
    elSmiley.innerText = SMILEY
    hideModal()
    onInit()
}