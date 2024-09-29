'use strict'


function onMegaHintClick() {
    if (!gMegaHint.maxUses) {
        alert("You can only use Mega Hint once per game.")
        return
    }

    gMegaHint.activated = true
    alert('Mega Hint is activated! Select a start point and an end point to expose the cells for 2 seconds.');
}


function revealMegaHintCells(board, start, end) {
    const startRow = Math.min(start.i, end.i)
    const endRow = Math.max(start.i, end.i)
    const startCol = Math.min(start.j, end.j)
    const endCol = Math.max(start.j, end.j)

    for (var i = startRow; i <= endRow; i++) {
        for (var j = startCol; j <= endCol; j++) {
            const currCell = board[i][j]

            if (board[i][j].isShow) continue
            if (currCell.isMarked) {
                currCell.isMarked = false
                gGame.markedCount--
                updateMinesCounter(gGame.minesCount)
            }
            revealCell(board, i, j)
            currCell.isShow = false
        }
    }

    setTimeout(() => {
        for (var i = startRow; i <= endRow; i++) {
            for (var j = startCol; j <= endCol; j++) {

                if (gBoard[i][j].isShow) continue
                hideCell(board, i, j)
            }
        }
    }, 2000)
}
