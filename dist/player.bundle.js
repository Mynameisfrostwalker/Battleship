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



/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsNEJBQTRCO0FBQ3BELDBCQUEwQiwrQkFBK0I7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLG9CQUFvQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYOztBQUV3QiIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvcGxheWVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXG4gKiBAbW9kdWxlIHBsYXllclxuICovXG5cbi8qKlxuICogY3JlYXRlcyBQbGF5ZXJzXG4gKiBAcGFyYW0ge3N0cmluZ30gcGxheWVyXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmNvbnN0IGNyZWF0ZVBsYXllciA9IChwbGF5ZXIgPSBcImh1bWFuXCIpID0+IHtcbiAgbGV0IHR1cm4gPSB0cnVlO1xuICBsZXQgYXR0YWNrO1xuICBsZXQgdmFsdWUgPSB0cnVlO1xuICBsZXQgaGl0O1xuICBsZXQgdGFyZ2V0cyA9IFtdO1xuXG4gIGNvbnN0IGdldFR1cm4gPSAoKSA9PiB7XG4gICAgcmV0dXJuIHR1cm47XG4gIH07XG5cbiAgY29uc3QgdG9nZ2xlVHVybiA9ICgpID0+IHtcbiAgICB0dXJuID0gIXR1cm47XG4gIH07XG5cbiAgY29uc3Qgc2hhcmVWYWx1ZXMgPSAoYmlnQXJyLCBhcnIpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJpZ0Fyci5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgY3VycmVudCA9IGJpZ0FycltpXTtcbiAgICAgIGlmIChjdXJyZW50WzBdID09PSBhcnJbMF0gJiYgY3VycmVudFsxXSA9PT0gYXJyWzFdKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgaWYgKHBsYXllciA9PT0gXCJodW1hblwiKSB7XG4gICAgYXR0YWNrID0gKGJvYXJkLCBjb29yZHMpID0+IHtcbiAgICAgIGJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRzKTtcbiAgICB9O1xuICB9IGVsc2UgaWYgKHBsYXllciA9PT0gXCJBSVwiKSB7XG4gICAgYXR0YWNrID0gKGJvYXJkKSA9PiB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgY29uc3QgYXZhaWxhYmxlID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQuZ2FtZWJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBib2FyZC5nYW1lYm9hcmRbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgYm9hcmQuZ2FtZWJvYXJkW2ldW2pdID09PSBudWxsIHx8XG4gICAgICAgICAgICAgIGJvYXJkLmdhbWVib2FyZFtpXVtqXS5pc0hpdCA9PT0gZmFsc2VcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBhdmFpbGFibGUucHVzaChbaSwgal0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXZhaWxhYmxlLmxlbmd0aCk7XG4gICAgICAgIGJvYXJkLnJlY2VpdmVBdHRhY2soYXZhaWxhYmxlW3ldKTtcbiAgICAgICAgY29uc3QgW2ZpcnN0LCBzZWNvbmRdID0gYXZhaWxhYmxlW3ldO1xuICAgICAgICBpZiAoYm9hcmQuZ2FtZWJvYXJkW2ZpcnN0XVtzZWNvbmRdLm5hbWUpIHtcbiAgICAgICAgICB2YWx1ZSA9IGZhbHNlO1xuICAgICAgICAgIGhpdCA9IGF2YWlsYWJsZVt5XTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgYXZhaWxhYmxlID0gW107XG4gICAgICAgIGNvbnN0IGF2YWlsYWJsZVRhcmdldHMgPSAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgW3gsIHldID0gaGl0O1xuICAgICAgICAgIHRhcmdldHMudW5zaGlmdChbeCArIDEsIHldKTtcbiAgICAgICAgICB0YXJnZXRzLnVuc2hpZnQoW3ggLSAxLCB5XSk7XG4gICAgICAgICAgdGFyZ2V0cy51bnNoaWZ0KFt4LCB5ICsgMV0pO1xuICAgICAgICAgIHRhcmdldHMudW5zaGlmdChbeCwgeSAtIDFdKTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhcmdldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChib2FyZC5nYW1lYm9hcmRbdGFyZ2V0c1tpXVswXV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBpZiAoYm9hcmQuZ2FtZWJvYXJkW3RhcmdldHNbaV1bMF1dW3RhcmdldHNbaV1bMV1dICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICBib2FyZC5nYW1lYm9hcmRbdGFyZ2V0c1tpXVswXV1bdGFyZ2V0c1tpXVsxXV0gPT09IG51bGwgfHxcbiAgICAgICAgICAgICAgICAgIGJvYXJkLmdhbWVib2FyZFt0YXJnZXRzW2ldWzBdXVt0YXJnZXRzW2ldWzFdXS5pc0hpdCA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIGlmICghc2hhcmVWYWx1ZXMoYXZhaWxhYmxlLCB0YXJnZXRzW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICBhdmFpbGFibGUucHVzaCh0YXJnZXRzW2ldKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGF2YWlsYWJsZVRhcmdldHMoKTtcbiAgICAgICAgYm9hcmQucmVjZWl2ZUF0dGFjayhhdmFpbGFibGVbMF0pO1xuICAgICAgICBpZiAoYm9hcmQuZ2FtZWJvYXJkW2F2YWlsYWJsZVswXVswXV1bYXZhaWxhYmxlWzBdWzFdXS5uYW1lKSB7XG4gICAgICAgICAgaGl0ID0gYXZhaWxhYmxlWzBdO1xuICAgICAgICAgIGF2YWlsYWJsZS5zaGlmdCgpO1xuICAgICAgICAgIGF2YWlsYWJsZVRhcmdldHMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhdmFpbGFibGUuc2hpZnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhdmFpbGFibGUubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICB2YWx1ZSA9IHRydWU7XG4gICAgICAgICAgdGFyZ2V0cyA9IFtdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7IGdldFR1cm4sIHRvZ2dsZVR1cm4sIGF0dGFjayB9O1xufTtcblxuZXhwb3J0IHsgY3JlYXRlUGxheWVyIH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=