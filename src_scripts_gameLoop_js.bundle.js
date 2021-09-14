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

const player1 = (0,_player__WEBPACK_IMPORTED_MODULE_0__.createPlayer)("human");
const player2 = (0,_player__WEBPACK_IMPORTED_MODULE_0__.createPlayer)("AI");
const player1board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.createGameboard)();
const player2board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.createGameboard)();
let arr = ["Carrier", "Battleship", "Cruiser", "Submarine", "Destroyer"];
let ships = [];

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
  aiPlaceShip(player2board);
  (0,_pubsub__WEBPACK_IMPORTED_MODULE_2__.publish)("displayGameboard", player1board.gameboard, "Player1");
  (0,_pubsub__WEBPACK_IMPORTED_MODULE_2__.publish)("displayGameboard", player2board.gameboard, "AI");
  player1.toggleTurn();
}

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

  // places ships on gameboard
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

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFVBQVU7QUFDckI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDhCQUE4QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsR0FBRztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFMkM7Ozs7Ozs7Ozs7Ozs7OztBQ25EM0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxzQkFBc0IscUJBQXFCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVzQiIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9nYW1lTG9vcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3B1YnN1Yi5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvc2hpcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IGNyZWF0ZUdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IHsgcHVibGlzaCwgc3Vic2NyaWJlLCB1bnN1YnNjcmliZSB9IGZyb20gXCIuL3B1YnN1YlwiO1xuXG4vLyBAdHMtY2hlY2tcblxuY29uc3QgcGxheWVyMSA9IGNyZWF0ZVBsYXllcihcImh1bWFuXCIpO1xuY29uc3QgcGxheWVyMiA9IGNyZWF0ZVBsYXllcihcIkFJXCIpO1xuY29uc3QgcGxheWVyMWJvYXJkID0gY3JlYXRlR2FtZWJvYXJkKCk7XG5jb25zdCBwbGF5ZXIyYm9hcmQgPSBjcmVhdGVHYW1lYm9hcmQoKTtcbmxldCBhcnIgPSBbXCJDYXJyaWVyXCIsIFwiQmF0dGxlc2hpcFwiLCBcIkNydWlzZXJcIiwgXCJTdWJtYXJpbmVcIiwgXCJEZXN0cm95ZXJcIl07XG5sZXQgc2hpcHMgPSBbXTtcblxuLyoqXG4gKiBAbW9kdWxlIGdhbWVMb29wXG4gKi9cblxuY29uc3Qgc2hhcmVWYWx1ZXMgPSAoYmlnQXJyLCBhcnIpID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBiaWdBcnIubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjdXJyZW50ID0gYmlnQXJyW2ldO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgYXJyLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBzbWFsbEN1cnJlbnQgPSBhcnJbal07XG4gICAgICBpZiAoY3VycmVudFswXSA9PT0gc21hbGxDdXJyZW50WzBdICYmIGN1cnJlbnRbMV0gPT09IHNtYWxsQ3VycmVudFsxXSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuY29uc3QgYWlQbGFjZVNoaXAgPSAoZ2FtZWJvYXJkKSA9PiB7XG4gIGNvbnN0IGNvb3JkcyA9IFtdO1xuICBjb25zdCBkaXJlY3Rpb25zID0gW107XG4gIGNvbnN0IHJhbmRvbSA9IChsZW5ndGgpID0+IHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwIC0gbGVuZ3RoKSk7XG4gIH07XG5cbiAgLy8gZmluZHMgcmFuZG9tIGNvb3JkaW5hdGVzIHdoaWNoIHNhdGlzZnkgdGhlIGNvbmRpdGlvbnNcbiAgY29uc3QgZmluZFJhbmRvbSA9IChsZW5ndGgsIGRpcmVjdGlvbikgPT4ge1xuICAgIGxldCBjb29yZDE7XG4gICAgbGV0IGNvb3JkMjtcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcInhcIikge1xuICAgICAgY29vcmQxID0gcmFuZG9tKDApO1xuICAgICAgY29vcmQyID0gcmFuZG9tKGxlbmd0aCk7XG4gICAgfVxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwieVwiKSB7XG4gICAgICBjb29yZDEgPSByYW5kb20obGVuZ3RoKTtcbiAgICAgIGNvb3JkMiA9IHJhbmRvbSgwKTtcbiAgICB9XG4gICAgY29uc3Qgc2Vjb25kQ29vcmRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ4XCIpIHtcbiAgICAgICAgc2Vjb25kQ29vcmRzLnB1c2goW2Nvb3JkMSwgY29vcmQyICsgaV0pO1xuICAgICAgfVxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ5XCIpIHtcbiAgICAgICAgc2Vjb25kQ29vcmRzLnB1c2goW2Nvb3JkMSArIGksIGNvb3JkMl0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXNoYXJlVmFsdWVzKGNvb3Jkcywgc2Vjb25kQ29vcmRzKSkge1xuICAgICAgZm9yIChsZXQgaSA9IC0xOyBpIDw9IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwieFwiKSB7XG4gICAgICAgICAgY29vcmRzLnB1c2goW2Nvb3JkMSwgY29vcmQyICsgaV0pO1xuICAgICAgICAgIGNvb3Jkcy5wdXNoKFtjb29yZDEgKyAxLCBjb29yZDIgKyBpXSk7XG4gICAgICAgICAgY29vcmRzLnB1c2goW2Nvb3JkMSAtIDEsIGNvb3JkMiArIGldKTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwieVwiKSB7XG4gICAgICAgICAgY29vcmRzLnB1c2goW2Nvb3JkMSArIGksIGNvb3JkMl0pO1xuICAgICAgICAgIGNvb3Jkcy5wdXNoKFtjb29yZDEgKyBpLCBjb29yZDIgKyAxXSk7XG4gICAgICAgICAgY29vcmRzLnB1c2goW2Nvb3JkMSArIGksIGNvb3JkMiAtIDFdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIFtjb29yZDEsIGNvb3JkMl07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmaW5kUmFuZG9tKGxlbmd0aCwgZGlyZWN0aW9uKTtcbiAgICB9XG4gIH07XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICBjb25zdCByYW5kID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTEpO1xuICAgIGlmIChyYW5kID4gNSkge1xuICAgICAgZGlyZWN0aW9ucy5wdXNoKFwieVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0aW9ucy5wdXNoKFwieFwiKTtcbiAgICB9XG4gIH1cblxuICBnYW1lYm9hcmQucGxhY2VTaGlwKFxuICAgIFwiQ2FycmllclwiLFxuICAgIDUsXG4gICAgZmluZFJhbmRvbSg1LCBkaXJlY3Rpb25zWzBdKSxcbiAgICBkaXJlY3Rpb25zWzBdXG4gICk7XG4gIGdhbWVib2FyZC5wbGFjZVNoaXAoXG4gICAgXCJCYXR0bGVzaGlwXCIsXG4gICAgNCxcbiAgICBmaW5kUmFuZG9tKDQsIGRpcmVjdGlvbnNbMV0pLFxuICAgIGRpcmVjdGlvbnNbMV1cbiAgKTtcbiAgZ2FtZWJvYXJkLnBsYWNlU2hpcChcbiAgICBcIkNydWlzZXJcIixcbiAgICAzLFxuICAgIGZpbmRSYW5kb20oMywgZGlyZWN0aW9uc1syXSksXG4gICAgZGlyZWN0aW9uc1syXVxuICApO1xuICBnYW1lYm9hcmQucGxhY2VTaGlwKFxuICAgIFwiU3VibWFyaW5lXCIsXG4gICAgMyxcbiAgICBmaW5kUmFuZG9tKDMsIGRpcmVjdGlvbnNbM10pLFxuICAgIGRpcmVjdGlvbnNbM11cbiAgKTtcbiAgZ2FtZWJvYXJkLnBsYWNlU2hpcChcbiAgICBcIkRlc3Ryb3llclwiLFxuICAgIDIsXG4gICAgZmluZFJhbmRvbSgyLCBkaXJlY3Rpb25zWzRdKSxcbiAgICBkaXJlY3Rpb25zWzRdXG4gICk7XG59O1xuXG5jb25zdCBnYW1lT3ZlciA9ICgpID0+IHtcbiAgcHVibGlzaChcInJlbW92ZUNlbGxDbGlja1wiKTtcbiAgaWYgKHBsYXllcjFib2FyZC5hbGxTdW5rKCkpIHtcbiAgICBwdWJsaXNoKFwiZ2FtZU92ZXJcIiwgXCJBSSBoYXMgd29uIHRoZSBnYW1lXCIpO1xuICB9IGVsc2Uge1xuICAgIHB1Ymxpc2goXCJnYW1lT3ZlclwiLCBcIlBsYXllcjEgaGFzIHdvbiB0aGUgZ2FtZVwiKTtcbiAgfVxuICBwbGF5ZXIxYm9hcmQuY2xlYXJTaGlwKCk7XG4gIHBsYXllcjJib2FyZC5jbGVhclNoaXAoKTtcbiAgdW5zdWJzY3JpYmUoXCJuZXdUdXJuXCIsIHR1cm4pO1xuICBzdWJzY3JpYmUoXCJyZXN0YXJ0XCIsIGdhbWUpO1xuICBwdWJsaXNoKFwibmV3R2FtZVwiKTtcbn07XG5cbmNvbnN0IHR1cm4gPSAoY29vcmRzKSA9PiB7XG4gIHBsYXllcjEudG9nZ2xlVHVybigpO1xuICBwbGF5ZXIyLnRvZ2dsZVR1cm4oKTtcbiAgcGxheWVyMS5hdHRhY2socGxheWVyMmJvYXJkLCBjb29yZHMpO1xuICBwdWJsaXNoKFwiZGlzcGxheUdhbWVib2FyZFwiLCBwbGF5ZXIyYm9hcmQuZ2FtZWJvYXJkLCBcIkFJXCIpO1xuICBpZiAocGxheWVyMWJvYXJkLmFsbFN1bmsoKSB8fCBwbGF5ZXIyYm9hcmQuYWxsU3VuaygpKSB7XG4gICAgZ2FtZU92ZXIoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgcGxheWVyMi5hdHRhY2socGxheWVyMWJvYXJkKTtcbiAgcHVibGlzaChcImRpc3BsYXlHYW1lYm9hcmRcIiwgcGxheWVyMWJvYXJkLmdhbWVib2FyZCwgXCJQbGF5ZXIxXCIpO1xuICBpZiAocGxheWVyMWJvYXJkLmFsbFN1bmsoKSB8fCBwbGF5ZXIyYm9hcmQuYWxsU3VuaygpKSB7XG4gICAgZ2FtZU92ZXIoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTdGFydHMgZ2FtZVxuICogQGNhbGxiYWNrXG4gKi9cbmZ1bmN0aW9uIGdhbWUoKSB7XG4gIHN1YnNjcmliZShcIm5ld1R1cm5cIiwgdHVybik7XG4gIGFpUGxhY2VTaGlwKHBsYXllcjJib2FyZCk7XG4gIHB1Ymxpc2goXCJkaXNwbGF5R2FtZWJvYXJkXCIsIHBsYXllcjFib2FyZC5nYW1lYm9hcmQsIFwiUGxheWVyMVwiKTtcbiAgcHVibGlzaChcImRpc3BsYXlHYW1lYm9hcmRcIiwgcGxheWVyMmJvYXJkLmdhbWVib2FyZCwgXCJBSVwiKTtcbiAgcGxheWVyMS50b2dnbGVUdXJuKCk7XG59XG5cbmNvbnN0IHNldFVwID0gKGxlbmd0aCwgY29vcmQsIGRpciwgZWxlbWVudCkgPT4ge1xuICBjb25zdCBuZXdDb29yZCA9IFsuLi5jb29yZF07XG4gIGlmIChkaXIgPT09IFwieVwiKSB7XG4gICAgbmV3Q29vcmRbMF0gPSBuZXdDb29yZFswXSAtIGVsZW1lbnQ7XG4gICAgcGxheWVyMWJvYXJkLnBsYWNlU2hpcChhcnJbMF0sIGxlbmd0aCwgbmV3Q29vcmQsIGRpcik7XG4gIH0gZWxzZSB7XG4gICAgbmV3Q29vcmRbMV0gPSBuZXdDb29yZFsxXSAtIGVsZW1lbnQ7XG4gICAgcGxheWVyMWJvYXJkLnBsYWNlU2hpcChhcnJbMF0sIGxlbmd0aCwgbmV3Q29vcmQsIGRpcik7XG4gIH1cbiAgcHVibGlzaChcImRpc3BsYXlHYW1lYm9hcmRcIiwgcGxheWVyMWJvYXJkLmdhbWVib2FyZCwgXCJQbGF5ZXIxXCIpO1xuICBhcnIuc2hpZnQoKTtcbiAgaWYgKGFyci5sZW5ndGggPT09IDApIHtcbiAgICBhcnIgPSBbXCJDYXJyaWVyXCIsIFwiQmF0dGxlc2hpcFwiLCBcIkNydWlzZXJcIiwgXCJTdWJtYXJpbmVcIiwgXCJEZXN0cm95ZXJcIl07XG4gICAgcHVibGlzaChcImNlbGxDbGlja1wiKTtcbiAgfVxufTtcblxuY29uc3QgYXJlU2hpcHNQbGFjZWQgPSAobm8pID0+IHtcbiAgaWYgKHNoaXBzLmxlbmd0aCA+IDQpIHtcbiAgICBzaGlwcyA9IFtdO1xuICB9XG4gIHBsYXllcjFib2FyZC5nYW1lYm9hcmQuZm9yRWFjaCgocm93KSA9PiB7XG4gICAgcm93LmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIGlmICgoY2VsbCAhPT0gbnVsbCkgJiAoY2VsbCAhPT0gXCJtaXNzXCIpKSB7XG4gICAgICAgIGlmICghc2hhcmVWYWx1ZXMoc2hpcHMsIFtjZWxsLm5hbWVdKSkge1xuICAgICAgICAgIHNoaXBzLnB1c2goY2VsbC5uYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgaWYgKHNoaXBzLmxlbmd0aCA9PT0gbm8pIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5leHBvcnQgeyBnYW1lLCB0dXJuLCBzZXRVcCwgYXJlU2hpcHNQbGFjZWQgfTtcbiIsImltcG9ydCB7IGNyZWF0ZVNoaXAgfSBmcm9tIFwiLi9zaGlwXCI7XG5cbi8vIEB0cy1jaGVja1xuXG4vKipcbiAqIEBtb2R1bGUgZ2FtZWJvYXJkXG4gKi9cblxuLyoqXG4gKiBDcmVhdGVzIGEgZ2FtZWJvYXJkIG9iamVjdFxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5jb25zdCBjcmVhdGVHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGxldCBzaGlwcyA9IFtdO1xuICBjb25zdCBnYW1lYm9hcmQgPSBbW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW11dO1xuICBnYW1lYm9hcmQuZm9yRWFjaCgoYXJyKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBhcnIucHVzaChudWxsKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IHNoYXJlVmFsdWVzID0gKGJpZ0FyciwgYXJyKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiaWdBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSBiaWdBcnJbaV07XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFyci5sZW5ndGg7IGorKykge1xuICAgICAgICBjb25zdCBzbWFsbEN1cnJlbnQgPSBhcnJbal07XG4gICAgICAgIGlmIChjdXJyZW50LnNoaXBOYW1lID09PSBzbWFsbEN1cnJlbnQuc2hpcE5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgLy8gcGxhY2VzIHNoaXBzIG9uIGdhbWVib2FyZFxuICBjb25zdCBwbGFjZVNoaXAgPSAobmFtZSwgbGVuZ3RoT2ZTaGlwLCBjb29yZCwgZGlyZWN0aW9uID0gXCJ4XCIpID0+IHtcbiAgICBjb25zdCBuZXdTaGlwID0gY3JlYXRlU2hpcChuYW1lLCBsZW5ndGhPZlNoaXApO1xuICAgIGlmICghc2hhcmVWYWx1ZXMoc2hpcHMsIFtuZXdTaGlwXSkpIHtcbiAgICAgIGNvbnN0IGxlbmd0aCA9IG5ld1NoaXAuc2hpcExlbmd0aDtcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwieFwiKSB7XG4gICAgICAgICAgY29vcmRpbmF0ZXMucHVzaChbY29vcmRbMF0sIGNvb3JkWzFdICsgaV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2goW2Nvb3JkWzBdICsgaSwgY29vcmRbMV1dKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBjb29yZGluYXRlcy5ldmVyeSgoY3VycmVudCkgPT4ge1xuICAgICAgICAgIGlmIChjdXJyZW50WzBdID4gOSB8fCBjdXJyZW50WzFdID4gOSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZ2FtZWJvYXJkW2N1cnJlbnRbMF1dW2N1cnJlbnRbMV1dID09PSBudWxsO1xuICAgICAgICB9KVxuICAgICAgKSB7XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIGNvb3JkaW5hdGVzLmZvckVhY2goKGN1cnJlbnQpID0+IHtcbiAgICAgICAgICBnYW1lYm9hcmRbY3VycmVudFswXV1bY3VycmVudFsxXV0gPSB7XG4gICAgICAgICAgICBuYW1lOiBuZXdTaGlwLnNoaXBOYW1lLFxuICAgICAgICAgICAgcG9zaXRpb246IGluZGV4LFxuICAgICAgICAgICAgaXNIaXQ6IG5ld1NoaXAuYm9keVtpbmRleF0sXG4gICAgICAgICAgfTtcbiAgICAgICAgICBpbmRleCsrO1xuICAgICAgICB9KTtcbiAgICAgICAgc2hpcHMucHVzaChuZXdTaGlwKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gcmVjZWl2ZXMgYXR0YWNrc1xuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKGNvb3JkcykgPT4ge1xuICAgIGlmIChnYW1lYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV1dID09PSBudWxsKSB7XG4gICAgICBnYW1lYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV1dID0gXCJtaXNzXCI7XG4gICAgfSBlbHNlIGlmIChnYW1lYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV1dICE9PSBcIm1pc3NcIikge1xuICAgICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICBpZiAoZ2FtZWJvYXJkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXS5uYW1lID09PSBzaGlwLnNoaXBOYW1lKSB7XG4gICAgICAgICAgc2hpcC5oaXQoZ2FtZWJvYXJkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXS5wb3NpdGlvbik7XG4gICAgICAgICAgZ2FtZWJvYXJkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXS5pc0hpdCA9XG4gICAgICAgICAgICBzaGlwLmJvZHlbZ2FtZWJvYXJkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXS5wb3NpdGlvbl07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAvLyBjaGVja3MgaWYgYWxsIHNoaXBzIGFyZSBzdW5rXG4gIGNvbnN0IGFsbFN1bmsgPSAoKSA9PiB7XG4gICAgY29uc3QgYm9vbGVhbiA9IHNoaXBzLnJlZHVjZSgoYWNjdW0sIHNoaXApID0+IHtcbiAgICAgIHJldHVybiBhY2N1bSAmJiBzaGlwLmlzU3VuaygpO1xuICAgIH0sIHRydWUpO1xuICAgIHJldHVybiBib29sZWFuO1xuICB9O1xuXG4gIGNvbnN0IGNsZWFyU2hpcCA9ICgpID0+IHtcbiAgICBzaGlwcyA9IFtdO1xuICAgIGdhbWVib2FyZC5mb3JFYWNoKChhcnIpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICBhcnJbaV0gPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiB7IGdhbWVib2FyZCwgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrLCBhbGxTdW5rLCBjbGVhclNoaXAgfTtcbn07XG5cbmV4cG9ydCB7IGNyZWF0ZUdhbWVib2FyZCB9O1xuIiwiLyoqXG4gKiBAbW9kdWxlIHBsYXllclxuICovXG5cbi8qKlxuICogY3JlYXRlcyBQbGF5ZXJzXG4gKiBAcGFyYW0ge3N0cmluZ30gcGxheWVyXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmNvbnN0IGNyZWF0ZVBsYXllciA9IChwbGF5ZXIgPSBcImh1bWFuXCIpID0+IHtcbiAgbGV0IHR1cm4gPSB0cnVlO1xuICBsZXQgYXR0YWNrO1xuICBsZXQgdmFsdWUgPSB0cnVlO1xuICBsZXQgaGl0O1xuICBsZXQgdGFyZ2V0cyA9IFtdO1xuXG4gIGNvbnN0IGdldFR1cm4gPSAoKSA9PiB7XG4gICAgcmV0dXJuIHR1cm47XG4gIH07XG5cbiAgY29uc3QgdG9nZ2xlVHVybiA9ICgpID0+IHtcbiAgICB0dXJuID0gIXR1cm47XG4gIH07XG5cbiAgY29uc3Qgc2hhcmVWYWx1ZXMgPSAoYmlnQXJyLCBhcnIpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJpZ0Fyci5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgY3VycmVudCA9IGJpZ0FycltpXTtcbiAgICAgIGlmIChjdXJyZW50WzBdID09PSBhcnJbMF0gJiYgY3VycmVudFsxXSA9PT0gYXJyWzFdKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgaWYgKHBsYXllciA9PT0gXCJodW1hblwiKSB7XG4gICAgYXR0YWNrID0gKGJvYXJkLCBjb29yZHMpID0+IHtcbiAgICAgIGJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRzKTtcbiAgICB9O1xuICB9IGVsc2UgaWYgKHBsYXllciA9PT0gXCJBSVwiKSB7XG4gICAgYXR0YWNrID0gKGJvYXJkKSA9PiB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgY29uc3QgYXZhaWxhYmxlID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQuZ2FtZWJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBib2FyZC5nYW1lYm9hcmRbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgYm9hcmQuZ2FtZWJvYXJkW2ldW2pdID09PSBudWxsIHx8XG4gICAgICAgICAgICAgIGJvYXJkLmdhbWVib2FyZFtpXVtqXS5pc0hpdCA9PT0gZmFsc2VcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBhdmFpbGFibGUucHVzaChbaSwgal0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXZhaWxhYmxlLmxlbmd0aCk7XG4gICAgICAgIGJvYXJkLnJlY2VpdmVBdHRhY2soYXZhaWxhYmxlW3ldKTtcbiAgICAgICAgY29uc3QgW2ZpcnN0LCBzZWNvbmRdID0gYXZhaWxhYmxlW3ldO1xuICAgICAgICBpZiAoYm9hcmQuZ2FtZWJvYXJkW2ZpcnN0XVtzZWNvbmRdLm5hbWUpIHtcbiAgICAgICAgICB2YWx1ZSA9IGZhbHNlO1xuICAgICAgICAgIGhpdCA9IGF2YWlsYWJsZVt5XTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgYXZhaWxhYmxlID0gW107XG4gICAgICAgIGNvbnN0IGF2YWlsYWJsZVRhcmdldHMgPSAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgW3gsIHldID0gaGl0O1xuICAgICAgICAgIHRhcmdldHMudW5zaGlmdChbeCArIDEsIHldKTtcbiAgICAgICAgICB0YXJnZXRzLnVuc2hpZnQoW3ggLSAxLCB5XSk7XG4gICAgICAgICAgdGFyZ2V0cy51bnNoaWZ0KFt4LCB5ICsgMV0pO1xuICAgICAgICAgIHRhcmdldHMudW5zaGlmdChbeCwgeSAtIDFdKTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhcmdldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChib2FyZC5nYW1lYm9hcmRbdGFyZ2V0c1tpXVswXV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBpZiAoYm9hcmQuZ2FtZWJvYXJkW3RhcmdldHNbaV1bMF1dW3RhcmdldHNbaV1bMV1dICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICBib2FyZC5nYW1lYm9hcmRbdGFyZ2V0c1tpXVswXV1bdGFyZ2V0c1tpXVsxXV0gPT09IG51bGwgfHxcbiAgICAgICAgICAgICAgICAgIGJvYXJkLmdhbWVib2FyZFt0YXJnZXRzW2ldWzBdXVt0YXJnZXRzW2ldWzFdXS5pc0hpdCA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIGlmICghc2hhcmVWYWx1ZXMoYXZhaWxhYmxlLCB0YXJnZXRzW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICBhdmFpbGFibGUucHVzaCh0YXJnZXRzW2ldKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGF2YWlsYWJsZVRhcmdldHMoKTtcbiAgICAgICAgYm9hcmQucmVjZWl2ZUF0dGFjayhhdmFpbGFibGVbMF0pO1xuICAgICAgICBpZiAoYm9hcmQuZ2FtZWJvYXJkW2F2YWlsYWJsZVswXVswXV1bYXZhaWxhYmxlWzBdWzFdXS5uYW1lKSB7XG4gICAgICAgICAgaGl0ID0gYXZhaWxhYmxlWzBdO1xuICAgICAgICAgIGF2YWlsYWJsZS5zaGlmdCgpO1xuICAgICAgICAgIGF2YWlsYWJsZVRhcmdldHMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhdmFpbGFibGUuc2hpZnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhdmFpbGFibGUubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgICB2YWx1ZSA9IHRydWU7XG4gICAgICAgICAgdGFyZ2V0cyA9IFtdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7IGdldFR1cm4sIHRvZ2dsZVR1cm4sIGF0dGFjayB9O1xufTtcblxuZXhwb3J0IHsgY3JlYXRlUGxheWVyIH07XG4iLCIvLyBAdHMtY2hlY2tcblxuLyoqXG4gKiBAbW9kdWxlIHB1YnN1YlxuICovXG5cbi8qKlxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5cbmNvbnN0IGV2ZW50cyA9IHt9O1xuXG4vKipcbiAqIFN1YnNjcmliZSB0byBhbiBldmVudFxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSAtIE5hbWUgb2YgdGhlIGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIEZ1bmN0aW9uIHRvIGJlIGNhbGxlZFxuICovXG5jb25zdCBzdWJzY3JpYmUgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBmbikge1xuICBldmVudHNbZXZlbnROYW1lXSA9IGV2ZW50c1tldmVudE5hbWVdIHx8IFtdO1xuICBldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKTtcbn07XG5cbi8qKlxuICogVW5zdXNjcmliZSBmcm9tIGFuIGV2ZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIC0gTmFtZSBvZiB0aGUgZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gRnVuY3Rpb24gdG8gYmUgcmVtb3ZlZFxuICovXG5jb25zdCB1bnN1YnNjcmliZSA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGZuKSB7XG4gIGlmIChldmVudHNbZXZlbnROYW1lXSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnRzW2V2ZW50TmFtZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChldmVudHNbZXZlbnROYW1lXVtpXSA9PT0gZm4pIHtcbiAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0uc3BsaWNlKGksIDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogUHVibGlzaCBhbiBldmVudFxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSAtIE5hbWUgb2YgdGhlIGV2ZW50XG4gKiBAcGFyYW0geyp9IGRhdGEgLWRhdGEgdG8gYmUgcGFzc2VkIGludG8gY2FsbGJhY2tcbiAqL1xuY29uc3QgcHVibGlzaCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIC4uLmRhdGEpIHtcbiAgaWYgKGV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgZXZlbnRzW2V2ZW50TmFtZV0uZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICAgIGZuKGRhdGFbMF0sIGRhdGFbMV0sIGRhdGFbMl0sIGRhdGFbM10pO1xuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgeyBwdWJsaXNoLCB1bnN1YnNjcmliZSwgc3Vic2NyaWJlIH07XG4iLCIvLyBAdHMtY2hlY2tcblxuLyoqXG4gKiBAbW9kdWxlIFNoaXBcbiAqL1xuLy8gQHRzLWNoZWNrXG5cbi8qKlxuICogU2hpcCBmYWN0b3J5IGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aFxuICogQHJldHVybiB7T2JqZWN0fSAtIHNoaXAgb2JqZWN0XG4gKi9cbmNvbnN0IGNyZWF0ZVNoaXAgPSAobmFtZSwgbGVuZ3RoKSA9PiB7XG4gIGNvbnN0IHNoaXBCb2R5ID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBzaGlwQm9keS5wdXNoKGZhbHNlKTtcbiAgfVxuICBjb25zdCBzaGlwID0ge1xuICAgIHNoaXBOYW1lOiBuYW1lLFxuICAgIGJvZHk6IHNoaXBCb2R5LFxuICAgIHNoaXBMZW5ndGg6IHNoaXBCb2R5Lmxlbmd0aCxcbiAgICBoaXQoaW5kZXgpIHtcbiAgICAgIHNoaXBCb2R5W2luZGV4XSA9IHRydWU7XG4gICAgfSxcbiAgICBpc1N1bmsoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBCb2R5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzaGlwQm9keVtpXSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gIH07XG4gIHJldHVybiBzaGlwO1xufTtcblxuZXhwb3J0IHsgY3JlYXRlU2hpcCB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9