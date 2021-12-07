const gameBoard = (() => {
    const gameBoardArray = [];

    const createBoard = () => {
        let board = document.createElement('table')
        for (let i = 0; i < 3; i++) {
            let boardRow = document.createElement('tr')
            for (let j = 0; j < 3; j++) {
                let boardCell = document.createElement('td');
                boardCell.classList.add(`row${ i }`);
                boardCell.classList.add(`column${ j }`);
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
                boardCell.textContent = "test";
                gameBoardArray.push(boardCell);
                boardRow.appendChild(boardCell);
            }
            board.appendChild(boardRow);
        }
        document.querySelector('.game').appendChild(board);
    }
    return {
        createBoard,
        gameBoardArray
    };
})();

gameBoard.createBoard();

const player = () => {
    console.log("player");
}

const displayController = (() => {
    console.log("display");
})();