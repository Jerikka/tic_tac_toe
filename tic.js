const cells = [...document.getElementsByClassName("cell")];
const gameOverMessage = document.getElementById('gameOverMessage');
const playAgainBtn = document.getElementById('button');
const gameOverSpace = document.getElementById('game-over-space');

let playerCount = 0;
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')
let drawIndicator = getComputedStyle(document.body).getPropertyValue('--draw-blocks')

const playerOne = "X";
const playerTwo = "O";
let currentPlayer = playerOne;

let gameState = Array(9).fill(null);

const gameStart = () => {
    cells.forEach(cell => cell.addEventListener('click', cellClicked))
}

function cellClicked(event) {
    const id = event.target.id

    if(!gameState[id] && playerCount < 9){
        gameState[id] = currentPlayer
        event.target.innerText = currentPlayer

        if(winningPlayer() !==false){
            gameOverMessage.innerText = `${currentPlayer} has won! Let's play again!`
            let winning_blocks = winningPlayer()
            playerCount = 10
            winning_blocks.map(cell => cells[cell].style.backgroundColor=winnerIndicator)
            gameOverSpace.hidden = false;
            return
        }
        playerCount++
        currentPlayer = currentPlayer == playerOne ? playerTwo: playerOne;
    }

    if (playerCount === 9) {
        cells.forEach(cell => cell.style.color = drawIndicator);
        gameOverSpace.hidden = false;
        gameOverMessage.innerText = "It's a draw, let's play again!"
    }
}


const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
]

function winningPlayer() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;

        if(gameState[a] && (gameState[a] == gameState[b] && gameState[a] == gameState[c])) {
            return [a, b, c]
        }
    } 
    return false;
}

playAgainBtn.addEventListener('click', restart)

function restart() {
    gameState.fill(null)
    playerCount = 0

    cells.forEach( cell => {
        cell.innerText = ''
        cell.style.backgroundColor='';
        cell.style.color = "#F56EB3"
        gameOverSpace.hidden=true;
    })

    currentPlayer = playerOne
};

gameStart()