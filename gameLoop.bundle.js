/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/gameboard.js":
/*!**********************************!*\
  !*** ./src/scripts/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createGameboard": () => (/* binding */ createGameboard)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/scripts/ship.js");


// @ts-check

/**
 * @module gameboard
 */

/**
 * Creates a gameboard object
 * @return {Object}
 */
const createGameboard = () => {
  const ships = [];
  const gameboard = [[], [], [], [], [], [], [], [], [], []];
  gameboard.forEach((arr) => {
    for (let i = 0; i < 10; i++) {
      arr.push(null);
    }
  });

  // places ships on gameboard
  const placeShip = (name, lengthOfShip, coord, direction = "x") => {
    const newShip = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.createShip)(name, lengthOfShip);
    if (ships.every((ship) => ship.shipName !== newShip.shipName)) {
      const length = newShip.shipLength;
      const coordinates = [];
      for (let i = 0; i < length; i++) {
        if (direction === "x") {
          coordinates.push([coord[0], coord[1] + i]);
        } else {
          coordinates.push([coord[0] + i, coord[1]]);
        }
      }
      if (
        coordinates.every((current) => {
          if (current[0] > 9 || current[1] > 9) {
            return false;
          }
          return gameboard[current[0]][current[1]] === null;
        })
      ) {
        let index = 0;
        coordinates.forEach((current) => {
          gameboard[current[0]][current[1]] = {
            name: newShip.shipName,
            position: index,
            isHit: newShip.body[index],
          };
          index++;
        });
      }
    }
    ships.push(newShip);
  };

  // receives attacks
  const receiveAttack = (coords) => {
    if (gameboard[coords[0]][coords[1]] === null) {
      gameboard[coords[0]][coords[1]] = "miss";
    } else if (gameboard[coords[0]][coords[1]] !== "miss") {
      ships.forEach((ship) => {
        if (gameboard[coords[0]][coords[1]].name === ship.shipName) {
          ship.hit(gameboard[coords[0]][coords[1]].position);
          gameboard[coords[0]][coords[1]].isHit =
            ship.body[gameboard[coords[0]][coords[1]].position];
        }
      });
    }
  };

  // checks if all ships are sunk
  const allSunk = () => {
    const boolean = ships.reduce((accum, ship) => {
      return accum && ship.isSunk();
    }, true);
    return boolean;
  };

  return { gameboard, placeShip, receiveAttack, allSunk };
};




/***/ }),

/***/ "./src/scripts/gameboardDisplay.js":
/*!*****************************************!*\
  !*** ./src/scripts/gameboardDisplay.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameboardDisplay": () => (/* binding */ gameboardDisplay)
/* harmony export */ });
// @ts-check

/**
 * @module gameboardDisplay
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
        cell.textContent = ".";
      } else if (!board[i][j].isHit) {
        cell.style["background-color"] = "grey";
      } else if (board[i][j].isHit) {
        cell.style["background-color"] = "red";
      }
    }
  }
};




/***/ }),

/***/ "./src/scripts/player.js":
/*!*******************************!*\
  !*** ./src/scripts/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
          if (board.gameboard[i][j] === null || !board.gameboard[i][j].isHit) {
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




/***/ }),

/***/ "./src/scripts/ship.js":
/*!*****************************!*\
  !*** ./src/scripts/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createShip": () => (/* binding */ createShip)
/* harmony export */ });
// @ts-check

/**
 * @module Ship
 */
// @ts-check

/**
 * Ship factory function
 * @param {string} name
 * @param {number} length
 * @return {Object} - ship object
 */
const createShip = (name, length) => {
  const shipBody = [];
  for (let i = 0; i < length; i++) {
    shipBody.push(false);
  }
  const ship = {
    shipName: name,
    body: shipBody,
    shipLength: shipBody.length,
    hit(index) {
      shipBody[index] = true;
    },
    isSunk() {
      for (let i = 0; i < shipBody.length; i++) {
        if (shipBody[i] === false) {
          return false;
        }
      }
      return true;
    },
  };
  return ship;
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************************!*\
  !*** ./src/scripts/gameLoop.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "game": () => (/* binding */ game)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/scripts/player.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/scripts/gameboard.js");
/* harmony import */ var _gameboardDisplay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameboardDisplay */ "./src/scripts/gameboardDisplay.js");




// @ts-check

/**
 * @module gameLoop
 */

const shareValues = (bigArr, arr) => {
  for (let i = 0; i < bigArr.length; i++) {
    const current = bigArr[i];
    for (let j = 0; j < arr.length; j++) {
      const smallCurrent = arr[j];
      if (current[0] === smallCurrent[0] && current[1] === smallCurrent[1]) {
        return true;
      }
    }
  }
  return false;
};

const aiPlaceShip = (gameboard) => {
  const coords = [];
  const directions = [];
  const random = (length) => {
    return Math.floor(Math.random() * (10 - length));
  };

  // finds random coordinates which satisfy the conditions
  const findRandom = (length, direction) => {
    let coord1;
    let coord2;
    if (direction === "x") {
      coord1 = random(0);
      coord2 = random(length);
    }
    if (direction === "y") {
      coord1 = random(length);
      coord2 = random(0);
    }
    const secondCoords = [];
    for (let i = 0; i < length; i++) {
      if (direction === "x") {
        secondCoords.push([coord1, coord2 + i]);
      }
      if (direction === "y") {
        secondCoords.push([coord1 + i, coord2]);
      }
    }
    console.log(secondCoords);
    if (!shareValues(coords, secondCoords)) {
      console.log(true);
      for (let i = -1; i <= length; i++) {
        if (direction === "x") {
          coords.push([coord1, coord2 + i]);
          coords.push([coord1 + 1, coord2 + i]);
          coords.push([coord1 - 1, coord2 + i]);
        } else if (direction === "y") {
          coords.push([coord1 + i, coord2]);
          coords.push([coord1 + i, coord2 + 1]);
          coords.push([coord1 + i, coord2 - 1]);
        }
      }
      return [coord1, coord2];
    } else {
      return findRandom(length, direction);
    }
  };

  for (let i = 0; i < 5; i++) {
    const rand = Math.floor(Math.random() * 11);
    if (rand > 5) {
      directions.push("y");
    } else {
      directions.push("x");
    }
  }

  gameboard.placeShip(
    "Carrier",
    5,
    findRandom(5, directions[0]),
    directions[0]
  );
  gameboard.placeShip(
    "Battleship",
    4,
    findRandom(4, directions[1]),
    directions[1]
  );
  gameboard.placeShip(
    "Cruiser",
    3,
    findRandom(3, directions[2]),
    directions[2]
  );
  gameboard.placeShip(
    "Submarine",
    3,
    findRandom(3, directions[3]),
    directions[3]
  );
  gameboard.placeShip(
    "Destroyer",
    2,
    findRandom(2, directions[4]),
    directions[4]
  );
};

const game = () => {
  const player1 = (0,_player__WEBPACK_IMPORTED_MODULE_0__.createPlayer)("human");
  const player2 = (0,_player__WEBPACK_IMPORTED_MODULE_0__.createPlayer)("AI");
  const player1board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.createGameboard)();
  const player2board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.createGameboard)();
  player1board.placeShip("Carrier", 5, [0, 0], "y");
  player1board.placeShip("Battleship", 4, [7, 2], "x");
  player1board.placeShip("Cruiser", 3, [3, 6], "y");
  player1board.placeShip("Submarine", 3, [7, 9], "y");
  player1board.placeShip("Destroyer", 2, [2, 3], "x");
  aiPlaceShip(player2board);
  (0,_gameboardDisplay__WEBPACK_IMPORTED_MODULE_2__.gameboardDisplay)(player1board.gameboard, "Player1");
  (0,_gameboardDisplay__WEBPACK_IMPORTED_MODULE_2__.gameboardDisplay)(player2board.gameboard, "AI");
};

const turn = (player1, plater1board, player2, player2board) => {};



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixhQUFhO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLE9BQU87QUFDekI7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixxREFBWTtBQUM5QixrQkFBa0IscURBQVk7QUFDOUIsdUJBQXVCLDJEQUFlO0FBQ3RDLHVCQUF1QiwyREFBZTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLG1FQUFnQjtBQUNsQixFQUFFLG1FQUFnQjtBQUNsQjs7QUFFQTs7QUFFZ0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9nYW1lYm9hcmREaXNwbGF5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9nYW1lTG9vcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVTaGlwIH0gZnJvbSBcIi4vc2hpcFwiO1xuXG4vLyBAdHMtY2hlY2tcblxuLyoqXG4gKiBAbW9kdWxlIGdhbWVib2FyZFxuICovXG5cbi8qKlxuICogQ3JlYXRlcyBhIGdhbWVib2FyZCBvYmplY3RcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuY29uc3QgY3JlYXRlR2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBzaGlwcyA9IFtdO1xuICBjb25zdCBnYW1lYm9hcmQgPSBbW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW11dO1xuICBnYW1lYm9hcmQuZm9yRWFjaCgoYXJyKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBhcnIucHVzaChudWxsKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIHBsYWNlcyBzaGlwcyBvbiBnYW1lYm9hcmRcbiAgY29uc3QgcGxhY2VTaGlwID0gKG5hbWUsIGxlbmd0aE9mU2hpcCwgY29vcmQsIGRpcmVjdGlvbiA9IFwieFwiKSA9PiB7XG4gICAgY29uc3QgbmV3U2hpcCA9IGNyZWF0ZVNoaXAobmFtZSwgbGVuZ3RoT2ZTaGlwKTtcbiAgICBpZiAoc2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuc2hpcE5hbWUgIT09IG5ld1NoaXAuc2hpcE5hbWUpKSB7XG4gICAgICBjb25zdCBsZW5ndGggPSBuZXdTaGlwLnNoaXBMZW5ndGg7XG4gICAgICBjb25zdCBjb29yZGluYXRlcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcInhcIikge1xuICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2goW2Nvb3JkWzBdLCBjb29yZFsxXSArIGldKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKFtjb29yZFswXSArIGksIGNvb3JkWzFdXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgY29vcmRpbmF0ZXMuZXZlcnkoKGN1cnJlbnQpID0+IHtcbiAgICAgICAgICBpZiAoY3VycmVudFswXSA+IDkgfHwgY3VycmVudFsxXSA+IDkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGdhbWVib2FyZFtjdXJyZW50WzBdXVtjdXJyZW50WzFdXSA9PT0gbnVsbDtcbiAgICAgICAgfSlcbiAgICAgICkge1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBjb29yZGluYXRlcy5mb3JFYWNoKChjdXJyZW50KSA9PiB7XG4gICAgICAgICAgZ2FtZWJvYXJkW2N1cnJlbnRbMF1dW2N1cnJlbnRbMV1dID0ge1xuICAgICAgICAgICAgbmFtZTogbmV3U2hpcC5zaGlwTmFtZSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBpbmRleCxcbiAgICAgICAgICAgIGlzSGl0OiBuZXdTaGlwLmJvZHlbaW5kZXhdLFxuICAgICAgICAgIH07XG4gICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHNoaXBzLnB1c2gobmV3U2hpcCk7XG4gIH07XG5cbiAgLy8gcmVjZWl2ZXMgYXR0YWNrc1xuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKGNvb3JkcykgPT4ge1xuICAgIGlmIChnYW1lYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV1dID09PSBudWxsKSB7XG4gICAgICBnYW1lYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV1dID0gXCJtaXNzXCI7XG4gICAgfSBlbHNlIGlmIChnYW1lYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV1dICE9PSBcIm1pc3NcIikge1xuICAgICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICBpZiAoZ2FtZWJvYXJkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXS5uYW1lID09PSBzaGlwLnNoaXBOYW1lKSB7XG4gICAgICAgICAgc2hpcC5oaXQoZ2FtZWJvYXJkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXS5wb3NpdGlvbik7XG4gICAgICAgICAgZ2FtZWJvYXJkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXS5pc0hpdCA9XG4gICAgICAgICAgICBzaGlwLmJvZHlbZ2FtZWJvYXJkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXS5wb3NpdGlvbl07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAvLyBjaGVja3MgaWYgYWxsIHNoaXBzIGFyZSBzdW5rXG4gIGNvbnN0IGFsbFN1bmsgPSAoKSA9PiB7XG4gICAgY29uc3QgYm9vbGVhbiA9IHNoaXBzLnJlZHVjZSgoYWNjdW0sIHNoaXApID0+IHtcbiAgICAgIHJldHVybiBhY2N1bSAmJiBzaGlwLmlzU3VuaygpO1xuICAgIH0sIHRydWUpO1xuICAgIHJldHVybiBib29sZWFuO1xuICB9O1xuXG4gIHJldHVybiB7IGdhbWVib2FyZCwgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrLCBhbGxTdW5rIH07XG59O1xuXG5leHBvcnQgeyBjcmVhdGVHYW1lYm9hcmQgfTtcbiIsIi8vIEB0cy1jaGVja1xuXG4vKipcbiAqIEBtb2R1bGUgZ2FtZWJvYXJkRGlzcGxheVxuICovXG5cbmNvbnN0IGdhbWVib2FyZERpc3BsYXkgPSAoYm9hcmQsIG5hbWUpID0+IHtcbiAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuYW1lfWApO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBib2FyZFtpXS5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgY2VsbCA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGBbZGF0YS1jb29yZHM9XCIke0pTT04uc3RyaW5naWZ5KFtpLCBqXSl9XCJdYFxuICAgICAgKTtcbiAgICAgIGlmIChib2FyZFtpXVtqXSA9PT0gbnVsbCkge1xuICAgICAgICBjZWxsLnN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IFwid2hpdGVcIjtcbiAgICAgIH0gZWxzZSBpZiAoYm9hcmRbaV1bal0gPT09IFwibWlzc1wiKSB7XG4gICAgICAgIGNlbGwuc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gXCJ5ZWxsb3dcIjtcbiAgICAgICAgY2VsbC50ZXh0Q29udGVudCA9IFwiLlwiO1xuICAgICAgfSBlbHNlIGlmICghYm9hcmRbaV1bal0uaXNIaXQpIHtcbiAgICAgICAgY2VsbC5zdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSBcImdyZXlcIjtcbiAgICAgIH0gZWxzZSBpZiAoYm9hcmRbaV1bal0uaXNIaXQpIHtcbiAgICAgICAgY2VsbC5zdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSBcInJlZFwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IHsgZ2FtZWJvYXJkRGlzcGxheSB9O1xuIiwiLy8gQHRzLWNoZWNrXG5cbi8qKlxuICogQG1vZHVsZSBwbGF5ZXJcbiAqL1xuXG4vKipcbiAqIGNyZWF0ZXMgUGxheWVyc1xuICogQHBhcmFtIHtzdHJpbmd9IHBsYXllclxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5jb25zdCBjcmVhdGVQbGF5ZXIgPSAocGxheWVyID0gXCJodW1hblwiKSA9PiB7XG4gIGxldCB0dXJuID0gdHJ1ZTtcbiAgbGV0IGF0dGFjaztcblxuICBjb25zdCBnZXRUdXJuID0gKCkgPT4ge1xuICAgIHJldHVybiB0dXJuO1xuICB9O1xuXG4gIGNvbnN0IHRvZ2dsZVR1cm4gPSAoKSA9PiB7XG4gICAgdHVybiA9ICF0dXJuO1xuICB9O1xuXG4gIGlmIChwbGF5ZXIgPT09IFwiaHVtYW5cIikge1xuICAgIGF0dGFjayA9IChib2FyZCwgY29vcmRzKSA9PiB7XG4gICAgICBib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3Jkcyk7XG4gICAgfTtcbiAgfSBlbHNlIGlmIChwbGF5ZXIgPT09IFwiQUlcIikge1xuICAgIGF0dGFjayA9IChib2FyZCkgPT4ge1xuICAgICAgY29uc3QgYXZhaWxhYmxlID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmdhbWVib2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGJvYXJkLmdhbWVib2FyZFtpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmIChib2FyZC5nYW1lYm9hcmRbaV1bal0gPT09IG51bGwgfHwgIWJvYXJkLmdhbWVib2FyZFtpXVtqXS5pc0hpdCkge1xuICAgICAgICAgICAgYXZhaWxhYmxlLnB1c2goW2ksIGpdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhdmFpbGFibGUubGVuZ3RoKTtcbiAgICAgIGJvYXJkLnJlY2VpdmVBdHRhY2soYXZhaWxhYmxlW3ldKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHsgZ2V0VHVybiwgdG9nZ2xlVHVybiwgYXR0YWNrIH07XG59O1xuXG5leHBvcnQgeyBjcmVhdGVQbGF5ZXIgfTtcbiIsIi8vIEB0cy1jaGVja1xuXG4vKipcbiAqIEBtb2R1bGUgU2hpcFxuICovXG4vLyBAdHMtY2hlY2tcblxuLyoqXG4gKiBTaGlwIGZhY3RvcnkgZnVuY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoXG4gKiBAcmV0dXJuIHtPYmplY3R9IC0gc2hpcCBvYmplY3RcbiAqL1xuY29uc3QgY3JlYXRlU2hpcCA9IChuYW1lLCBsZW5ndGgpID0+IHtcbiAgY29uc3Qgc2hpcEJvZHkgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHNoaXBCb2R5LnB1c2goZmFsc2UpO1xuICB9XG4gIGNvbnN0IHNoaXAgPSB7XG4gICAgc2hpcE5hbWU6IG5hbWUsXG4gICAgYm9keTogc2hpcEJvZHksXG4gICAgc2hpcExlbmd0aDogc2hpcEJvZHkubGVuZ3RoLFxuICAgIGhpdChpbmRleCkge1xuICAgICAgc2hpcEJvZHlbaW5kZXhdID0gdHJ1ZTtcbiAgICB9LFxuICAgIGlzU3VuaygpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcEJvZHkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHNoaXBCb2R5W2ldID09PSBmYWxzZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgfTtcbiAgcmV0dXJuIHNoaXA7XG59O1xuXG5leHBvcnQgeyBjcmVhdGVTaGlwIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNyZWF0ZVBsYXllciB9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgY3JlYXRlR2FtZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBnYW1lYm9hcmREaXNwbGF5IH0gZnJvbSBcIi4vZ2FtZWJvYXJkRGlzcGxheVwiO1xuXG4vLyBAdHMtY2hlY2tcblxuLyoqXG4gKiBAbW9kdWxlIGdhbWVMb29wXG4gKi9cblxuY29uc3Qgc2hhcmVWYWx1ZXMgPSAoYmlnQXJyLCBhcnIpID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBiaWdBcnIubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjdXJyZW50ID0gYmlnQXJyW2ldO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgYXJyLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBzbWFsbEN1cnJlbnQgPSBhcnJbal07XG4gICAgICBpZiAoY3VycmVudFswXSA9PT0gc21hbGxDdXJyZW50WzBdICYmIGN1cnJlbnRbMV0gPT09IHNtYWxsQ3VycmVudFsxXSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuY29uc3QgYWlQbGFjZVNoaXAgPSAoZ2FtZWJvYXJkKSA9PiB7XG4gIGNvbnN0IGNvb3JkcyA9IFtdO1xuICBjb25zdCBkaXJlY3Rpb25zID0gW107XG4gIGNvbnN0IHJhbmRvbSA9IChsZW5ndGgpID0+IHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwIC0gbGVuZ3RoKSk7XG4gIH07XG5cbiAgLy8gZmluZHMgcmFuZG9tIGNvb3JkaW5hdGVzIHdoaWNoIHNhdGlzZnkgdGhlIGNvbmRpdGlvbnNcbiAgY29uc3QgZmluZFJhbmRvbSA9IChsZW5ndGgsIGRpcmVjdGlvbikgPT4ge1xuICAgIGxldCBjb29yZDE7XG4gICAgbGV0IGNvb3JkMjtcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcInhcIikge1xuICAgICAgY29vcmQxID0gcmFuZG9tKDApO1xuICAgICAgY29vcmQyID0gcmFuZG9tKGxlbmd0aCk7XG4gICAgfVxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwieVwiKSB7XG4gICAgICBjb29yZDEgPSByYW5kb20obGVuZ3RoKTtcbiAgICAgIGNvb3JkMiA9IHJhbmRvbSgwKTtcbiAgICB9XG4gICAgY29uc3Qgc2Vjb25kQ29vcmRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ4XCIpIHtcbiAgICAgICAgc2Vjb25kQ29vcmRzLnB1c2goW2Nvb3JkMSwgY29vcmQyICsgaV0pO1xuICAgICAgfVxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ5XCIpIHtcbiAgICAgICAgc2Vjb25kQ29vcmRzLnB1c2goW2Nvb3JkMSArIGksIGNvb3JkMl0pO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhzZWNvbmRDb29yZHMpO1xuICAgIGlmICghc2hhcmVWYWx1ZXMoY29vcmRzLCBzZWNvbmRDb29yZHMpKSB7XG4gICAgICBjb25zb2xlLmxvZyh0cnVlKTtcbiAgICAgIGZvciAobGV0IGkgPSAtMTsgaSA8PSBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcInhcIikge1xuICAgICAgICAgIGNvb3Jkcy5wdXNoKFtjb29yZDEsIGNvb3JkMiArIGldKTtcbiAgICAgICAgICBjb29yZHMucHVzaChbY29vcmQxICsgMSwgY29vcmQyICsgaV0pO1xuICAgICAgICAgIGNvb3Jkcy5wdXNoKFtjb29yZDEgLSAxLCBjb29yZDIgKyBpXSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcInlcIikge1xuICAgICAgICAgIGNvb3Jkcy5wdXNoKFtjb29yZDEgKyBpLCBjb29yZDJdKTtcbiAgICAgICAgICBjb29yZHMucHVzaChbY29vcmQxICsgaSwgY29vcmQyICsgMV0pO1xuICAgICAgICAgIGNvb3Jkcy5wdXNoKFtjb29yZDEgKyBpLCBjb29yZDIgLSAxXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBbY29vcmQxLCBjb29yZDJdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmluZFJhbmRvbShsZW5ndGgsIGRpcmVjdGlvbik7XG4gICAgfVxuICB9O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgY29uc3QgcmFuZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDExKTtcbiAgICBpZiAocmFuZCA+IDUpIHtcbiAgICAgIGRpcmVjdGlvbnMucHVzaChcInlcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdGlvbnMucHVzaChcInhcIik7XG4gICAgfVxuICB9XG5cbiAgZ2FtZWJvYXJkLnBsYWNlU2hpcChcbiAgICBcIkNhcnJpZXJcIixcbiAgICA1LFxuICAgIGZpbmRSYW5kb20oNSwgZGlyZWN0aW9uc1swXSksXG4gICAgZGlyZWN0aW9uc1swXVxuICApO1xuICBnYW1lYm9hcmQucGxhY2VTaGlwKFxuICAgIFwiQmF0dGxlc2hpcFwiLFxuICAgIDQsXG4gICAgZmluZFJhbmRvbSg0LCBkaXJlY3Rpb25zWzFdKSxcbiAgICBkaXJlY3Rpb25zWzFdXG4gICk7XG4gIGdhbWVib2FyZC5wbGFjZVNoaXAoXG4gICAgXCJDcnVpc2VyXCIsXG4gICAgMyxcbiAgICBmaW5kUmFuZG9tKDMsIGRpcmVjdGlvbnNbMl0pLFxuICAgIGRpcmVjdGlvbnNbMl1cbiAgKTtcbiAgZ2FtZWJvYXJkLnBsYWNlU2hpcChcbiAgICBcIlN1Ym1hcmluZVwiLFxuICAgIDMsXG4gICAgZmluZFJhbmRvbSgzLCBkaXJlY3Rpb25zWzNdKSxcbiAgICBkaXJlY3Rpb25zWzNdXG4gICk7XG4gIGdhbWVib2FyZC5wbGFjZVNoaXAoXG4gICAgXCJEZXN0cm95ZXJcIixcbiAgICAyLFxuICAgIGZpbmRSYW5kb20oMiwgZGlyZWN0aW9uc1s0XSksXG4gICAgZGlyZWN0aW9uc1s0XVxuICApO1xufTtcblxuY29uc3QgZ2FtZSA9ICgpID0+IHtcbiAgY29uc3QgcGxheWVyMSA9IGNyZWF0ZVBsYXllcihcImh1bWFuXCIpO1xuICBjb25zdCBwbGF5ZXIyID0gY3JlYXRlUGxheWVyKFwiQUlcIik7XG4gIGNvbnN0IHBsYXllcjFib2FyZCA9IGNyZWF0ZUdhbWVib2FyZCgpO1xuICBjb25zdCBwbGF5ZXIyYm9hcmQgPSBjcmVhdGVHYW1lYm9hcmQoKTtcbiAgcGxheWVyMWJvYXJkLnBsYWNlU2hpcChcIkNhcnJpZXJcIiwgNSwgWzAsIDBdLCBcInlcIik7XG4gIHBsYXllcjFib2FyZC5wbGFjZVNoaXAoXCJCYXR0bGVzaGlwXCIsIDQsIFs3LCAyXSwgXCJ4XCIpO1xuICBwbGF5ZXIxYm9hcmQucGxhY2VTaGlwKFwiQ3J1aXNlclwiLCAzLCBbMywgNl0sIFwieVwiKTtcbiAgcGxheWVyMWJvYXJkLnBsYWNlU2hpcChcIlN1Ym1hcmluZVwiLCAzLCBbNywgOV0sIFwieVwiKTtcbiAgcGxheWVyMWJvYXJkLnBsYWNlU2hpcChcIkRlc3Ryb3llclwiLCAyLCBbMiwgM10sIFwieFwiKTtcbiAgYWlQbGFjZVNoaXAocGxheWVyMmJvYXJkKTtcbiAgZ2FtZWJvYXJkRGlzcGxheShwbGF5ZXIxYm9hcmQuZ2FtZWJvYXJkLCBcIlBsYXllcjFcIik7XG4gIGdhbWVib2FyZERpc3BsYXkocGxheWVyMmJvYXJkLmdhbWVib2FyZCwgXCJBSVwiKTtcbn07XG5cbmNvbnN0IHR1cm4gPSAocGxheWVyMSwgcGxhdGVyMWJvYXJkLCBwbGF5ZXIyLCBwbGF5ZXIyYm9hcmQpID0+IHt9O1xuXG5leHBvcnQgeyBnYW1lIH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=