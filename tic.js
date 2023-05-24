const cells = [...document.getElementsByClassName("cell")];
let playerText = document.getElementById('title');
let playAgainBtn = document.getElementById('button');
let gameOverSpace = document.getElementById('game-over-space');

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const playerOne = "X";
const playerTwo = "O";
let currentPlayer = playerOne;

let gameState = Array(9).fill(null);

const gameStart = () => {
    cells.forEach(cell => cell.addEventListener('click', cellClicked))
}

function cellClicked(event) {
    const id = event.target.id

    if(!gameState[id]){
        gameState[id] = currentPlayer
        event.target.innerText = currentPlayer

        if(winningPlayer() !==false){
            playerText = `${currentPlayer} has won!`
            let winning_blocks = winningPlayer()

            winning_blocks.map( cell => cells[cell].style.backgroundColor=winnerIndicator)
            gameOverSpace.hidden = false;
            return;
        }

        currentPlayer = currentPlayer == playerOne ? playerTwo: playerOne;
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

    cells.forEach( cell => {
        cell.innerText = ''
        cell.style.backgroundColor='';
        gameOverSpace.hidden=true;
    })

    playerText = 'Tic Tac Toe'

    currentPlayer = playerOne
};

gameStart()