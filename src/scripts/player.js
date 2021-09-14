/**
 * @module player
 */

/**
 * creates Players
 * @param {string} player
 * @return {Object}
 */
const createPlayer = (player = "human") => {
  let turn = true;
  let attack;
  let value = true;
  let hit;
  let targets = [];

  const getTurn = () => {
    return turn;
  };

  const toggleTurn = () => {
    turn = !turn;
  };

  const shareValues = (bigArr, arr) => {
    for (let i = 0; i < bigArr.length; i++) {
      const current = bigArr[i];
      if (current[0] === arr[0] && current[1] === arr[1]) {
        return true;
      }
    }
    return false;
  };

  if (player === "human") {
    attack = (board, coords) => {
      board.receiveAttack(coords);
    };
  } else if (player === "AI") {
    attack = (board) => {
      if (value) {
        const available = [];
        for (let i = 0; i < board.gameboard.length; i++) {
          for (let j = 0; j < board.gameboard[i].length; j++) {
            if (
              board.gameboard[i][j] === null ||
              board.gameboard[i][j].isHit === false
            ) {
              available.push([i, j]);
            }
          }
        }
        const y = Math.floor(Math.random() * available.length);
        board.receiveAttack(available[y]);
        const [first, second] = available[y];
        if (board.gameboard[first][second].name) {
          value = false;
          hit = available[y];
        }
      } else {
        const available = [];
        const availableTargets = () => {
          const [x, y] = hit;
          targets.unshift([x + 1, y]);
          targets.unshift([x - 1, y]);
          targets.unshift([x, y + 1]);
          targets.unshift([x, y - 1]);
          for (let i = 0; i < targets.length; i++) {
            if (board.gameboard[targets[i][0]] !== undefined) {
              if (board.gameboard[targets[i][0]][targets[i][1]] !== undefined) {
                if (
                  board.gameboard[targets[i][0]][targets[i][1]] === null ||
                  board.gameboard[targets[i][0]][targets[i][1]].isHit === false
                ) {
                  if (!shareValues(available, targets[i])) {
                    available.push(targets[i]);
                  }
                }
              }
            }
          }
        };
        availableTargets();
        board.receiveAttack(available[0]);
        if (board.gameboard[available[0][0]][available[0][1]].name) {
          hit = available[0];
          available.shift();
          availableTargets();
        } else {
          available.shift();
        }

        if (available.length <= 0) {
          value = true;
          targets = [];
        }
      }
    };
  }

  return { getTurn, toggleTurn, attack };
};

export { createPlayer };
