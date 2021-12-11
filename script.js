
const setUpPage = (() => {

    const retrieveName = () => {
        let nameField = document.createElement('input');
        nameField.setAttribute('placeholder', 'Name');
        nameField.setAttribute('value', 'You');
        nameField.classList.add('playerName');
        document.querySelector('.game').appendChild(nameField);
    }

    const generatePage = () => {
        retrieveName();

    }

    return {
        retrieveName
    };
})();

setUpPage.retrieveName()

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
        playerName = document.querySelector('input').value
    }

    return {
        symbol,
        winCheck,
        playerName
    };
}

const xPlayer = Player('X', 'player');
const oPlayer = Player('O', 'computer');

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
        endGame(); 
        gameTurn++;
    }

    const endGame = () => {
        const resultMessage = document.createElement('div');
        resultMessage.classList.add('results');
        
        if (currentPlayer().winCheck() === true) {
            resultMessage.textContent = `${ currentPlayer().playerName } won the match`;
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
                            createBoard();
                        }, 1000);
                    }
                    else {
                        gameFlow.alternatePlayers();
                    }
                });
            }
        });    
    }

    const resetBoard = () => {
        const resetButton = document.createElement('button');
        resetButton.textContent = "Reset Game";
        resetButton.classList.add('reset');
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
        const resetButton = resetBoard();

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
        console.log(possiblePicks);
        const picked = possiblePicks[Math.floor(Math.random() * possiblePicks.length)];
        console.log(picked);

        gameBoardArray[picked] = gameFlow.currentPlayer().symbol;
        gameFlow.alternatePlayers();
    }

    return {
        createBoard,
        gameBoardArray,
        computerPicksRandom
    };
})();

gameBoard.createBoard();