'use strict'

// DONE
function onGameLevelClick(elDifficultyBtn) {
    const difficulty = elDifficultyBtn.innerText;
    gGame.difficulty = difficulty;
    const { boardSize, minesCount } = updateBoardSettings()
    gGame.minesCount = minesCount
    gGame.boardSize = boardSize
    onInit()
}

// DONE
function updateBoardSettings() {
    var boardSize = 0
    var minesCount = 0

    switch (gGame.difficulty) {
        case gLevels.Beginner.DIFFICULTY:
            boardSize = gLevels.Beginner.SIZE
            minesCount = gLevels.Beginner.MINES
            break

        case gLevels.Medium.DIFFICULTY:
            boardSize = gLevels.Medium.SIZE
            minesCount = gLevels.Medium.MINES
            break

        case gLevels.Expert.DIFFICULTY:
            boardSize = gLevels.Expert.SIZE
            minesCount = gLevels.Expert.MINES
            break

        default:
            boardSize = gLevels.Beginner.SIZE;
            minesCount = gLevels.Beginner.MINES;
            break
    }
    return { boardSize, minesCount }
}