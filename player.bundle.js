/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./src/scripts/player.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPlayer": () => (/* binding */ createPlayer)
/* harmony export */ });
/**
 * @module player
 */

/**
 * creates Players
 * @param {string} player
 * @return {Object}
 * @namespace createPlayer
 */
const createPlayer = (player = "human") => {
  /**
   * @memberof createPlayer
   * @type {Boolean}
   */
  let turn = true;

  /**
   * attacks ships
   * @function
   * @memberof createPlayer
   */
  let attack;

  /**
   * @type {Boolean}
   * @memberof createPlayer
   */
  let value = true;

  /**
   * @type {Array<Number>}
   * @memberof createPlayer
   */
  let hit;

  /**
   * @type {Array}
   * @memberof createPlayer
   */
  let targets = [];

  /**
   * @memberof createPlayer
   * @return {Boolean}
   */
  const getTurn = () => {
    return turn;
  };

  /**
   * @function
   * @memberof createPlayer
   */
  const toggleTurn = () => {
    turn = !turn;
  };

  /**
   * Checks if two arrays share the same value
   * @param {Array} bigArr
   * @param {Array} arr
   * @memberof createPlayer
   * @return {Boolean}
   */
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



/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFDcEI7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLG9CQUFvQixtQkFBbUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDRCQUE0QjtBQUNwRCwwQkFBMEIsK0JBQStCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixvQkFBb0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDs7QUFFd0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3BsYXllci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qKlxuICogQG1vZHVsZSBwbGF5ZXJcbiAqL1xuXG4vKipcbiAqIGNyZWF0ZXMgUGxheWVyc1xuICogQHBhcmFtIHtzdHJpbmd9IHBsYXllclxuICogQHJldHVybiB7T2JqZWN0fVxuICogQG5hbWVzcGFjZSBjcmVhdGVQbGF5ZXJcbiAqL1xuY29uc3QgY3JlYXRlUGxheWVyID0gKHBsYXllciA9IFwiaHVtYW5cIikgPT4ge1xuICAvKipcbiAgICogQG1lbWJlcm9mIGNyZWF0ZVBsYXllclxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICovXG4gIGxldCB0dXJuID0gdHJ1ZTtcblxuICAvKipcbiAgICogYXR0YWNrcyBzaGlwc1xuICAgKiBAZnVuY3Rpb25cbiAgICogQG1lbWJlcm9mIGNyZWF0ZVBsYXllclxuICAgKi9cbiAgbGV0IGF0dGFjaztcblxuICAvKipcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqIEBtZW1iZXJvZiBjcmVhdGVQbGF5ZXJcbiAgICovXG4gIGxldCB2YWx1ZSA9IHRydWU7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtBcnJheTxOdW1iZXI+fVxuICAgKiBAbWVtYmVyb2YgY3JlYXRlUGxheWVyXG4gICAqL1xuICBsZXQgaGl0O1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7QXJyYXl9XG4gICAqIEBtZW1iZXJvZiBjcmVhdGVQbGF5ZXJcbiAgICovXG4gIGxldCB0YXJnZXRzID0gW107XG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBjcmVhdGVQbGF5ZXJcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG4gIGNvbnN0IGdldFR1cm4gPSAoKSA9PiB7XG4gICAgcmV0dXJuIHR1cm47XG4gIH07XG5cbiAgLyoqXG4gICAqIEBmdW5jdGlvblxuICAgKiBAbWVtYmVyb2YgY3JlYXRlUGxheWVyXG4gICAqL1xuICBjb25zdCB0b2dnbGVUdXJuID0gKCkgPT4ge1xuICAgIHR1cm4gPSAhdHVybjtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHR3byBhcnJheXMgc2hhcmUgdGhlIHNhbWUgdmFsdWVcbiAgICogQHBhcmFtIHtBcnJheX0gYmlnQXJyXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICAgKiBAbWVtYmVyb2YgY3JlYXRlUGxheWVyXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuICBjb25zdCBzaGFyZVZhbHVlcyA9IChiaWdBcnIsIGFycikgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmlnQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50ID0gYmlnQXJyW2ldO1xuICAgICAgaWYgKGN1cnJlbnRbMF0gPT09IGFyclswXSAmJiBjdXJyZW50WzFdID09PSBhcnJbMV0pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBpZiAocGxheWVyID09PSBcImh1bWFuXCIpIHtcbiAgICBhdHRhY2sgPSAoYm9hcmQsIGNvb3JkcykgPT4ge1xuICAgICAgYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xuICAgIH07XG4gIH0gZWxzZSBpZiAocGxheWVyID09PSBcIkFJXCIpIHtcbiAgICBhdHRhY2sgPSAoYm9hcmQpID0+IHtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBjb25zdCBhdmFpbGFibGUgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZC5nYW1lYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGJvYXJkLmdhbWVib2FyZFtpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBib2FyZC5nYW1lYm9hcmRbaV1bal0gPT09IG51bGwgfHxcbiAgICAgICAgICAgICAgYm9hcmQuZ2FtZWJvYXJkW2ldW2pdLmlzSGl0ID09PSBmYWxzZVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGF2YWlsYWJsZS5wdXNoKFtpLCBqXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhdmFpbGFibGUubGVuZ3RoKTtcbiAgICAgICAgYm9hcmQucmVjZWl2ZUF0dGFjayhhdmFpbGFibGVbeV0pO1xuICAgICAgICBjb25zdCBbZmlyc3QsIHNlY29uZF0gPSBhdmFpbGFibGVbeV07XG4gICAgICAgIGlmIChib2FyZC5nYW1lYm9hcmRbZmlyc3RdW3NlY29uZF0ubmFtZSkge1xuICAgICAgICAgIHZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgaGl0ID0gYXZhaWxhYmxlW3ldO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBhdmFpbGFibGUgPSBbXTtcbiAgICAgICAgY29uc3QgYXZhaWxhYmxlVGFyZ2V0cyA9ICgpID0+IHtcbiAgICAgICAgICBjb25zdCBbeCwgeV0gPSBoaXQ7XG4gICAgICAgICAgdGFyZ2V0cy51bnNoaWZ0KFt4ICsgMSwgeV0pO1xuICAgICAgICAgIHRhcmdldHMudW5zaGlmdChbeCAtIDEsIHldKTtcbiAgICAgICAgICB0YXJnZXRzLnVuc2hpZnQoW3gsIHkgKyAxXSk7XG4gICAgICAgICAgdGFyZ2V0cy51bnNoaWZ0KFt4LCB5IC0gMV0pO1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFyZ2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGJvYXJkLmdhbWVib2FyZFt0YXJnZXRzW2ldWzBdXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGlmIChib2FyZC5nYW1lYm9hcmRbdGFyZ2V0c1tpXVswXV1bdGFyZ2V0c1tpXVsxXV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgIGJvYXJkLmdhbWVib2FyZFt0YXJnZXRzW2ldWzBdXVt0YXJnZXRzW2ldWzFdXSA9PT0gbnVsbCB8fFxuICAgICAgICAgICAgICAgICAgYm9hcmQuZ2FtZWJvYXJkW3RhcmdldHNbaV1bMF1dW3RhcmdldHNbaV1bMV1dLmlzSGl0ID09PSBmYWxzZVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgaWYgKCFzaGFyZVZhbHVlcyhhdmFpbGFibGUsIHRhcmdldHNbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGF2YWlsYWJsZS5wdXNoKHRhcmdldHNbaV0pO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgYXZhaWxhYmxlVGFyZ2V0cygpO1xuICAgICAgICBib2FyZC5yZWNlaXZlQXR0YWNrKGF2YWlsYWJsZVswXSk7XG4gICAgICAgIGlmIChib2FyZC5nYW1lYm9hcmRbYXZhaWxhYmxlWzBdWzBdXVthdmFpbGFibGVbMF1bMV1dLm5hbWUpIHtcbiAgICAgICAgICBoaXQgPSBhdmFpbGFibGVbMF07XG4gICAgICAgICAgYXZhaWxhYmxlLnNoaWZ0KCk7XG4gICAgICAgICAgYXZhaWxhYmxlVGFyZ2V0cygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF2YWlsYWJsZS5zaGlmdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGF2YWlsYWJsZS5sZW5ndGggPD0gMCkge1xuICAgICAgICAgIHZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICB0YXJnZXRzID0gW107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHsgZ2V0VHVybiwgdG9nZ2xlVHVybiwgYXR0YWNrIH07XG59O1xuXG5leHBvcnQgeyBjcmVhdGVQbGF5ZXIgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==