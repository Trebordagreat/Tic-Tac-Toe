const gameBoard = (() => {
    const gameBoardArray = ['','','','','','', '', '', ''];

    const markSymbol = () => {
        document.querySelectorAll('td').forEach((cell, index) => {

            if (cell.classList.contains('openCell')) {
                cell.addEventListener('click', () => {
                    gameBoardArray[index] = gameFlow.currentPlayer().symbol;
                    createBoard();
                    gameFlow.alternatePlayers();
                });
            }
        });    
    }

    const createBoard = () => {
        if (previousBoard = document.querySelector('table')) {
            document.querySelector('.game').removeChild(previousBoard);
        };
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
        document.querySelector('.game').appendChild(board);
        markSymbol();
    }
    return {
        createBoard,
        gameBoardArray,
        markSymbol
    };
})();

gameBoard.createBoard();



const Player = (symbol) => {
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

    return {
        symbol,
        winCheck
    };
}

const me = Player('X');
const computer = Player('O');

const gameFlow = (() => {
    let gameTurn = 1;

    const currentPlayer = () => {
        if (gameTurn % 2 === 1) {
            return me;
        }
        else {
            return computer;
        }
    }

    const alternatePlayers = () => {
        endGame(); 
        gameTurn++;
    }

    const endGame = () => {
        if (currentPlayer().winCheck() === true) {
            console.log(`${ currentPlayer().symbol } has won the match`);
        }
        else if (gameTurn === 9) {
            console.log("The match was a tie");
        }
    }

    return {
        currentPlayer,
        alternatePlayers
    }
})();