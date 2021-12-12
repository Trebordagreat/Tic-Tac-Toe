
const Player = (symbol, role) => {

    const winCheck = () => {
        const winConditions = ['row0', 'row1', 'row2', 'col0', 'col1', 'col2', 'TL-BR', 'BL-TR'];
        for (let i = 0; i < winConditions.length; i++) {
            let matchingSymbol = 0;
            const winConditionCells = document.querySelectorAll(`.${ winConditions[i] }`);
            winConditionCells.forEach(cell => {
                if (cell.textContent === symbol) {
                    matchingSymbol++;
                }
            });
            if (matchingSymbol === 3) {
                return true;
            }
        }
    }

    let playerName = "Computer";
    if (role === 'player') {
        playerName = 'You';
    }

    return {
        symbol,
        winCheck,
        playerName
    };
}

let xPlayer = Player('X', 'player');
let oPlayer = Player('O', 'computer');

const gameFlow = (() => {
    let gameTurn = 1;

    const newGame = () => {
        gameTurn = 1;
    }

    const currentPlayer = () => {
        if (gameTurn % 2 === 1) {
            return xPlayer;
        }
        else {
            return oPlayer;
        }
    }

    const alternatePlayers = () => {
        console.log(currentPlayer());
        endGame();
        console.log(gameTurn);
        gameTurn++;
    }

    const endGame = () => {
        const resultMessage = document.createElement('div');
        resultMessage.classList.add('results');
        console.log(currentPlayer().symbol);
        
        if (currentPlayer().winCheck() === true) {
            resultMessage.textContent = `${ currentPlayer().playerName } won the match`;
            console.log("test");
        }
        else if (gameTurn === 9) {
            resultMessage.textContent = "The match was a tie";
        }
        document.querySelector('.game').appendChild(resultMessage);
    }

    return {
        currentPlayer,
        alternatePlayers,
        newGame
    }
})();

const gameBoard = (() => {
    const gameBoardArray = ['','','','','','', '', '', ''];

    const markSymbol = () => {
        
        document.querySelectorAll('td').forEach((cell, index) => {

            if (cell.classList.contains('openCell') && gameFlow.currentPlayer().winCheck() !== true) {
                cell.addEventListener('click', function markCell () {
                    gameBoardArray[index] = gameFlow.currentPlayer().symbol;
                    createBoard();
                    if (gameFlow.currentPlayer().winCheck() !== true) {
                        gameFlow.alternatePlayers();
                        setTimeout(function() {
                            computerPicksRandom();
                        }, 700);
                    }
                    else {
                        gameFlow.alternatePlayers();
                    }
                });
            }
        });    
    }

    const resetBoard = (resetButton) => {
        resetButton.addEventListener('click', () => {
            for (let i = 0; i < gameBoardArray.length; i++) {
                gameBoardArray[i] = "";
            }
            createBoard();
            gameFlow.newGame();
        });
        return resetButton;
    }

    const createBoard = () => {
        const page = document.querySelector('.game');

        if (previousBoard = document.querySelector('table')) {
            page.removeChild(previousBoard);
            page.removeChild(document.querySelector('.reset'));
        };
        if (previousVictory = document.querySelector('.results')) {
            page.removeChild(previousVictory);
        }

        let board = document.createElement('table')
        for (let i = 0; i < 3; i++) {
            let boardRow = document.createElement('tr')
            for (let j = 0; j < 3; j++) {
                let boardCell = document.createElement('td');
                boardCell.classList.add(`row${ i }`);
                boardCell.classList.add(`col${ j }`);
                if (i === 0 && j === 0) {
                    boardCell.classList.add('TL-BR');
                }
                else if (i === 2 && j === 2) {
                    boardCell.classList.add('TL-BR');
                }
                else if (i === 0 && j === 2) {
                    boardCell.classList.add('BL-TR');
                }
                else if (i === 2 && j === 0) {
                    boardCell.classList.add('BL-TR');
                }
                else if (i === 1 && j === 1) {
                    boardCell.classList.add('TL-BR', 'BL-TR');
                }
                if (gameBoardArray[i * 3 + j] === "") {
                    boardCell.classList.add('openCell');
                }
                boardCell.textContent = `${ gameBoardArray[i * 3 + j]}`;
                boardRow.appendChild(boardCell);
            }
            board.appendChild(boardRow);
        }
        const resetButton = document.createElement('button');
        resetButton.textContent = "Reset Game";
        resetButton.classList.add('reset');
        resetBoard(resetButton);

        page.appendChild(board); 
        page.appendChild(resetButton);
        markSymbol();
    }

    const computerPicksRandom = () => {
        let possiblePicks = [];
        for (let i = 0; i < gameBoardArray.length; i++) {
            if (gameBoardArray[i] === "") {
                possiblePicks.push(i);
            }
        }

        const picked = possiblePicks[Math.floor(Math.random() * possiblePicks.length)];

        gameBoardArray[picked] = gameFlow.currentPlayer().symbol;

        createBoard();
        gameFlow.alternatePlayers();
    }

    return {
        createBoard,
        gameBoardArray,
        computerPicksRandom,
        resetBoard
    };
})();

const setUpPage = (() => {

    const retrieveName = () => {
        let nameField = document.createElement('input');
        nameField.setAttribute('placeholder', 'Name');
        nameField.setAttribute('value', 'You');
        nameField.classList.add('playerName');
        document.querySelector('.game').appendChild(nameField);
    }

    const choosePlayerButtons = () => {
        const chooseSymbolDiv = document.createElement('div');
        const chooseXButton = document.createElement('button');
        const chooseOButton = document.createElement('button');

        chooseXButton.textContent = "X";
        chooseOButton.textContent = "O";

        gameBoard.resetBoard(chooseXButton);
        gameBoard.resetBoard(chooseOButton);

        chooseXButton.addEventListener('click', () => {
            gameBoard.createBoard
            xPlayer = Player('X', 'player');
            oPlayer = Player('O', 'computer');
        });
        chooseOButton.addEventListener('click', () => {
            xPlayer = Player('X', 'computer');
            oPlayer = Player('O', 'player');
            gameBoard.computerPicksRandom();
            gameBoard.createBoard();
        })

        chooseSymbolDiv.appendChild(chooseXButton);
        chooseSymbolDiv.appendChild(chooseOButton);
        document.querySelector('.game').appendChild(chooseSymbolDiv);
    }

    return {
        retrieveName,
        choosePlayerButtons
    };
})();

setUpPage.retrieveName()
setUpPage.choosePlayerButtons();
gameBoard.createBoard();