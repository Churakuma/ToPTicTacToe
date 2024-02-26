// Test to make sure player object is created correctly
// console.log(
//     {
//         sign: playerOne.sign,
//         score: playerOne.getScore()
//     }
// );

function createPlayer(sign) {
    const playerSign = sign;

    // handle the score when player wins
    let playerScore = 0;
    const getScore = () => playerScore;
    const giveScore = () => playerScore++;

    return { sign, getScore, giveScore }
}

const gameboard = () => {
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
};
