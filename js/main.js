'use strict'

const SMILEY = '🙂'
const SMILEY_LOSS = '🤯'
const SMILEY_WIN = '😎'
const MINE = '💣'
const FLAG = '🚩'
const HEART = '❤️'
const HINT = '💡'
const EMPTY = ''
const MINE_BG = '#c32929'
const HIDDEN_CELL_BG = '#7c7c7c'
const REVEALED_CELL_BG = 'lightgrey'

var gBoard
var gTimerInterval
var gHintIsClicked = false

const gMegaHint = {
    activated: false,
    maxUses: 1,
    start: null,
    end: null
}


const gLevels = {
    Beginner: { DIFFICULTY: 'Beginner', SIZE: 4, MINES: 2 },
    Medium: { DIFFICULTY: 'Medium', SIZE: 8, MINES: 14 },
    Expert: { DIFFICULTY: 'Expert', SIZE: 12, MINES: 32 }
}

const gGame = {
    isOn: false,
    isDarkMode: false,
    difficulty: gLevels.Beginner.DIFFICULTY,
    boardSize: 4,
    livesCount: 3,
    hintsCount: 3,
    safeClicksCount: 3,
    secsPassed: 0,
    showCount: 0,
    markedCount: 0,
    minesCount: gLevels.Beginner.MINES
}


// DONE
function onInit() {
    initVariables()
    resetTimer()
    updateLives()
    updateHints()
    updateSafeClicking()
    displayBestScores()

    gBoard = buildBoard()
    placeRandomMines(gBoard, gGame.minesCount)
    updateMinesCounter(gGame.minesCount)
    setMinesAroundCounter(gBoard)
    renderBoard(gBoard)
}

// DONE
function initVariables() {
    gMegaHint.activated = false
    gMegaHint.maxUses = 1
    gMegaHint.start = null
    gMegaHint.end = null
    gHintIsClicked = false
    gGame.isOn = false
    gGame.livesCount = 3
    gGame.hintsCount = 3
    gGame.safeClicksCount = 3
    gGame.markedCount = 0
    gGame.showCount = 0
    gGame.minesCount = gLevels[gGame.difficulty].MINES
}

// DONE
function buildBoard() {
    var board = [];
    for (var i = 0; i < gGame.boardSize; i++) {
        board.push([])
        for (var j = 0; j < gGame.boardSize; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShow: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    return board
}

// DONE
function renderBoard(board) {
    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var className = gGame.isDarkMode ?
                `cell cell-${i}-${j} dark-mode` :
                `cell cell-${i}-${j}`

            strHTML += `
            <td
            title="i: ${i}, j: ${j}"
            onclick="onCellClicked(this, ${i}, ${j})"
            oncontextmenu="onCellMarked(event, this, ${i}, ${j})"
            class="${className}">
            </td>
            `
        }
        strHTML += '</tr>'
    }
    var elTable = document.querySelector('.table')
    elTable.innerHTML = strHTML
}

// DONE
function placeRandomMines(board, minesCount) {
    const boardSize = board.length
    var minesPlaced = 0

    while (minesPlaced < minesCount) {
        var idxI = getRandomInt(0, boardSize)
        var idxJ = getRandomInt(0, boardSize)
        var currCell = board[idxI][idxJ]

        if (!currCell.isMine) {
            currCell.isMine = true
            minesPlaced++
        }
    }
}

// DONE
function updateMinesCounter(minesCount) {
    const elMinesCounter = document.querySelector('.mines-counter')
    elMinesCounter.innerText = minesCount.toString().padStart(3, '0');
}

// DONE
function setMinesAroundCounter(board) {
    const boardSize = board.length;

    for (var i = 0; i < boardSize; i++) {
        for (var j = 0; j < boardSize; j++) {
            if (!board[i][j].isMine) {
                board[i][j].minesAroundCount = calculateMinesNegsCount(board, i, j);
            }
        }
    }
}

// DONE
function calculateMinesNegsCount(board, cellI, cellJ) {

    var minesNegsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i > board.length - 1) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j > board[i].length - 1) continue;
            if (i === cellI && j === cellJ) continue;

            if (board[i][j].isMine) minesNegsCount++;
        }
    }
    return minesNegsCount;
}


// DONE
function onCellClicked(elCell, i, j) {
    var currCell = gBoard[i][j]
    
    if (currCell.isMarked || currCell.isShow) return
    
    if (!gGame.isOn) {
        if (currCell.isMine) {
            onInit()
            return onCellClicked(document.querySelector(`.cell-${i}-${j}`), i, j)
        }
        gGame.isOn = true
        startTimer()
    }
    
    if (gHintIsClicked) {
        revealNeighboringCells(gBoard, i, j)
        gHintIsClicked = false
        return
    }

    if (gMegaHint.activated && gMegaHint.maxUses) {
        if (!gMegaHint.start) {
            gMegaHint.start = { i, j };
        } else {
            gMegaHint.end = { i, j };
            revealMegaHintCells(gBoard, gMegaHint.start, gMegaHint.end);
            gMegaHint.maxUses--
            gMegaHint.activated = false
            gMegaHint.start = null
            gMegaHint.end = null
        }
        return
    }
    
    elCell.innerText = currCell.isMine ? MINE : currCell.minesAroundCount
    elCell.style.backgroundColor = currCell.isMine ? MINE_BG : REVEALED_CELL_BG;
    currCell.isShow = true
    gGame.showCount++
    
    if (!currCell.isMine) {
        if (currCell.minesAroundCount === 0) {
            elCell.innerText = EMPTY
            expandShown(gBoard, i, j)
        }
    } else {
        gGame.livesCount--
        updateLives()
        updateMinesCounter(--gGame.minesCount)
        checkLossCondition()
    }
    checkWinCondition()
}

// DONE
function revealCell(board, i, j) {
    var elCell = document.querySelector(`.cell-${i}-${j}`);

    if (board[i][j].isShow) return

    elCell.classList.add('revealed')
    board[i][j].isShow = true
    gGame.showCount++


    if (gBoard[i][j].isMine) {
        elCell.innerText = MINE
        elCell.style.backgroundColor = MINE_BG
    } else {
        elCell.innerText = board[i][j].minesAroundCount > 0 ? board[i][j].minesAroundCount : EMPTY
    }
}

// DONE
function expandShown(board, cellI, cellJ) {

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[i].length) continue
            if (i === cellI && j === cellJ) continue

            var neighbor = board[i][j]

            if (neighbor.isShow || neighbor.isMine) continue
            if (neighbor.isMarked) {
                neighbor.isMarked = false
                gGame.markedCount--
                updateMinesCounter(gGame.minesCount - gGame.markedCount)
            }

            revealCell(board, i, j)
            neighbor.isShow = true


            if (neighbor.minesAroundCount === 0) {
                expandShown(board, i, j)
            }
        }
    }
}

// DONE
function onCellMarked(event, elCell, i, j) {
    event.preventDefault()
    var currCell = gBoard[i][j]

    if (!gGame.isOn) {
        gGame.isOn = true
        startTimer()
    }

    if (currCell.isShow) return

    if (!currCell.isMarked) {
        if (gGame.markedCount >= gGame.minesCount) return
        elCell.innerText = FLAG
        currCell.isMarked = true
        gGame.markedCount++
        updateMinesCounter(gGame.minesCount - gGame.markedCount)
        checkWinCondition()
    } else {
        elCell.innerText = EMPTY
        currCell.isMarked = false
        gGame.markedCount--
        updateMinesCounter(gGame.minesCount - gGame.markedCount)
    }
}

// DONE
function hideCell(board, i, j) {
    var elCell = document.querySelector(`.cell-${i}-${j}`);

    elCell.classList.remove('revealed');
    elCell.innerText = ''
    board[i][j].isShow = false
    gGame.showCount--

    if (board[i][j].isMine) {
        elCell.style.backgroundColor = HIDDEN_CELL_BG
    }

}
