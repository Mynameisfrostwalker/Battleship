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
// @ts-check

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

  const getTurn = () => {
    return turn;
  };

  const toggleTurn = () => {
    turn = !turn;
  };

  if (player === "human") {
    attack = (board, coords) => {
      board.receiveAttack(coords);
    };
  } else if (player === "AI") {
    attack = (board) => {
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
    };
  }

  return { getTurn, toggleTurn, attack };
};



/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxzQkFBc0IsNEJBQTRCO0FBQ2xELHdCQUF3QiwrQkFBK0I7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDs7QUFFd0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3BsYXllci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIEB0cy1jaGVja1xuXG4vKipcbiAqIEBtb2R1bGUgcGxheWVyXG4gKi9cblxuLyoqXG4gKiBjcmVhdGVzIFBsYXllcnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBwbGF5ZXJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuY29uc3QgY3JlYXRlUGxheWVyID0gKHBsYXllciA9IFwiaHVtYW5cIikgPT4ge1xuICBsZXQgdHVybiA9IHRydWU7XG4gIGxldCBhdHRhY2s7XG5cbiAgY29uc3QgZ2V0VHVybiA9ICgpID0+IHtcbiAgICByZXR1cm4gdHVybjtcbiAgfTtcblxuICBjb25zdCB0b2dnbGVUdXJuID0gKCkgPT4ge1xuICAgIHR1cm4gPSAhdHVybjtcbiAgfTtcblxuICBpZiAocGxheWVyID09PSBcImh1bWFuXCIpIHtcbiAgICBhdHRhY2sgPSAoYm9hcmQsIGNvb3JkcykgPT4ge1xuICAgICAgYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xuICAgIH07XG4gIH0gZWxzZSBpZiAocGxheWVyID09PSBcIkFJXCIpIHtcbiAgICBhdHRhY2sgPSAoYm9hcmQpID0+IHtcbiAgICAgIGNvbnN0IGF2YWlsYWJsZSA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZC5nYW1lYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBib2FyZC5nYW1lYm9hcmRbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBib2FyZC5nYW1lYm9hcmRbaV1bal0gPT09IG51bGwgfHxcbiAgICAgICAgICAgIGJvYXJkLmdhbWVib2FyZFtpXVtqXS5pc0hpdCA9PT0gZmFsc2VcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGF2YWlsYWJsZS5wdXNoKFtpLCBqXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXZhaWxhYmxlLmxlbmd0aCk7XG4gICAgICBib2FyZC5yZWNlaXZlQXR0YWNrKGF2YWlsYWJsZVt5XSk7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7IGdldFR1cm4sIHRvZ2dsZVR1cm4sIGF0dGFjayB9O1xufTtcblxuZXhwb3J0IHsgY3JlYXRlUGxheWVyIH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=