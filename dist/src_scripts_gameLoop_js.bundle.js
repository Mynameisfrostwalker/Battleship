"use strict";
(self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || []).push([["src_scripts_gameLoop_js"],{

/***/ "./src/scripts/gameLoop.js":
/*!*********************************!*\
  !*** ./src/scripts/gameLoop.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "game": () => (/* binding */ game),
/* harmony export */   "turn": () => (/* binding */ turn),
/* harmony export */   "setUp": () => (/* binding */ setUp),
/* harmony export */   "areShipsPlaced": () => (/* binding */ areShipsPlaced)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/scripts/player.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/scripts/gameboard.js");
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pubsub */ "./src/scripts/pubsub.js");




// @ts-check

/**
 * @module gameLoop
 */

/**
 * @type Object
 */
const player1 = (0,_player__WEBPACK_IMPORTED_MODULE_0__.createPlayer)("human");

/**
 * @type Object
 */
const player2 = (0,_player__WEBPACK_IMPORTED_MODULE_0__.createPlayer)("AI");

/**
 * @type Object
 */
const player1board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.createGameboard)();

/**
 * @type Object
 */
const player2board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.createGameboard)();

/**
 * @type {Array<String>}
 */
let arr = ["Carrier", "Battleship", "Cruiser", "Submarine", "Destroyer"];

/**
 * @type {Array}
 */
let ships = [];

/**
 * Checks if two arrays share the same value
 * @param {Array} bigArr
 * @param {Array} arr
 * @memberof createGameboard
 * @return {Boolean}
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

/**
 * Places AI ships
 * @param {Object} gameboard
 */
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

/**
 * game over
 * @function
 */
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

/**
 * @param {Array<Number>} coords - coordinates of cell
 * @return {void}
 */
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
  aiPlaceShip(player2board);
  (0,_pubsub__WEBPACK_IMPORTED_MODULE_2__.publish)("displayGameboard", player1board.gameboard, "Player1");
  (0,_pubsub__WEBPACK_IMPORTED_MODULE_2__.publish)("displayGameboard", player2board.gameboard, "AI");
  player1.toggleTurn();
}

/**
 * Places player ships
 * @param {Number} length
 * @param {Array<Number>} coord
 * @param {String} dir
 * @param {Number} element
 */
const setUp = (length, coord, dir, element) => {
  const newCoord = [...coord];
  if (dir === "y") {
    newCoord[0] = newCoord[0] - element;
    player1board.placeShip(arr[0], length, newCoord, dir);
  } else {
    newCoord[1] = newCoord[1] - element;
    player1board.placeShip(arr[0], length, newCoord, dir);
  }
  (0,_pubsub__WEBPACK_IMPORTED_MODULE_2__.publish)("displayGameboard", player1board.gameboard, "Player1");
  arr.shift();
  if (arr.length === 0) {
    arr = ["Carrier", "Battleship", "Cruiser", "Submarine", "Destroyer"];
    (0,_pubsub__WEBPACK_IMPORTED_MODULE_2__.publish)("cellClick");
  }
};

/**
 * Checks if correct number of ships have been placed
 * @param {Number} no - Number of ships that should have been placed
 * @return {Boolean}
 */
const areShipsPlaced = (no) => {
  if (ships.length > 4) {
    ships = [];
  }
  player1board.gameboard.forEach((row) => {
    row.forEach((cell) => {
      if ((cell !== null) & (cell !== "miss")) {
        if (!shareValues(ships, [cell.name])) {
          ships.push(cell.name);
        }
      }
    });
  });
  if (ships.length === no) {
    return true;
  }
  return false;
};




/***/ }),

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
 * @type {Function}
 * @namespace createGameboard
 * @return {Object}
 */
const createGameboard = () => {
  /**
   * @type {Array}
   * @memberof createGameboard
   */
  let ships = [];

  /**
   * @type {Array<Array>}
   * @memberof createGameboard
   */
  const gameboard = [[], [], [], [], [], [], [], [], [], []];
  gameboard.forEach((arr) => {
    for (let i = 0; i < 10; i++) {
      arr.push(null);
    }
  });

  /**
   * Checks if two arrays share the same value
   * @param {Array} bigArr
   * @param {Array} arr
   * @memberof createGameboard
   * @return {Boolean}
   */
  const shareValues = (bigArr, arr) => {
    for (let i = 0; i < bigArr.length; i++) {
      const current = bigArr[i];
      for (let j = 0; j < arr.length; j++) {
        const smallCurrent = arr[j];
        if (current.shipName === smallCurrent.shipName) {
          return true;
        }
      }
    }
    return false;
  };

  /**
   * Places ships on gameboard
   * @param {String} name - Name of ship
   * @param {Number} lengthOfShip - Ship length
   * @param {Array<Number>} coord - Coordinates
   * @param {String} direction - Vertical or horizontal alignment
   * @memberof createGameboard
   */
  const placeShip = (name, lengthOfShip, coord, direction = "x") => {
    const newShip = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.createShip)(name, lengthOfShip);
    if (!shareValues(ships, [newShip])) {
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
        ships.push(newShip);
      }
    }
  };

  /**
   * Attacks gambeboard cell
   * @param {Array<Number>} coords - cell to attack
   * @memberof createGameboard
   */
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

  /**
   * Checks if all ships are sunk
   * @memberof createGameboard
   * @return {Boolean} -true if all ships are sunk
   */
  const allSunk = () => {
    const boolean = ships.reduce((accum, ship) => {
      return accum && ship.isSunk();
    }, true);
    return boolean;
  };

  /**
   * Clears gameboard
   * @member createGameboard
   * @function
   */
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
      fn(data[0], data[1], data[2], data[3]);
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

  /**
   * @type {Object}
   * @namespace Ship
   */
  const ship = {
    /**
     * @memberof Ship
     * @type {String}
     */
    shipName: name,

    /**
     * @memberof Ship
     * @type {Array}
     */
    body: shipBody,

    /**
     * @type {Number}
     */
    shipLength: shipBody.length,

    /**
     * @memberof Ship
     * @param {Number} index - place where ship was hit
     */
    hit(index) {
      shipBody[index] = true;
    },

    /**
     * checks if ship is sunk
     * @memberof Ship
     * @return {Boolean}
     */
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

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFVBQVU7QUFDckI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDhCQUE4QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsR0FBRztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFMkM7Ozs7Ozs7Ozs7Ozs7OztBQ25EM0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0E7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBLHNCQUFzQixxQkFBcUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRXNCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2dhbWVMb29wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvcHVic3ViLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9zaGlwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVBsYXllciB9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgY3JlYXRlR2FtZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBwdWJsaXNoLCBzdWJzY3JpYmUsIHVuc3Vic2NyaWJlIH0gZnJvbSBcIi4vcHVic3ViXCI7XG5cbi8vIEB0cy1jaGVja1xuXG4vKipcbiAqIEBtb2R1bGUgZ2FtZUxvb3BcbiAqL1xuXG4vKipcbiAqIEB0eXBlIE9iamVjdFxuICovXG5jb25zdCBwbGF5ZXIxID0gY3JlYXRlUGxheWVyKFwiaHVtYW5cIik7XG5cbi8qKlxuICogQHR5cGUgT2JqZWN0XG4gKi9cbmNvbnN0IHBsYXllcjIgPSBjcmVhdGVQbGF5ZXIoXCJBSVwiKTtcblxuLyoqXG4gKiBAdHlwZSBPYmplY3RcbiAqL1xuY29uc3QgcGxheWVyMWJvYXJkID0gY3JlYXRlR2FtZWJvYXJkKCk7XG5cbi8qKlxuICogQHR5cGUgT2JqZWN0XG4gKi9cbmNvbnN0IHBsYXllcjJib2FyZCA9IGNyZWF0ZUdhbWVib2FyZCgpO1xuXG4vKipcbiAqIEB0eXBlIHtBcnJheTxTdHJpbmc+fVxuICovXG5sZXQgYXJyID0gW1wiQ2FycmllclwiLCBcIkJhdHRsZXNoaXBcIiwgXCJDcnVpc2VyXCIsIFwiU3VibWFyaW5lXCIsIFwiRGVzdHJveWVyXCJdO1xuXG4vKipcbiAqIEB0eXBlIHtBcnJheX1cbiAqL1xubGV0IHNoaXBzID0gW107XG5cbi8qKlxuICogQ2hlY2tzIGlmIHR3byBhcnJheXMgc2hhcmUgdGhlIHNhbWUgdmFsdWVcbiAqIEBwYXJhbSB7QXJyYXl9IGJpZ0FyclxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKiBAbWVtYmVyb2YgY3JlYXRlR2FtZWJvYXJkXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5jb25zdCBzaGFyZVZhbHVlcyA9IChiaWdBcnIsIGFycikgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJpZ0Fyci5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGN1cnJlbnQgPSBiaWdBcnJbaV07XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IHNtYWxsQ3VycmVudCA9IGFycltqXTtcbiAgICAgIGlmIChjdXJyZW50WzBdID09PSBzbWFsbEN1cnJlbnRbMF0gJiYgY3VycmVudFsxXSA9PT0gc21hbGxDdXJyZW50WzFdKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vKipcbiAqIFBsYWNlcyBBSSBzaGlwc1xuICogQHBhcmFtIHtPYmplY3R9IGdhbWVib2FyZFxuICovXG5jb25zdCBhaVBsYWNlU2hpcCA9IChnYW1lYm9hcmQpID0+IHtcbiAgY29uc3QgY29vcmRzID0gW107XG4gIGNvbnN0IGRpcmVjdGlvbnMgPSBbXTtcbiAgY29uc3QgcmFuZG9tID0gKGxlbmd0aCkgPT4ge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAgLSBsZW5ndGgpKTtcbiAgfTtcblxuICAvLyBmaW5kcyByYW5kb20gY29vcmRpbmF0ZXMgd2hpY2ggc2F0aXNmeSB0aGUgY29uZGl0aW9uc1xuICBjb25zdCBmaW5kUmFuZG9tID0gKGxlbmd0aCwgZGlyZWN0aW9uKSA9PiB7XG4gICAgbGV0IGNvb3JkMTtcbiAgICBsZXQgY29vcmQyO1xuICAgIGlmIChkaXJlY3Rpb24gPT09IFwieFwiKSB7XG4gICAgICBjb29yZDEgPSByYW5kb20oMCk7XG4gICAgICBjb29yZDIgPSByYW5kb20obGVuZ3RoKTtcbiAgICB9XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ5XCIpIHtcbiAgICAgIGNvb3JkMSA9IHJhbmRvbShsZW5ndGgpO1xuICAgICAgY29vcmQyID0gcmFuZG9tKDApO1xuICAgIH1cbiAgICBjb25zdCBzZWNvbmRDb29yZHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBcInhcIikge1xuICAgICAgICBzZWNvbmRDb29yZHMucHVzaChbY29vcmQxLCBjb29yZDIgKyBpXSk7XG4gICAgICB9XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBcInlcIikge1xuICAgICAgICBzZWNvbmRDb29yZHMucHVzaChbY29vcmQxICsgaSwgY29vcmQyXSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghc2hhcmVWYWx1ZXMoY29vcmRzLCBzZWNvbmRDb29yZHMpKSB7XG4gICAgICBmb3IgKGxldCBpID0gLTE7IGkgPD0gbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ4XCIpIHtcbiAgICAgICAgICBjb29yZHMucHVzaChbY29vcmQxLCBjb29yZDIgKyBpXSk7XG4gICAgICAgICAgY29vcmRzLnB1c2goW2Nvb3JkMSArIDEsIGNvb3JkMiArIGldKTtcbiAgICAgICAgICBjb29yZHMucHVzaChbY29vcmQxIC0gMSwgY29vcmQyICsgaV0pO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJ5XCIpIHtcbiAgICAgICAgICBjb29yZHMucHVzaChbY29vcmQxICsgaSwgY29vcmQyXSk7XG4gICAgICAgICAgY29vcmRzLnB1c2goW2Nvb3JkMSArIGksIGNvb3JkMiArIDFdKTtcbiAgICAgICAgICBjb29yZHMucHVzaChbY29vcmQxICsgaSwgY29vcmQyIC0gMV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gW2Nvb3JkMSwgY29vcmQyXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZpbmRSYW5kb20obGVuZ3RoLCBkaXJlY3Rpb24pO1xuICAgIH1cbiAgfTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgIGNvbnN0IHJhbmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMSk7XG4gICAgaWYgKHJhbmQgPiA1KSB7XG4gICAgICBkaXJlY3Rpb25zLnB1c2goXCJ5XCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3Rpb25zLnB1c2goXCJ4XCIpO1xuICAgIH1cbiAgfVxuXG4gIGdhbWVib2FyZC5wbGFjZVNoaXAoXG4gICAgXCJDYXJyaWVyXCIsXG4gICAgNSxcbiAgICBmaW5kUmFuZG9tKDUsIGRpcmVjdGlvbnNbMF0pLFxuICAgIGRpcmVjdGlvbnNbMF1cbiAgKTtcbiAgZ2FtZWJvYXJkLnBsYWNlU2hpcChcbiAgICBcIkJhdHRsZXNoaXBcIixcbiAgICA0LFxuICAgIGZpbmRSYW5kb20oNCwgZGlyZWN0aW9uc1sxXSksXG4gICAgZGlyZWN0aW9uc1sxXVxuICApO1xuICBnYW1lYm9hcmQucGxhY2VTaGlwKFxuICAgIFwiQ3J1aXNlclwiLFxuICAgIDMsXG4gICAgZmluZFJhbmRvbSgzLCBkaXJlY3Rpb25zWzJdKSxcbiAgICBkaXJlY3Rpb25zWzJdXG4gICk7XG4gIGdhbWVib2FyZC5wbGFjZVNoaXAoXG4gICAgXCJTdWJtYXJpbmVcIixcbiAgICAzLFxuICAgIGZpbmRSYW5kb20oMywgZGlyZWN0aW9uc1szXSksXG4gICAgZGlyZWN0aW9uc1szXVxuICApO1xuICBnYW1lYm9hcmQucGxhY2VTaGlwKFxuICAgIFwiRGVzdHJveWVyXCIsXG4gICAgMixcbiAgICBmaW5kUmFuZG9tKDIsIGRpcmVjdGlvbnNbNF0pLFxuICAgIGRpcmVjdGlvbnNbNF1cbiAgKTtcbn07XG5cbi8qKlxuICogZ2FtZSBvdmVyXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgZ2FtZU92ZXIgPSAoKSA9PiB7XG4gIHB1Ymxpc2goXCJyZW1vdmVDZWxsQ2xpY2tcIik7XG4gIGlmIChwbGF5ZXIxYm9hcmQuYWxsU3VuaygpKSB7XG4gICAgcHVibGlzaChcImdhbWVPdmVyXCIsIFwiQUkgaGFzIHdvbiB0aGUgZ2FtZVwiKTtcbiAgfSBlbHNlIHtcbiAgICBwdWJsaXNoKFwiZ2FtZU92ZXJcIiwgXCJQbGF5ZXIxIGhhcyB3b24gdGhlIGdhbWVcIik7XG4gIH1cbiAgcGxheWVyMWJvYXJkLmNsZWFyU2hpcCgpO1xuICBwbGF5ZXIyYm9hcmQuY2xlYXJTaGlwKCk7XG4gIHVuc3Vic2NyaWJlKFwibmV3VHVyblwiLCB0dXJuKTtcbiAgc3Vic2NyaWJlKFwicmVzdGFydFwiLCBnYW1lKTtcbiAgcHVibGlzaChcIm5ld0dhbWVcIik7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7QXJyYXk8TnVtYmVyPn0gY29vcmRzIC0gY29vcmRpbmF0ZXMgb2YgY2VsbFxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuY29uc3QgdHVybiA9IChjb29yZHMpID0+IHtcbiAgcGxheWVyMS50b2dnbGVUdXJuKCk7XG4gIHBsYXllcjIudG9nZ2xlVHVybigpO1xuICBwbGF5ZXIxLmF0dGFjayhwbGF5ZXIyYm9hcmQsIGNvb3Jkcyk7XG4gIHB1Ymxpc2goXCJkaXNwbGF5R2FtZWJvYXJkXCIsIHBsYXllcjJib2FyZC5nYW1lYm9hcmQsIFwiQUlcIik7XG4gIGlmIChwbGF5ZXIxYm9hcmQuYWxsU3VuaygpIHx8IHBsYXllcjJib2FyZC5hbGxTdW5rKCkpIHtcbiAgICBnYW1lT3ZlcigpO1xuICAgIHJldHVybjtcbiAgfVxuICBwbGF5ZXIyLmF0dGFjayhwbGF5ZXIxYm9hcmQpO1xuICBwdWJsaXNoKFwiZGlzcGxheUdhbWVib2FyZFwiLCBwbGF5ZXIxYm9hcmQuZ2FtZWJvYXJkLCBcIlBsYXllcjFcIik7XG4gIGlmIChwbGF5ZXIxYm9hcmQuYWxsU3VuaygpIHx8IHBsYXllcjJib2FyZC5hbGxTdW5rKCkpIHtcbiAgICBnYW1lT3ZlcigpO1xuICB9XG59O1xuXG4vKipcbiAqIFN0YXJ0cyBnYW1lXG4gKiBAY2FsbGJhY2tcbiAqL1xuZnVuY3Rpb24gZ2FtZSgpIHtcbiAgc3Vic2NyaWJlKFwibmV3VHVyblwiLCB0dXJuKTtcbiAgYWlQbGFjZVNoaXAocGxheWVyMmJvYXJkKTtcbiAgcHVibGlzaChcImRpc3BsYXlHYW1lYm9hcmRcIiwgcGxheWVyMWJvYXJkLmdhbWVib2FyZCwgXCJQbGF5ZXIxXCIpO1xuICBwdWJsaXNoKFwiZGlzcGxheUdhbWVib2FyZFwiLCBwbGF5ZXIyYm9hcmQuZ2FtZWJvYXJkLCBcIkFJXCIpO1xuICBwbGF5ZXIxLnRvZ2dsZVR1cm4oKTtcbn1cblxuLyoqXG4gKiBQbGFjZXMgcGxheWVyIHNoaXBzXG4gKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoXG4gKiBAcGFyYW0ge0FycmF5PE51bWJlcj59IGNvb3JkXG4gKiBAcGFyYW0ge1N0cmluZ30gZGlyXG4gKiBAcGFyYW0ge051bWJlcn0gZWxlbWVudFxuICovXG5jb25zdCBzZXRVcCA9IChsZW5ndGgsIGNvb3JkLCBkaXIsIGVsZW1lbnQpID0+IHtcbiAgY29uc3QgbmV3Q29vcmQgPSBbLi4uY29vcmRdO1xuICBpZiAoZGlyID09PSBcInlcIikge1xuICAgIG5ld0Nvb3JkWzBdID0gbmV3Q29vcmRbMF0gLSBlbGVtZW50O1xuICAgIHBsYXllcjFib2FyZC5wbGFjZVNoaXAoYXJyWzBdLCBsZW5ndGgsIG5ld0Nvb3JkLCBkaXIpO1xuICB9IGVsc2Uge1xuICAgIG5ld0Nvb3JkWzFdID0gbmV3Q29vcmRbMV0gLSBlbGVtZW50O1xuICAgIHBsYXllcjFib2FyZC5wbGFjZVNoaXAoYXJyWzBdLCBsZW5ndGgsIG5ld0Nvb3JkLCBkaXIpO1xuICB9XG4gIHB1Ymxpc2goXCJkaXNwbGF5R2FtZWJvYXJkXCIsIHBsYXllcjFib2FyZC5nYW1lYm9hcmQsIFwiUGxheWVyMVwiKTtcbiAgYXJyLnNoaWZ0KCk7XG4gIGlmIChhcnIubGVuZ3RoID09PSAwKSB7XG4gICAgYXJyID0gW1wiQ2FycmllclwiLCBcIkJhdHRsZXNoaXBcIiwgXCJDcnVpc2VyXCIsIFwiU3VibWFyaW5lXCIsIFwiRGVzdHJveWVyXCJdO1xuICAgIHB1Ymxpc2goXCJjZWxsQ2xpY2tcIik7XG4gIH1cbn07XG5cbi8qKlxuICogQ2hlY2tzIGlmIGNvcnJlY3QgbnVtYmVyIG9mIHNoaXBzIGhhdmUgYmVlbiBwbGFjZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBubyAtIE51bWJlciBvZiBzaGlwcyB0aGF0IHNob3VsZCBoYXZlIGJlZW4gcGxhY2VkXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5jb25zdCBhcmVTaGlwc1BsYWNlZCA9IChubykgPT4ge1xuICBpZiAoc2hpcHMubGVuZ3RoID4gNCkge1xuICAgIHNoaXBzID0gW107XG4gIH1cbiAgcGxheWVyMWJvYXJkLmdhbWVib2FyZC5mb3JFYWNoKChyb3cpID0+IHtcbiAgICByb3cuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgaWYgKChjZWxsICE9PSBudWxsKSAmIChjZWxsICE9PSBcIm1pc3NcIikpIHtcbiAgICAgICAgaWYgKCFzaGFyZVZhbHVlcyhzaGlwcywgW2NlbGwubmFtZV0pKSB7XG4gICAgICAgICAgc2hpcHMucHVzaChjZWxsLm5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICBpZiAoc2hpcHMubGVuZ3RoID09PSBubykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmV4cG9ydCB7IGdhbWUsIHR1cm4sIHNldFVwLCBhcmVTaGlwc1BsYWNlZCB9O1xuIiwiaW1wb3J0IHsgY3JlYXRlU2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcblxuLy8gQHRzLWNoZWNrXG5cbi8qKlxuICogQG1vZHVsZSBnYW1lYm9hcmRcbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgYSBnYW1lYm9hcmQgb2JqZWN0XG4gKiBAdHlwZSB7RnVuY3Rpb259XG4gKiBAbmFtZXNwYWNlIGNyZWF0ZUdhbWVib2FyZFxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5jb25zdCBjcmVhdGVHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIC8qKlxuICAgKiBAdHlwZSB7QXJyYXl9XG4gICAqIEBtZW1iZXJvZiBjcmVhdGVHYW1lYm9hcmRcbiAgICovXG4gIGxldCBzaGlwcyA9IFtdO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7QXJyYXk8QXJyYXk+fVxuICAgKiBAbWVtYmVyb2YgY3JlYXRlR2FtZWJvYXJkXG4gICAqL1xuICBjb25zdCBnYW1lYm9hcmQgPSBbW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW11dO1xuICBnYW1lYm9hcmQuZm9yRWFjaCgoYXJyKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBhcnIucHVzaChudWxsKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdHdvIGFycmF5cyBzaGFyZSB0aGUgc2FtZSB2YWx1ZVxuICAgKiBAcGFyYW0ge0FycmF5fSBiaWdBcnJcbiAgICogQHBhcmFtIHtBcnJheX0gYXJyXG4gICAqIEBtZW1iZXJvZiBjcmVhdGVHYW1lYm9hcmRcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG4gIGNvbnN0IHNoYXJlVmFsdWVzID0gKGJpZ0FyciwgYXJyKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiaWdBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSBiaWdBcnJbaV07XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFyci5sZW5ndGg7IGorKykge1xuICAgICAgICBjb25zdCBzbWFsbEN1cnJlbnQgPSBhcnJbal07XG4gICAgICAgIGlmIChjdXJyZW50LnNoaXBOYW1lID09PSBzbWFsbEN1cnJlbnQuc2hpcE5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgLyoqXG4gICAqIFBsYWNlcyBzaGlwcyBvbiBnYW1lYm9hcmRcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBOYW1lIG9mIHNoaXBcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aE9mU2hpcCAtIFNoaXAgbGVuZ3RoXG4gICAqIEBwYXJhbSB7QXJyYXk8TnVtYmVyPn0gY29vcmQgLSBDb29yZGluYXRlc1xuICAgKiBAcGFyYW0ge1N0cmluZ30gZGlyZWN0aW9uIC0gVmVydGljYWwgb3IgaG9yaXpvbnRhbCBhbGlnbm1lbnRcbiAgICogQG1lbWJlcm9mIGNyZWF0ZUdhbWVib2FyZFxuICAgKi9cbiAgY29uc3QgcGxhY2VTaGlwID0gKG5hbWUsIGxlbmd0aE9mU2hpcCwgY29vcmQsIGRpcmVjdGlvbiA9IFwieFwiKSA9PiB7XG4gICAgY29uc3QgbmV3U2hpcCA9IGNyZWF0ZVNoaXAobmFtZSwgbGVuZ3RoT2ZTaGlwKTtcbiAgICBpZiAoIXNoYXJlVmFsdWVzKHNoaXBzLCBbbmV3U2hpcF0pKSB7XG4gICAgICBjb25zdCBsZW5ndGggPSBuZXdTaGlwLnNoaXBMZW5ndGg7XG4gICAgICBjb25zdCBjb29yZGluYXRlcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcInhcIikge1xuICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2goW2Nvb3JkWzBdLCBjb29yZFsxXSArIGldKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKFtjb29yZFswXSArIGksIGNvb3JkWzFdXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgY29vcmRpbmF0ZXMuZXZlcnkoKGN1cnJlbnQpID0+IHtcbiAgICAgICAgICBpZiAoY3VycmVudFswXSA+IDkgfHwgY3VycmVudFsxXSA+IDkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGdhbWVib2FyZFtjdXJyZW50WzBdXVtjdXJyZW50WzFdXSA9PT0gbnVsbDtcbiAgICAgICAgfSlcbiAgICAgICkge1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBjb29yZGluYXRlcy5mb3JFYWNoKChjdXJyZW50KSA9PiB7XG4gICAgICAgICAgZ2FtZWJvYXJkW2N1cnJlbnRbMF1dW2N1cnJlbnRbMV1dID0ge1xuICAgICAgICAgICAgbmFtZTogbmV3U2hpcC5zaGlwTmFtZSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBpbmRleCxcbiAgICAgICAgICAgIGlzSGl0OiBuZXdTaGlwLmJvZHlbaW5kZXhdLFxuICAgICAgICAgIH07XG4gICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfSk7XG4gICAgICAgIHNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBBdHRhY2tzIGdhbWJlYm9hcmQgY2VsbFxuICAgKiBAcGFyYW0ge0FycmF5PE51bWJlcj59IGNvb3JkcyAtIGNlbGwgdG8gYXR0YWNrXG4gICAqIEBtZW1iZXJvZiBjcmVhdGVHYW1lYm9hcmRcbiAgICovXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmRzKSA9PiB7XG4gICAgaWYgKGdhbWVib2FyZFtjb29yZHNbMF1dW2Nvb3Jkc1sxXV0gPT09IG51bGwpIHtcbiAgICAgIGdhbWVib2FyZFtjb29yZHNbMF1dW2Nvb3Jkc1sxXV0gPSBcIm1pc3NcIjtcbiAgICB9IGVsc2UgaWYgKGdhbWVib2FyZFtjb29yZHNbMF1dW2Nvb3Jkc1sxXV0gIT09IFwibWlzc1wiKSB7XG4gICAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgIGlmIChnYW1lYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV1dLm5hbWUgPT09IHNoaXAuc2hpcE5hbWUpIHtcbiAgICAgICAgICBzaGlwLmhpdChnYW1lYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV1dLnBvc2l0aW9uKTtcbiAgICAgICAgICBnYW1lYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV1dLmlzSGl0ID1cbiAgICAgICAgICAgIHNoaXAuYm9keVtnYW1lYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV1dLnBvc2l0aW9uXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYWxsIHNoaXBzIGFyZSBzdW5rXG4gICAqIEBtZW1iZXJvZiBjcmVhdGVHYW1lYm9hcmRcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gLXRydWUgaWYgYWxsIHNoaXBzIGFyZSBzdW5rXG4gICAqL1xuICBjb25zdCBhbGxTdW5rID0gKCkgPT4ge1xuICAgIGNvbnN0IGJvb2xlYW4gPSBzaGlwcy5yZWR1Y2UoKGFjY3VtLCBzaGlwKSA9PiB7XG4gICAgICByZXR1cm4gYWNjdW0gJiYgc2hpcC5pc1N1bmsoKTtcbiAgICB9LCB0cnVlKTtcbiAgICByZXR1cm4gYm9vbGVhbjtcbiAgfTtcblxuICAvKipcbiAgICogQ2xlYXJzIGdhbWVib2FyZFxuICAgKiBAbWVtYmVyIGNyZWF0ZUdhbWVib2FyZFxuICAgKiBAZnVuY3Rpb25cbiAgICovXG4gIGNvbnN0IGNsZWFyU2hpcCA9ICgpID0+IHtcbiAgICBzaGlwcyA9IFtdO1xuICAgIGdhbWVib2FyZC5mb3JFYWNoKChhcnIpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICBhcnJbaV0gPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiB7IGdhbWVib2FyZCwgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrLCBhbGxTdW5rLCBjbGVhclNoaXAgfTtcbn07XG5cbmV4cG9ydCB7IGNyZWF0ZUdhbWVib2FyZCB9O1xuIiwiLyoqXG4gKiBAbW9kdWxlIHBsYXllclxuICovXG5cbi8qKlxuICogY3JlYXRlcyBQbGF5ZXJzXG4gKiBAcGFyYW0ge3N0cmluZ30gcGxheWVyXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAbmFtZXNwYWNlIGNyZWF0ZVBsYXllclxuICovXG5jb25zdCBjcmVhdGVQbGF5ZXIgPSAocGxheWVyID0gXCJodW1hblwiKSA9PiB7XG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgY3JlYXRlUGxheWVyXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAgbGV0IHR1cm4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBhdHRhY2tzIHNoaXBzXG4gICAqIEBmdW5jdGlvblxuICAgKiBAbWVtYmVyb2YgY3JlYXRlUGxheWVyXG4gICAqL1xuICBsZXQgYXR0YWNrO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICogQG1lbWJlcm9mIGNyZWF0ZVBsYXllclxuICAgKi9cbiAgbGV0IHZhbHVlID0gdHJ1ZTtcblxuICAvKipcbiAgICogQHR5cGUge0FycmF5PE51bWJlcj59XG4gICAqIEBtZW1iZXJvZiBjcmVhdGVQbGF5ZXJcbiAgICovXG4gIGxldCBoaXQ7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtBcnJheX1cbiAgICogQG1lbWJlcm9mIGNyZWF0ZVBsYXllclxuICAgKi9cbiAgbGV0IHRhcmdldHMgPSBbXTtcblxuICAvKipcbiAgICogQG1lbWJlcm9mIGNyZWF0ZVBsYXllclxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgY29uc3QgZ2V0VHVybiA9ICgpID0+IHtcbiAgICByZXR1cm4gdHVybjtcbiAgfTtcblxuICAvKipcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBtZW1iZXJvZiBjcmVhdGVQbGF5ZXJcbiAgICovXG4gIGNvbnN0IHRvZ2dsZVR1cm4gPSAoKSA9PiB7XG4gICAgdHVybiA9ICF0dXJuO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdHdvIGFycmF5cyBzaGFyZSB0aGUgc2FtZSB2YWx1ZVxuICAgKiBAcGFyYW0ge0FycmF5fSBiaWdBcnJcbiAgICogQHBhcmFtIHtBcnJheX0gYXJyXG4gICAqIEBtZW1iZXJvZiBjcmVhdGVQbGF5ZXJcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG4gIGNvbnN0IHNoYXJlVmFsdWVzID0gKGJpZ0FyciwgYXJyKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiaWdBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSBiaWdBcnJbaV07XG4gICAgICBpZiAoY3VycmVudFswXSA9PT0gYXJyWzBdICYmIGN1cnJlbnRbMV0gPT09IGFyclsxXSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGlmIChwbGF5ZXIgPT09IFwiaHVtYW5cIikge1xuICAgIGF0dGFjayA9IChib2FyZCwgY29vcmRzKSA9PiB7XG4gICAgICBib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3Jkcyk7XG4gICAgfTtcbiAgfSBlbHNlIGlmIChwbGF5ZXIgPT09IFwiQUlcIikge1xuICAgIGF0dGFjayA9IChib2FyZCkgPT4ge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGF2YWlsYWJsZSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmdhbWVib2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYm9hcmQuZ2FtZWJvYXJkW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGJvYXJkLmdhbWVib2FyZFtpXVtqXSA9PT0gbnVsbCB8fFxuICAgICAgICAgICAgICBib2FyZC5nYW1lYm9hcmRbaV1bal0uaXNIaXQgPT09IGZhbHNlXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgYXZhaWxhYmxlLnB1c2goW2ksIGpdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGF2YWlsYWJsZS5sZW5ndGgpO1xuICAgICAgICBib2FyZC5yZWNlaXZlQXR0YWNrKGF2YWlsYWJsZVt5XSk7XG4gICAgICAgIGNvbnN0IFtmaXJzdCwgc2Vjb25kXSA9IGF2YWlsYWJsZVt5XTtcbiAgICAgICAgaWYgKGJvYXJkLmdhbWVib2FyZFtmaXJzdF1bc2Vjb25kXS5uYW1lKSB7XG4gICAgICAgICAgdmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICBoaXQgPSBhdmFpbGFibGVbeV07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGF2YWlsYWJsZSA9IFtdO1xuICAgICAgICBjb25zdCBhdmFpbGFibGVUYXJnZXRzID0gKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IFt4LCB5XSA9IGhpdDtcbiAgICAgICAgICB0YXJnZXRzLnVuc2hpZnQoW3ggKyAxLCB5XSk7XG4gICAgICAgICAgdGFyZ2V0cy51bnNoaWZ0KFt4IC0gMSwgeV0pO1xuICAgICAgICAgIHRhcmdldHMudW5zaGlmdChbeCwgeSArIDFdKTtcbiAgICAgICAgICB0YXJnZXRzLnVuc2hpZnQoW3gsIHkgLSAxXSk7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYm9hcmQuZ2FtZWJvYXJkW3RhcmdldHNbaV1bMF1dICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgaWYgKGJvYXJkLmdhbWVib2FyZFt0YXJnZXRzW2ldWzBdXVt0YXJnZXRzW2ldWzFdXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgYm9hcmQuZ2FtZWJvYXJkW3RhcmdldHNbaV1bMF1dW3RhcmdldHNbaV1bMV1dID09PSBudWxsIHx8XG4gICAgICAgICAgICAgICAgICBib2FyZC5nYW1lYm9hcmRbdGFyZ2V0c1tpXVswXV1bdGFyZ2V0c1tpXVsxXV0uaXNIaXQgPT09IGZhbHNlXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoIXNoYXJlVmFsdWVzKGF2YWlsYWJsZSwgdGFyZ2V0c1tpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgYXZhaWxhYmxlLnB1c2godGFyZ2V0c1tpXSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBhdmFpbGFibGVUYXJnZXRzKCk7XG4gICAgICAgIGJvYXJkLnJlY2VpdmVBdHRhY2soYXZhaWxhYmxlWzBdKTtcbiAgICAgICAgaWYgKGJvYXJkLmdhbWVib2FyZFthdmFpbGFibGVbMF1bMF1dW2F2YWlsYWJsZVswXVsxXV0ubmFtZSkge1xuICAgICAgICAgIGhpdCA9IGF2YWlsYWJsZVswXTtcbiAgICAgICAgICBhdmFpbGFibGUuc2hpZnQoKTtcbiAgICAgICAgICBhdmFpbGFibGVUYXJnZXRzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXZhaWxhYmxlLnNoaWZ0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXZhaWxhYmxlLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgdmFsdWUgPSB0cnVlO1xuICAgICAgICAgIHRhcmdldHMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICByZXR1cm4geyBnZXRUdXJuLCB0b2dnbGVUdXJuLCBhdHRhY2sgfTtcbn07XG5cbmV4cG9ydCB7IGNyZWF0ZVBsYXllciB9O1xuIiwiLy8gQHRzLWNoZWNrXG5cbi8qKlxuICogQG1vZHVsZSBwdWJzdWJcbiAqL1xuXG4vKipcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuXG5jb25zdCBldmVudHMgPSB7fTtcblxuLyoqXG4gKiBTdWJzY3JpYmUgdG8gYW4gZXZlbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgLSBOYW1lIG9mIHRoZSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSBGdW5jdGlvbiB0byBiZSBjYWxsZWRcbiAqL1xuY29uc3Qgc3Vic2NyaWJlID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgZm4pIHtcbiAgZXZlbnRzW2V2ZW50TmFtZV0gPSBldmVudHNbZXZlbnROYW1lXSB8fCBbXTtcbiAgZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChmbik7XG59O1xuXG4vKipcbiAqIFVuc3VzY3JpYmUgZnJvbSBhbiBldmVudFxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSAtIE5hbWUgb2YgdGhlIGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIEZ1bmN0aW9uIHRvIGJlIHJlbW92ZWRcbiAqL1xuY29uc3QgdW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBmbikge1xuICBpZiAoZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50c1tldmVudE5hbWVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZXZlbnRzW2V2ZW50TmFtZV1baV0gPT09IGZuKSB7XG4gICAgICAgIGV2ZW50c1tldmVudE5hbWVdLnNwbGljZShpLCAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIFB1Ymxpc2ggYW4gZXZlbnRcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgLSBOYW1lIG9mIHRoZSBldmVudFxuICogQHBhcmFtIHsqfSBkYXRhIC1kYXRhIHRvIGJlIHBhc3NlZCBpbnRvIGNhbGxiYWNrXG4gKi9cbmNvbnN0IHB1Ymxpc2ggPSBmdW5jdGlvbiAoZXZlbnROYW1lLCAuLi5kYXRhKSB7XG4gIGlmIChldmVudHNbZXZlbnROYW1lXSkge1xuICAgIGV2ZW50c1tldmVudE5hbWVdLmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XG4gICAgICBmbihkYXRhWzBdLCBkYXRhWzFdLCBkYXRhWzJdLCBkYXRhWzNdKTtcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0IHsgcHVibGlzaCwgdW5zdWJzY3JpYmUsIHN1YnNjcmliZSB9O1xuIiwiLy8gQHRzLWNoZWNrXG5cbi8qKlxuICogQG1vZHVsZSBTaGlwXG4gKi9cbi8vIEB0cy1jaGVja1xuXG4vKipcbiAqIFNoaXAgZmFjdG9yeSBmdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGhcbiAqIEByZXR1cm4ge09iamVjdH0gLSBzaGlwIG9iamVjdFxuICovXG5jb25zdCBjcmVhdGVTaGlwID0gKG5hbWUsIGxlbmd0aCkgPT4ge1xuICBjb25zdCBzaGlwQm9keSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgc2hpcEJvZHkucHVzaChmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogQHR5cGUge09iamVjdH1cbiAgICogQG5hbWVzcGFjZSBTaGlwXG4gICAqL1xuICBjb25zdCBzaGlwID0ge1xuICAgIC8qKlxuICAgICAqIEBtZW1iZXJvZiBTaGlwXG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKi9cbiAgICBzaGlwTmFtZTogbmFtZSxcblxuICAgIC8qKlxuICAgICAqIEBtZW1iZXJvZiBTaGlwXG4gICAgICogQHR5cGUge0FycmF5fVxuICAgICAqL1xuICAgIGJvZHk6IHNoaXBCb2R5LFxuXG4gICAgLyoqXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBzaGlwTGVuZ3RoOiBzaGlwQm9keS5sZW5ndGgsXG5cbiAgICAvKipcbiAgICAgKiBAbWVtYmVyb2YgU2hpcFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCAtIHBsYWNlIHdoZXJlIHNoaXAgd2FzIGhpdFxuICAgICAqL1xuICAgIGhpdChpbmRleCkge1xuICAgICAgc2hpcEJvZHlbaW5kZXhdID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogY2hlY2tzIGlmIHNoaXAgaXMgc3Vua1xuICAgICAqIEBtZW1iZXJvZiBTaGlwXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1N1bmsoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBCb2R5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzaGlwQm9keVtpXSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gIH07XG4gIHJldHVybiBzaGlwO1xufTtcblxuZXhwb3J0IHsgY3JlYXRlU2hpcCB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9