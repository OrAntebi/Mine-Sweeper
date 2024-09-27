'use strict'

// DONE
function onSafeClick() {
    if (gGame.safeClicksCount <= 0) return
    gGame.safeClicksCount--
    updateSafeClicking()
    randomSafeClickCell(gBoard)
}

// DONE
function updateSafeClicking() {
    const elSafeClickingContainer = document.querySelector('.safe-click-title span')
    elSafeClickingContainer.innerHTML = gGame.safeClicksCount
}

// DONE
function randomSafeClickCell(board) {

    var unshownCells = []

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]
            if (currCell.isShow || currCell.isMine) continue
            if (currCell.isMarked) {
                currCell.isMarked = false
                gGame.markedCount--
                updateMinesCounter(gGame.minesCount)
            }
            unshownCells.push({ i, j, cell: currCell })
        }
    }

    var idx = getRandomInt(0, unshownCells.length)
    var randomUnshownCell = unshownCells[idx]

    revealCell(board, randomUnshownCell.i, randomUnshownCell.j)

    setTimeout(() => {
        hideCell(board, randomUnshownCell.i, randomUnshownCell.j)
    }, 2000)
}