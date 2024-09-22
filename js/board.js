'use strict'

const SMILEY = '🙂'
const SMILEY_LOSS = '🤯'
const SMILEY_WIN = '😎'
const MINE = '💣'
const FLAG = '🚩'
const HEART = '❤️'
const EMPTY = ' '

var gBoard
var gTimerInterval

const gLevels = {
    Beginner: { DIFFICULTY: 'Beginner', SIZE: 4, MINES: 2 },
    Medium: { DIFFICULTY: 'Medium', SIZE: 8, MINES: 14 },
    Expert: { DIFFICULTY: 'Expert', SIZE: 12, MINES: 32 }
}

const gGame = {
    isOn: false,
    difficulty: gLevels.Beginner.DIFFICULTY,
    boardSize: 4,
    livesCount: 3,
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

    gBoard = buildBoard()
    placeRandomMines(gBoard, gGame.minesCount)
    updateMinesCounter(gGame.minesCount)
    calcMinesAroundEachCell(gBoard)
    renderBoard(gBoard)
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
            var className = `cell cell-${i}-${j}`
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
        
        if (!board[idxI][idxJ].isMine) {
            board[idxI][idxJ].isMine = true
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
function calcMinesAroundEachCell(board) {
    const boardSize = board.length;
    
    for (var i = 0; i < boardSize; i++) {
        for (var j = 0; j < boardSize; j++) {
            if (!board[i][j].isMine) {
                board[i][j].minesAroundCount = setMinesNegsCount(board, i, j);
            }
        }
    }
}

// DONE
function setMinesNegsCount(board, cellI, cellJ) {

    var miensNegsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i > board.length - 1) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j > board[i].length - 1) continue;
            if (i === cellI && j === cellJ) continue;

            if (board[i][j].isMine) miensNegsCount++;
        }
    }
    return miensNegsCount;
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

            revealCell(i, j)
            neighbor.isShow = true
            
            
            if (neighbor.minesAroundCount === 0) {
                expandShown(board, i, j)
            }
        }
    }
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

    elCell.innerText = currCell.isMine ? MINE : currCell.minesAroundCount
    elCell.style.backgroundColor = currCell.isMine ? '#c32929' : 'lightgrey';
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
function revealCell(i, j) {
    var elCell = document.querySelector(`.cell-${i}-${j}`);

    if (gBoard[i][j].isShow) return

    elCell.classList.add('revealed')
    gBoard[i][j].isShow = true
    gGame.showCount++


    if (gBoard[i][j].minesAroundCount > 0) {
        elCell.innerText = gBoard[i][j].minesAroundCount;
    } else {
        elCell.innerText = ''
    }
}

// DONE
function checkWinCondition() {
    const totalCells = gBoard.length ** 2;
    if (gGame.livesCount > 0 &&
        gGame.showCount === totalCells - gGame.minesCount ||
        gGame.showCount === (gBoard.length ** 2 - gGame.minesCount)) {
        winGame();
    }
}

// DONE
function checkLossCondition() {
    if (gGame.livesCount === 0) loseGame() 
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
function updateLives() {
    const elHeartsContainer  = document.querySelector('.lives-container p')
    var heartHTML = ''

    for (var i = 0; i < gGame.livesCount; i++) {
        heartHTML += HEART
    }
    elHeartsContainer.innerHTML = heartHTML
}

// DONE
function startTimer() {
    if (gGame.isOn) {
        gTimerInterval = setInterval(() => {
            gGame.secsPassed++
            const minutes = String(Math.floor(gGame.secsPassed / 60)).padStart(2, '0')
            const seconds = String(gGame.secsPassed % 60).padStart(2, '0')
            document.querySelector('.timer').innerText = `${minutes}:${seconds}`
        }, 1000)
    }
}

// DONE
function stopTimer() {
    if (!gGame.isOn) {
        clearInterval(gTimerInterval)
    }
}

// DONE
function resetTimer() {
    clearInterval(gTimerInterval)
    gGame.secsPassed = 0
    document.querySelector('.timer').innerText = '00:00'
}

// DONE
function updateDifficultyAndInit(elDifficultyBtn) {
    const difficulty = elDifficultyBtn.innerText;
    gGame.difficulty = difficulty;
    const { boardSize, minesCount } = getBoardSettings()
    gGame.minesCount = minesCount
    gGame.boardSize = boardSize
    onInit()
}

// DONE
function getBoardSettings() {
    let boardSize = 0
    let minesCount = 0

    switch (gGame.difficulty) {
        case 'Beginner':
            boardSize = gLevels.Beginner.SIZE
            minesCount = gLevels.Beginner.MINES
            break

        case 'Medium':
            boardSize = gLevels.Medium.SIZE
            minesCount = gLevels.Medium.MINES
            break

        case 'Expert':
            boardSize = gLevels.Expert.SIZE
            minesCount = gLevels.Expert.MINES
            break
    }
    return { boardSize, minesCount }
}

// DONE
function winGame() {
    const elSmiley = document.querySelector('.smiley-btn')
    elSmiley.innerText = SMILEY_WIN
    showModal('Win')
    gGame.isOn = false
    stopTimer()
}

// DONE
function loseGame() {
    const elSmiley = document.querySelector('.smiley-btn')
    elSmiley.innerText = SMILEY_LOSS
    showModal('Loss')
    gGame.isOn = false
    stopTimer()
}

// DONE
function restartGameBtn() {
    gGame.livesCount = 3
    gGame.showCount = 0
    gGame.markedCount = 0
    gGame.minesCount = gLevels[gGame.difficulty].MINES
    
    const elSmiley = document.querySelector('.smiley-btn')
    elSmiley.innerText = SMILEY
    
    hideModal()
    updateLives()
    onInit()
}

// DONE
function initVariables() {
    gGame.isOn = false
    gGame.livesCount = 3
    gGame.showCount = 0
}

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