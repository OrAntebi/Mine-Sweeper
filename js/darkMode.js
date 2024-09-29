'use strict'

// DONE
function onDarkMode(elToggleDarkMode) {

    if (!gGame.isDarkMode) {
        elToggleDarkMode.innerText = 'Light Mode ☀️'
        gGame.isDarkMode = true
    } else {
        elToggleDarkMode.innerText = 'Dark Mode 🌙'
        gGame.isDarkMode = false
    }

    const darkModeElements = [
        '.game-container',
        '.timer',
        '.mines-counter',
        '.cell',
        '.safe-click-container',
        '.safe-click-title',
        '.mega-hint-container',
        '.beginner-btn',
        '.medium-btn',
        '.expert-btn',
        '.dark-mode-toggle',
        '.best-score-container'
    ]

    for (var i = 0; i < darkModeElements.length; i++) {
        const elements = document.querySelectorAll(darkModeElements[i]);

        elements.forEach(function (element) {
            element.classList.toggle('dark-mode');
        });
    }
}