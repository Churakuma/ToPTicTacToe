function createPlayer(sign) {
    const playerSign = sign;

    const getSign = () => playerSign;

    return { getSign }
}

const gameboard = (() => {
    const board = ['','','','','','','','',''];

    const setField = (index, sign) => {
        if (index < 0 || index >= board.length) return;
        board[index] = sign;
    };

    const getField = (index) => {
        if (index < 0 || index > board.length) return;
        return board[index];
    };

    const resetField = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        };
    };

    return { setField, getField, resetField };
})();

const displayController = (() => {
    const fields = document.querySelectorAll('.field');
    const restartButton = document.getElementById('restart__button');
    const message = document.getElementById('message');

    fields.forEach((field) => 
        field.addEventListener('click', (e) => {
            if (gameController.getIsOver() || e.target.textContent !== '') return;
            gameController.playRound(parseInt(e.target.dataset.index));
            updateGameBoard();
        })
    );

    restartButton.addEventListener('click', (e) => {
        gameboard.resetField();
        gameController.reset();
        setMessageElement("Player X's turn");
        updateGameBoard();
    });

    const updateGameBoard = () => {
        for (let i = 0; i , fields.length; i++) {
            fields[i].textContent = gameboard.getField(i);
        }
    };

    const setResultMessage = (winner) => {
        if (winner === "Draw") {
          setMessageElement("It's a draw!");
        } else {
          setMessageElement(`Player ${winner} has won!`);
        }
    };

    const setMessageElement = (newMessage) => {
        message.textContent = newMessage;
    }

    return { setMessageElement, setResultMessage }
})();

const gameController = (() => {
    const playerX = createPlayer('X');
    const playerO = createPlayer('O');
    let round = 1;
    let isOver = false;

    const getIsOver = () => {
        return isOver;
    };

    const reset = () => {
        round = 1;
        isOver = false;
    };

    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
    };

    const playRound = (fieldIndex) => {
        gameboard.setField(fieldIndex, getCurrentPlayerSign());
        if (checkWinner(fieldIndex)) {
            displayController.setResultMessage(getCurrentPlayerSign());
            isOver = true;
            return;
        }
        if (round == 9) {
            displayController.setResultMessage("Draw!");
            isOver = true;
            return;
        }
        round++;
        displayController.setMessageElement(`Player ${getCurrentPlayerSign()}'s turn`);
    };

    const checkWinner = (fieldIndex) => {
        const winConditions = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        return winConditions
            .filter((combination) => combination.includes(fieldIndex))
            .some((possibleCombination) => possibleCombination
            .every((index) => gameboard.getField(index) === getCurrentPlayerSign())
            );
    };

    return { reset, getIsOver, playRound }
})();