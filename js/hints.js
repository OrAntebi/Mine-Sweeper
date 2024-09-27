'use strict'

// DONE
function onHintClick() {
    gHintIsClicked = true
    gGame.hintsCount--
    updateHints()
}

// DONE
function updateHints() {
    const elHint = document.querySelector('.hints')
    var hintHTML = ''

    for (var i = 0; i < gGame.hintsCount; i++) {
        hintHTML += HINT.trim();
    }
    elHint.innerHTML = hintHTML
}

// DONE
function revealNeighboringCells(board, cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j > board[i].length - 1) continue

            if (board[i][j].isShow) continue

            revealCell(board, i, j);
            board[i][j].isShow = false
        }
    }

    setTimeout(() => {
        for (var i = cellI - 1; i <= cellI + 1; i++) {
            if (i < 0 || i > gBoard.length - 1) continue
            for (var j = cellJ - 1; j <= cellJ + 1; j++) {
                if (j < 0 || j > gBoard[i].length - 1) continue

                if (gBoard[i][j].isShow) continue

                hideCell(board, i, j)
            }
        }
    }, 1000)
}