/**
 * @module gameboardDisplay
 */

/**
 * displays gameboard
 * @param {Object} board -board to diplay
 * @param {string} name - name of board
 */
const gameboardDisplay = (board, name) => {
  const table = document.querySelector(`#${name}`);
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const cell = table.querySelector(
        `[data-coords="${JSON.stringify([i, j])}"]`
      );
      if (board[i][j] === null) {
        cell.style["background-color"] = "white";
      } else if (board[i][j] === "miss") {
        cell.style["background-color"] = "yellow";
        cell.textContent = "";
      } else if (!board[i][j].isHit && name === "Player1") {
        cell.style["background-color"] = "grey";
      } else if (board[i][j].isHit) {
        cell.style["background-color"] = "red";
      } else {
        cell.style["background-color"] = "white";
      }
    }
  }
};

export { gameboardDisplay };
