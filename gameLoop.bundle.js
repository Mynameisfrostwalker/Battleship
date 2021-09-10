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
  let ships = [];
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

  const clearShip = () => {
    ships = [];
    gameboard.forEach((arr) => {
      for (let i = 0; i < 10; i++) {
        arr[i] = null;
      }
    });
  };

  return { gameboard, placeShip, receiveAttack, allSunk, clearShip };
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




/***/ }),

/***/ "./src/scripts/pubsub.js":
/*!*******************************!*\
  !*** ./src/scripts/pubsub.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "publish": () => (/* binding */ publish),
/* harmony export */   "unsubscribe": () => (/* binding */ unsubscribe),
/* harmony export */   "subscribe": () => (/* binding */ subscribe)
/* harmony export */ });
// @ts-check

/**
 * @module pubsub
 */

/**
 * @return {Object}
 */

const events = {};

/**
 * Subscribe to an event
 * @param {string} eventName - Name of the event
 * @param {Function} fn - Function to be called
 */
const subscribe = function (eventName, fn) {
  events[eventName] = events[eventName] || [];
  events[eventName].push(fn);
};

/**
 * Unsuscribe from an event
 * @param {string} eventName - Name of the event
 * @param {Function} fn - Function to be removed
 */
const unsubscribe = function (eventName, fn) {
  if (events[eventName]) {
    for (let i = 0; i < events[eventName].length; i++) {
      if (events[eventName][i] === fn) {
        events[eventName].splice(i, 1);
        break;
      }
    }
  }
};

/**
 * Publish an event
 * @param {string} eventName - Name of the event
 * @param {*} data -data to be passed into callback
 */
const publish = function (eventName, ...data) {
  if (events[eventName]) {
    events[eventName].forEach(function (fn) {
      fn(data[0], data[1]);
    });
  }
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
/* harmony export */   "game": () => (/* binding */ game),
/* harmony export */   "turn": () => (/* binding */ turn)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/scripts/player.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/scripts/gameboard.js");
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pubsub */ "./src/scripts/pubsub.js");




// @ts-check

const player1 = (0,_player__WEBPACK_IMPORTED_MODULE_0__.createPlayer)("human");
const player2 = (0,_player__WEBPACK_IMPORTED_MODULE_0__.createPlayer)("AI");
const player1board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.createGameboard)();
const player2board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.createGameboard)();

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
    if (!shareValues(coords, secondCoords)) {
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

const gameOver = () => {
  (0,_pubsub__WEBPACK_IMPORTED_MODULE_2__.publish)("removeCellClick");
  if (player1board.allSunk()) {
    (0,_pubsub__WEBPACK_IMPORTED_MODULE_2__.publish)("gameOver", "AI has won the game");
  } else {
    (0,_pubsub__WEBPACK_IMPORTED_MODULE_2__.publish)("gameOver", "Player1 has won the game");
  }
  player1board.clearShip();
  player2board.clearShip();
  (0,_pubsub__WEBPACK_IMPORTED_MODULE_2__.unsubscribe)("newTurn", turn);
  (0,_pubsub__WEBPACK_IMPORTED_MODULE_2__.subscribe)("restart", game);
  (0,_pubsub__WEBPACK_IMPORTED_MODULE_2__.publish)("newGame");
};

const turn = (coords) => {
  player1.toggleTurn();
  player2.toggleTurn();
  player1.attack(player2board, coords);
  (0,_pubsub__WEBPACK_IMPORTED_MODULE_2__.publish)("displayGameboard", player2board.gameboard, "AI");
  if (player1board.allSunk() || player2board.allSunk()) {
    gameOver();
    return;
  }
  player2.attack(player1board);
  (0,_pubsub__WEBPACK_IMPORTED_MODULE_2__.publish)("displayGameboard", player1board.gameboard, "Player1");
  if (player1board.allSunk() || player2board.allSunk()) {
    gameOver();
  }
};

/**
 * Starts game
 * @callback
 */
function game() {
  (0,_pubsub__WEBPACK_IMPORTED_MODULE_2__.subscribe)("newTurn", turn);
  (0,_pubsub__WEBPACK_IMPORTED_MODULE_2__.publish)("cellClick");
  console.log("b");
  player1board.placeShip("Carrier", 5, [0, 0], "y");
  player1board.placeShip("Battleship", 4, [7, 2], "x");
  player1board.placeShip("Cruiser", 3, [3, 6], "y");
  player1board.placeShip("Submarine", 3, [7, 9], "y");
  player1board.placeShip("Destroyer", 2, [2, 3], "x");
  aiPlaceShip(player2board);
  (0,_pubsub__WEBPACK_IMPORTED_MODULE_2__.publish)("displayGameboard", player1board.gameboard, "Player1");
  (0,_pubsub__WEBPACK_IMPORTED_MODULE_2__.publish)("displayGameboard", player2board.gameboard, "AI");
  player1.toggleTurn();
}



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQSxFQUFFLGtEQUFTO0FBQ1gsRUFBRSxnREFBTztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxnREFBTztBQUNULEVBQUUsZ0RBQU87QUFDVDtBQUNBOztBQUVzQiIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvcHVic3ViLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZ2FtZUxvb3AuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlU2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcblxuLy8gQHRzLWNoZWNrXG5cbi8qKlxuICogQG1vZHVsZSBnYW1lYm9hcmRcbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgYSBnYW1lYm9hcmQgb2JqZWN0XG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmNvbnN0IGNyZWF0ZUdhbWVib2FyZCA9ICgpID0+IHtcbiAgbGV0IHNoaXBzID0gW107XG4gIGNvbnN0IGdhbWVib2FyZCA9IFtbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXV07XG4gIGdhbWVib2FyZC5mb3JFYWNoKChhcnIpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGFyci5wdXNoKG51bGwpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gcGxhY2VzIHNoaXBzIG9uIGdhbWVib2FyZFxuICBjb25zdCBwbGFjZVNoaXAgPSAobmFtZSwgbGVuZ3RoT2ZTaGlwLCBjb29yZCwgZGlyZWN0aW9uID0gXCJ4XCIpID0+IHtcbiAgICBjb25zdCBuZXdTaGlwID0gY3JlYXRlU2hpcChuYW1lLCBsZW5ndGhPZlNoaXApO1xuICAgIGlmIChzaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5zaGlwTmFtZSAhPT0gbmV3U2hpcC5zaGlwTmFtZSkpIHtcbiAgICAgIGNvbnN0IGxlbmd0aCA9IG5ld1NoaXAuc2hpcExlbmd0aDtcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwieFwiKSB7XG4gICAgICAgICAgY29vcmRpbmF0ZXMucHVzaChbY29vcmRbMF0sIGNvb3JkWzFdICsgaV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2goW2Nvb3JkWzBdICsgaSwgY29vcmRbMV1dKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBjb29yZGluYXRlcy5ldmVyeSgoY3VycmVudCkgPT4ge1xuICAgICAgICAgIGlmIChjdXJyZW50WzBdID4gOSB8fCBjdXJyZW50WzFdID4gOSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZ2FtZWJvYXJkW2N1cnJlbnRbMF1dW2N1cnJlbnRbMV1dID09PSBudWxsO1xuICAgICAgICB9KVxuICAgICAgKSB7XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIGNvb3JkaW5hdGVzLmZvckVhY2goKGN1cnJlbnQpID0+IHtcbiAgICAgICAgICBnYW1lYm9hcmRbY3VycmVudFswXV1bY3VycmVudFsxXV0gPSB7XG4gICAgICAgICAgICBuYW1lOiBuZXdTaGlwLnNoaXBOYW1lLFxuICAgICAgICAgICAgcG9zaXRpb246IGluZGV4LFxuICAgICAgICAgICAgaXNIaXQ6IG5ld1NoaXAuYm9keVtpbmRleF0sXG4gICAgICAgICAgfTtcbiAgICAgICAgICBpbmRleCsrO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgc2hpcHMucHVzaChuZXdTaGlwKTtcbiAgfTtcblxuICAvLyByZWNlaXZlcyBhdHRhY2tzXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmRzKSA9PiB7XG4gICAgaWYgKGdhbWVib2FyZFtjb29yZHNbMF1dW2Nvb3Jkc1sxXV0gPT09IG51bGwpIHtcbiAgICAgIGdhbWVib2FyZFtjb29yZHNbMF1dW2Nvb3Jkc1sxXV0gPSBcIm1pc3NcIjtcbiAgICB9IGVsc2UgaWYgKGdhbWVib2FyZFtjb29yZHNbMF1dW2Nvb3Jkc1sxXV0gIT09IFwibWlzc1wiKSB7XG4gICAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgIGlmIChnYW1lYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV1dLm5hbWUgPT09IHNoaXAuc2hpcE5hbWUpIHtcbiAgICAgICAgICBzaGlwLmhpdChnYW1lYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV1dLnBvc2l0aW9uKTtcbiAgICAgICAgICBnYW1lYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV1dLmlzSGl0ID1cbiAgICAgICAgICAgIHNoaXAuYm9keVtnYW1lYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV1dLnBvc2l0aW9uXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIGNoZWNrcyBpZiBhbGwgc2hpcHMgYXJlIHN1bmtcbiAgY29uc3QgYWxsU3VuayA9ICgpID0+IHtcbiAgICBjb25zdCBib29sZWFuID0gc2hpcHMucmVkdWNlKChhY2N1bSwgc2hpcCkgPT4ge1xuICAgICAgcmV0dXJuIGFjY3VtICYmIHNoaXAuaXNTdW5rKCk7XG4gICAgfSwgdHJ1ZSk7XG4gICAgcmV0dXJuIGJvb2xlYW47XG4gIH07XG5cbiAgY29uc3QgY2xlYXJTaGlwID0gKCkgPT4ge1xuICAgIHNoaXBzID0gW107XG4gICAgZ2FtZWJvYXJkLmZvckVhY2goKGFycikgPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgIGFycltpXSA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHsgZ2FtZWJvYXJkLCBwbGFjZVNoaXAsIHJlY2VpdmVBdHRhY2ssIGFsbFN1bmssIGNsZWFyU2hpcCB9O1xufTtcblxuZXhwb3J0IHsgY3JlYXRlR2FtZWJvYXJkIH07XG4iLCIvLyBAdHMtY2hlY2tcblxuLyoqXG4gKiBAbW9kdWxlIHBsYXllclxuICovXG5cbi8qKlxuICogY3JlYXRlcyBQbGF5ZXJzXG4gKiBAcGFyYW0ge3N0cmluZ30gcGxheWVyXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmNvbnN0IGNyZWF0ZVBsYXllciA9IChwbGF5ZXIgPSBcImh1bWFuXCIpID0+IHtcbiAgbGV0IHR1cm4gPSB0cnVlO1xuICBsZXQgYXR0YWNrO1xuXG4gIGNvbnN0IGdldFR1cm4gPSAoKSA9PiB7XG4gICAgcmV0dXJuIHR1cm47XG4gIH07XG5cbiAgY29uc3QgdG9nZ2xlVHVybiA9ICgpID0+IHtcbiAgICB0dXJuID0gIXR1cm47XG4gIH07XG5cbiAgaWYgKHBsYXllciA9PT0gXCJodW1hblwiKSB7XG4gICAgYXR0YWNrID0gKGJvYXJkLCBjb29yZHMpID0+IHtcbiAgICAgIGJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRzKTtcbiAgICB9O1xuICB9IGVsc2UgaWYgKHBsYXllciA9PT0gXCJBSVwiKSB7XG4gICAgYXR0YWNrID0gKGJvYXJkKSA9PiB7XG4gICAgICBjb25zdCBhdmFpbGFibGUgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQuZ2FtZWJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYm9hcmQuZ2FtZWJvYXJkW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgYm9hcmQuZ2FtZWJvYXJkW2ldW2pdID09PSBudWxsIHx8XG4gICAgICAgICAgICBib2FyZC5nYW1lYm9hcmRbaV1bal0uaXNIaXQgPT09IGZhbHNlXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBhdmFpbGFibGUucHVzaChbaSwgal0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGF2YWlsYWJsZS5sZW5ndGgpO1xuICAgICAgYm9hcmQucmVjZWl2ZUF0dGFjayhhdmFpbGFibGVbeV0pO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4geyBnZXRUdXJuLCB0b2dnbGVUdXJuLCBhdHRhY2sgfTtcbn07XG5cbmV4cG9ydCB7IGNyZWF0ZVBsYXllciB9O1xuIiwiLy8gQHRzLWNoZWNrXG5cbi8qKlxuICogQG1vZHVsZSBwdWJzdWJcbiAqL1xuXG4vKipcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuXG5jb25zdCBldmVudHMgPSB7fTtcblxuLyoqXG4gKiBTdWJzY3JpYmUgdG8gYW4gZXZlbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgLSBOYW1lIG9mIHRoZSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSBGdW5jdGlvbiB0byBiZSBjYWxsZWRcbiAqL1xuY29uc3Qgc3Vic2NyaWJlID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgZm4pIHtcbiAgZXZlbnRzW2V2ZW50TmFtZV0gPSBldmVudHNbZXZlbnROYW1lXSB8fCBbXTtcbiAgZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChmbik7XG59O1xuXG4vKipcbiAqIFVuc3VzY3JpYmUgZnJvbSBhbiBldmVudFxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSAtIE5hbWUgb2YgdGhlIGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIEZ1bmN0aW9uIHRvIGJlIHJlbW92ZWRcbiAqL1xuY29uc3QgdW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBmbikge1xuICBpZiAoZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50c1tldmVudE5hbWVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZXZlbnRzW2V2ZW50TmFtZV1baV0gPT09IGZuKSB7XG4gICAgICAgIGV2ZW50c1tldmVudE5hbWVdLnNwbGljZShpLCAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIFB1Ymxpc2ggYW4gZXZlbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgLSBOYW1lIG9mIHRoZSBldmVudFxuICogQHBhcmFtIHsqfSBkYXRhIC1kYXRhIHRvIGJlIHBhc3NlZCBpbnRvIGNhbGxiYWNrXG4gKi9cbmNvbnN0IHB1Ymxpc2ggPSBmdW5jdGlvbiAoZXZlbnROYW1lLCAuLi5kYXRhKSB7XG4gIGlmIChldmVudHNbZXZlbnROYW1lXSkge1xuICAgIGV2ZW50c1tldmVudE5hbWVdLmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XG4gICAgICBmbihkYXRhWzBdLCBkYXRhWzFdKTtcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IHsgcHVibGlzaCwgdW5zdWJzY3JpYmUsIHN1YnNjcmliZSB9O1xuIiwiLy8gQHRzLWNoZWNrXG5cbi8qKlxuICogQG1vZHVsZSBTaGlwXG4gKi9cbi8vIEB0cy1jaGVja1xuXG4vKipcbiAqIFNoaXAgZmFjdG9yeSBmdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGhcbiAqIEByZXR1cm4ge09iamVjdH0gLSBzaGlwIG9iamVjdFxuICovXG5jb25zdCBjcmVhdGVTaGlwID0gKG5hbWUsIGxlbmd0aCkgPT4ge1xuICBjb25zdCBzaGlwQm9keSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgc2hpcEJvZHkucHVzaChmYWxzZSk7XG4gIH1cbiAgY29uc3Qgc2hpcCA9IHtcbiAgICBzaGlwTmFtZTogbmFtZSxcbiAgICBib2R5OiBzaGlwQm9keSxcbiAgICBzaGlwTGVuZ3RoOiBzaGlwQm9keS5sZW5ndGgsXG4gICAgaGl0KGluZGV4KSB7XG4gICAgICBzaGlwQm9keVtpbmRleF0gPSB0cnVlO1xuICAgIH0sXG4gICAgaXNTdW5rKCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwQm9keS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc2hpcEJvZHlbaV0gPT09IGZhbHNlKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICB9O1xuICByZXR1cm4gc2hpcDtcbn07XG5cbmV4cG9ydCB7IGNyZWF0ZVNoaXAgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY3JlYXRlUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBjcmVhdGVHYW1lYm9hcmQgfSBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcbmltcG9ydCB7IHB1Ymxpc2gsIHN1YnNjcmliZSwgdW5zdWJzY3JpYmUgfSBmcm9tIFwiLi9wdWJzdWJcIjtcblxuLy8gQHRzLWNoZWNrXG5cbmNvbnN0IHBsYXllcjEgPSBjcmVhdGVQbGF5ZXIoXCJodW1hblwiKTtcbmNvbnN0IHBsYXllcjIgPSBjcmVhdGVQbGF5ZXIoXCJBSVwiKTtcbmNvbnN0IHBsYXllcjFib2FyZCA9IGNyZWF0ZUdhbWVib2FyZCgpO1xuY29uc3QgcGxheWVyMmJvYXJkID0gY3JlYXRlR2FtZWJvYXJkKCk7XG5cbi8qKlxuICogQG1vZHVsZSBnYW1lTG9vcFxuICovXG5cbmNvbnN0IHNoYXJlVmFsdWVzID0gKGJpZ0FyciwgYXJyKSA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYmlnQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY3VycmVudCA9IGJpZ0FycltpXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFyci5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3Qgc21hbGxDdXJyZW50ID0gYXJyW2pdO1xuICAgICAgaWYgKGN1cnJlbnRbMF0gPT09IHNtYWxsQ3VycmVudFswXSAmJiBjdXJyZW50WzFdID09PSBzbWFsbEN1cnJlbnRbMV0pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IGFpUGxhY2VTaGlwID0gKGdhbWVib2FyZCkgPT4ge1xuICBjb25zdCBjb29yZHMgPSBbXTtcbiAgY29uc3QgZGlyZWN0aW9ucyA9IFtdO1xuICBjb25zdCByYW5kb20gPSAobGVuZ3RoKSA9PiB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMCAtIGxlbmd0aCkpO1xuICB9O1xuXG4gIC8vIGZpbmRzIHJhbmRvbSBjb29yZGluYXRlcyB3aGljaCBzYXRpc2Z5IHRoZSBjb25kaXRpb25zXG4gIGNvbnN0IGZpbmRSYW5kb20gPSAobGVuZ3RoLCBkaXJlY3Rpb24pID0+IHtcbiAgICBsZXQgY29vcmQxO1xuICAgIGxldCBjb29yZDI7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ4XCIpIHtcbiAgICAgIGNvb3JkMSA9IHJhbmRvbSgwKTtcbiAgICAgIGNvb3JkMiA9IHJhbmRvbShsZW5ndGgpO1xuICAgIH1cbiAgICBpZiAoZGlyZWN0aW9uID09PSBcInlcIikge1xuICAgICAgY29vcmQxID0gcmFuZG9tKGxlbmd0aCk7XG4gICAgICBjb29yZDIgPSByYW5kb20oMCk7XG4gICAgfVxuICAgIGNvbnN0IHNlY29uZENvb3JkcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwieFwiKSB7XG4gICAgICAgIHNlY29uZENvb3Jkcy5wdXNoKFtjb29yZDEsIGNvb3JkMiArIGldKTtcbiAgICAgIH1cbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwieVwiKSB7XG4gICAgICAgIHNlY29uZENvb3Jkcy5wdXNoKFtjb29yZDEgKyBpLCBjb29yZDJdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFzaGFyZVZhbHVlcyhjb29yZHMsIHNlY29uZENvb3JkcykpIHtcbiAgICAgIGZvciAobGV0IGkgPSAtMTsgaSA8PSBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcInhcIikge1xuICAgICAgICAgIGNvb3Jkcy5wdXNoKFtjb29yZDEsIGNvb3JkMiArIGldKTtcbiAgICAgICAgICBjb29yZHMucHVzaChbY29vcmQxICsgMSwgY29vcmQyICsgaV0pO1xuICAgICAgICAgIGNvb3Jkcy5wdXNoKFtjb29yZDEgLSAxLCBjb29yZDIgKyBpXSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcInlcIikge1xuICAgICAgICAgIGNvb3Jkcy5wdXNoKFtjb29yZDEgKyBpLCBjb29yZDJdKTtcbiAgICAgICAgICBjb29yZHMucHVzaChbY29vcmQxICsgaSwgY29vcmQyICsgMV0pO1xuICAgICAgICAgIGNvb3Jkcy5wdXNoKFtjb29yZDEgKyBpLCBjb29yZDIgLSAxXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBbY29vcmQxLCBjb29yZDJdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmluZFJhbmRvbShsZW5ndGgsIGRpcmVjdGlvbik7XG4gICAgfVxuICB9O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgY29uc3QgcmFuZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDExKTtcbiAgICBpZiAocmFuZCA+IDUpIHtcbiAgICAgIGRpcmVjdGlvbnMucHVzaChcInlcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdGlvbnMucHVzaChcInhcIik7XG4gICAgfVxuICB9XG5cbiAgZ2FtZWJvYXJkLnBsYWNlU2hpcChcbiAgICBcIkNhcnJpZXJcIixcbiAgICA1LFxuICAgIGZpbmRSYW5kb20oNSwgZGlyZWN0aW9uc1swXSksXG4gICAgZGlyZWN0aW9uc1swXVxuICApO1xuICBnYW1lYm9hcmQucGxhY2VTaGlwKFxuICAgIFwiQmF0dGxlc2hpcFwiLFxuICAgIDQsXG4gICAgZmluZFJhbmRvbSg0LCBkaXJlY3Rpb25zWzFdKSxcbiAgICBkaXJlY3Rpb25zWzFdXG4gICk7XG4gIGdhbWVib2FyZC5wbGFjZVNoaXAoXG4gICAgXCJDcnVpc2VyXCIsXG4gICAgMyxcbiAgICBmaW5kUmFuZG9tKDMsIGRpcmVjdGlvbnNbMl0pLFxuICAgIGRpcmVjdGlvbnNbMl1cbiAgKTtcbiAgZ2FtZWJvYXJkLnBsYWNlU2hpcChcbiAgICBcIlN1Ym1hcmluZVwiLFxuICAgIDMsXG4gICAgZmluZFJhbmRvbSgzLCBkaXJlY3Rpb25zWzNdKSxcbiAgICBkaXJlY3Rpb25zWzNdXG4gICk7XG4gIGdhbWVib2FyZC5wbGFjZVNoaXAoXG4gICAgXCJEZXN0cm95ZXJcIixcbiAgICAyLFxuICAgIGZpbmRSYW5kb20oMiwgZGlyZWN0aW9uc1s0XSksXG4gICAgZGlyZWN0aW9uc1s0XVxuICApO1xufTtcblxuY29uc3QgZ2FtZU92ZXIgPSAoKSA9PiB7XG4gIHB1Ymxpc2goXCJyZW1vdmVDZWxsQ2xpY2tcIik7XG4gIGlmIChwbGF5ZXIxYm9hcmQuYWxsU3VuaygpKSB7XG4gICAgcHVibGlzaChcImdhbWVPdmVyXCIsIFwiQUkgaGFzIHdvbiB0aGUgZ2FtZVwiKTtcbiAgfSBlbHNlIHtcbiAgICBwdWJsaXNoKFwiZ2FtZU92ZXJcIiwgXCJQbGF5ZXIxIGhhcyB3b24gdGhlIGdhbWVcIik7XG4gIH1cbiAgcGxheWVyMWJvYXJkLmNsZWFyU2hpcCgpO1xuICBwbGF5ZXIyYm9hcmQuY2xlYXJTaGlwKCk7XG4gIHVuc3Vic2NyaWJlKFwibmV3VHVyblwiLCB0dXJuKTtcbiAgc3Vic2NyaWJlKFwicmVzdGFydFwiLCBnYW1lKTtcbiAgcHVibGlzaChcIm5ld0dhbWVcIik7XG59O1xuXG5jb25zdCB0dXJuID0gKGNvb3JkcykgPT4ge1xuICBwbGF5ZXIxLnRvZ2dsZVR1cm4oKTtcbiAgcGxheWVyMi50b2dnbGVUdXJuKCk7XG4gIHBsYXllcjEuYXR0YWNrKHBsYXllcjJib2FyZCwgY29vcmRzKTtcbiAgcHVibGlzaChcImRpc3BsYXlHYW1lYm9hcmRcIiwgcGxheWVyMmJvYXJkLmdhbWVib2FyZCwgXCJBSVwiKTtcbiAgaWYgKHBsYXllcjFib2FyZC5hbGxTdW5rKCkgfHwgcGxheWVyMmJvYXJkLmFsbFN1bmsoKSkge1xuICAgIGdhbWVPdmVyKCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHBsYXllcjIuYXR0YWNrKHBsYXllcjFib2FyZCk7XG4gIHB1Ymxpc2goXCJkaXNwbGF5R2FtZWJvYXJkXCIsIHBsYXllcjFib2FyZC5nYW1lYm9hcmQsIFwiUGxheWVyMVwiKTtcbiAgaWYgKHBsYXllcjFib2FyZC5hbGxTdW5rKCkgfHwgcGxheWVyMmJvYXJkLmFsbFN1bmsoKSkge1xuICAgIGdhbWVPdmVyKCk7XG4gIH1cbn07XG5cbi8qKlxuICogU3RhcnRzIGdhbWVcbiAqIEBjYWxsYmFja1xuICovXG5mdW5jdGlvbiBnYW1lKCkge1xuICBzdWJzY3JpYmUoXCJuZXdUdXJuXCIsIHR1cm4pO1xuICBwdWJsaXNoKFwiY2VsbENsaWNrXCIpO1xuICBjb25zb2xlLmxvZyhcImJcIik7XG4gIHBsYXllcjFib2FyZC5wbGFjZVNoaXAoXCJDYXJyaWVyXCIsIDUsIFswLCAwXSwgXCJ5XCIpO1xuICBwbGF5ZXIxYm9hcmQucGxhY2VTaGlwKFwiQmF0dGxlc2hpcFwiLCA0LCBbNywgMl0sIFwieFwiKTtcbiAgcGxheWVyMWJvYXJkLnBsYWNlU2hpcChcIkNydWlzZXJcIiwgMywgWzMsIDZdLCBcInlcIik7XG4gIHBsYXllcjFib2FyZC5wbGFjZVNoaXAoXCJTdWJtYXJpbmVcIiwgMywgWzcsIDldLCBcInlcIik7XG4gIHBsYXllcjFib2FyZC5wbGFjZVNoaXAoXCJEZXN0cm95ZXJcIiwgMiwgWzIsIDNdLCBcInhcIik7XG4gIGFpUGxhY2VTaGlwKHBsYXllcjJib2FyZCk7XG4gIHB1Ymxpc2goXCJkaXNwbGF5R2FtZWJvYXJkXCIsIHBsYXllcjFib2FyZC5nYW1lYm9hcmQsIFwiUGxheWVyMVwiKTtcbiAgcHVibGlzaChcImRpc3BsYXlHYW1lYm9hcmRcIiwgcGxheWVyMmJvYXJkLmdhbWVib2FyZCwgXCJBSVwiKTtcbiAgcGxheWVyMS50b2dnbGVUdXJuKCk7XG59XG5cbmV4cG9ydCB7IGdhbWUsIHR1cm4gfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==