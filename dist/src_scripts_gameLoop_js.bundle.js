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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQSxrQkFBa0IsWUFBWTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0Esc0JBQXNCLHFCQUFxQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFc0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZ2FtZUxvb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3NoaXAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBjcmVhdGVHYW1lYm9hcmQgfSBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcbmltcG9ydCB7IHB1Ymxpc2gsIHN1YnNjcmliZSwgdW5zdWJzY3JpYmUgfSBmcm9tIFwiLi9wdWJzdWJcIjtcblxuLy8gQHRzLWNoZWNrXG5cbmNvbnN0IHBsYXllcjEgPSBjcmVhdGVQbGF5ZXIoXCJodW1hblwiKTtcbmNvbnN0IHBsYXllcjIgPSBjcmVhdGVQbGF5ZXIoXCJBSVwiKTtcbmNvbnN0IHBsYXllcjFib2FyZCA9IGNyZWF0ZUdhbWVib2FyZCgpO1xuY29uc3QgcGxheWVyMmJvYXJkID0gY3JlYXRlR2FtZWJvYXJkKCk7XG5sZXQgYXJyID0gW1wiQ2FycmllclwiLCBcIkJhdHRsZXNoaXBcIiwgXCJDcnVpc2VyXCIsIFwiU3VibWFyaW5lXCIsIFwiRGVzdHJveWVyXCJdO1xubGV0IHNoaXBzID0gW107XG5cbi8qKlxuICogQG1vZHVsZSBnYW1lTG9vcFxuICovXG5cbmNvbnN0IHNoYXJlVmFsdWVzID0gKGJpZ0FyciwgYXJyKSA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYmlnQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY3VycmVudCA9IGJpZ0FycltpXTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFyci5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3Qgc21hbGxDdXJyZW50ID0gYXJyW2pdO1xuICAgICAgaWYgKGN1cnJlbnRbMF0gPT09IHNtYWxsQ3VycmVudFswXSAmJiBjdXJyZW50WzFdID09PSBzbWFsbEN1cnJlbnRbMV0pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IGFpUGxhY2VTaGlwID0gKGdhbWVib2FyZCkgPT4ge1xuICBjb25zdCBjb29yZHMgPSBbXTtcbiAgY29uc3QgZGlyZWN0aW9ucyA9IFtdO1xuICBjb25zdCByYW5kb20gPSAobGVuZ3RoKSA9PiB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMCAtIGxlbmd0aCkpO1xuICB9O1xuXG4gIC8vIGZpbmRzIHJhbmRvbSBjb29yZGluYXRlcyB3aGljaCBzYXRpc2Z5IHRoZSBjb25kaXRpb25zXG4gIGNvbnN0IGZpbmRSYW5kb20gPSAobGVuZ3RoLCBkaXJlY3Rpb24pID0+IHtcbiAgICBsZXQgY29vcmQxO1xuICAgIGxldCBjb29yZDI7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ4XCIpIHtcbiAgICAgIGNvb3JkMSA9IHJhbmRvbSgwKTtcbiAgICAgIGNvb3JkMiA9IHJhbmRvbShsZW5ndGgpO1xuICAgIH1cbiAgICBpZiAoZGlyZWN0aW9uID09PSBcInlcIikge1xuICAgICAgY29vcmQxID0gcmFuZG9tKGxlbmd0aCk7XG4gICAgICBjb29yZDIgPSByYW5kb20oMCk7XG4gICAgfVxuICAgIGNvbnN0IHNlY29uZENvb3JkcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwieFwiKSB7XG4gICAgICAgIHNlY29uZENvb3Jkcy5wdXNoKFtjb29yZDEsIGNvb3JkMiArIGldKTtcbiAgICAgIH1cbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwieVwiKSB7XG4gICAgICAgIHNlY29uZENvb3Jkcy5wdXNoKFtjb29yZDEgKyBpLCBjb29yZDJdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFzaGFyZVZhbHVlcyhjb29yZHMsIHNlY29uZENvb3JkcykpIHtcbiAgICAgIGZvciAobGV0IGkgPSAtMTsgaSA8PSBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcInhcIikge1xuICAgICAgICAgIGNvb3Jkcy5wdXNoKFtjb29yZDEsIGNvb3JkMiArIGldKTtcbiAgICAgICAgICBjb29yZHMucHVzaChbY29vcmQxICsgMSwgY29vcmQyICsgaV0pO1xuICAgICAgICAgIGNvb3Jkcy5wdXNoKFtjb29yZDEgLSAxLCBjb29yZDIgKyBpXSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcInlcIikge1xuICAgICAgICAgIGNvb3Jkcy5wdXNoKFtjb29yZDEgKyBpLCBjb29yZDJdKTtcbiAgICAgICAgICBjb29yZHMucHVzaChbY29vcmQxICsgaSwgY29vcmQyICsgMV0pO1xuICAgICAgICAgIGNvb3Jkcy5wdXNoKFtjb29yZDEgKyBpLCBjb29yZDIgLSAxXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBbY29vcmQxLCBjb29yZDJdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmluZFJhbmRvbShsZW5ndGgsIGRpcmVjdGlvbik7XG4gICAgfVxuICB9O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgY29uc3QgcmFuZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDExKTtcbiAgICBpZiAocmFuZCA+IDUpIHtcbiAgICAgIGRpcmVjdGlvbnMucHVzaChcInlcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdGlvbnMucHVzaChcInhcIik7XG4gICAgfVxuICB9XG5cbiAgZ2FtZWJvYXJkLnBsYWNlU2hpcChcbiAgICBcIkNhcnJpZXJcIixcbiAgICA1LFxuICAgIGZpbmRSYW5kb20oNSwgZGlyZWN0aW9uc1swXSksXG4gICAgZGlyZWN0aW9uc1swXVxuICApO1xuICBnYW1lYm9hcmQucGxhY2VTaGlwKFxuICAgIFwiQmF0dGxlc2hpcFwiLFxuICAgIDQsXG4gICAgZmluZFJhbmRvbSg0LCBkaXJlY3Rpb25zWzFdKSxcbiAgICBkaXJlY3Rpb25zWzFdXG4gICk7XG4gIGdhbWVib2FyZC5wbGFjZVNoaXAoXG4gICAgXCJDcnVpc2VyXCIsXG4gICAgMyxcbiAgICBmaW5kUmFuZG9tKDMsIGRpcmVjdGlvbnNbMl0pLFxuICAgIGRpcmVjdGlvbnNbMl1cbiAgKTtcbiAgZ2FtZWJvYXJkLnBsYWNlU2hpcChcbiAgICBcIlN1Ym1hcmluZVwiLFxuICAgIDMsXG4gICAgZmluZFJhbmRvbSgzLCBkaXJlY3Rpb25zWzNdKSxcbiAgICBkaXJlY3Rpb25zWzNdXG4gICk7XG4gIGdhbWVib2FyZC5wbGFjZVNoaXAoXG4gICAgXCJEZXN0cm95ZXJcIixcbiAgICAyLFxuICAgIGZpbmRSYW5kb20oMiwgZGlyZWN0aW9uc1s0XSksXG4gICAgZGlyZWN0aW9uc1s0XVxuICApO1xufTtcblxuY29uc3QgZ2FtZU92ZXIgPSAoKSA9PiB7XG4gIHB1Ymxpc2goXCJyZW1vdmVDZWxsQ2xpY2tcIik7XG4gIGlmIChwbGF5ZXIxYm9hcmQuYWxsU3VuaygpKSB7XG4gICAgcHVibGlzaChcImdhbWVPdmVyXCIsIFwiQUkgaGFzIHdvbiB0aGUgZ2FtZVwiKTtcbiAgfSBlbHNlIHtcbiAgICBwdWJsaXNoKFwiZ2FtZU92ZXJcIiwgXCJQbGF5ZXIxIGhhcyB3b24gdGhlIGdhbWVcIik7XG4gIH1cbiAgcGxheWVyMWJvYXJkLmNsZWFyU2hpcCgpO1xuICBwbGF5ZXIyYm9hcmQuY2xlYXJTaGlwKCk7XG4gIHVuc3Vic2NyaWJlKFwibmV3VHVyblwiLCB0dXJuKTtcbiAgc3Vic2NyaWJlKFwicmVzdGFydFwiLCBnYW1lKTtcbiAgcHVibGlzaChcIm5ld0dhbWVcIik7XG59O1xuXG5jb25zdCB0dXJuID0gKGNvb3JkcykgPT4ge1xuICBwbGF5ZXIxLnRvZ2dsZVR1cm4oKTtcbiAgcGxheWVyMi50b2dnbGVUdXJuKCk7XG4gIHBsYXllcjEuYXR0YWNrKHBsYXllcjJib2FyZCwgY29vcmRzKTtcbiAgcHVibGlzaChcImRpc3BsYXlHYW1lYm9hcmRcIiwgcGxheWVyMmJvYXJkLmdhbWVib2FyZCwgXCJBSVwiKTtcbiAgaWYgKHBsYXllcjFib2FyZC5hbGxTdW5rKCkgfHwgcGxheWVyMmJvYXJkLmFsbFN1bmsoKSkge1xuICAgIGdhbWVPdmVyKCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHBsYXllcjIuYXR0YWNrKHBsYXllcjFib2FyZCk7XG4gIHB1Ymxpc2goXCJkaXNwbGF5R2FtZWJvYXJkXCIsIHBsYXllcjFib2FyZC5nYW1lYm9hcmQsIFwiUGxheWVyMVwiKTtcbiAgaWYgKHBsYXllcjFib2FyZC5hbGxTdW5rKCkgfHwgcGxheWVyMmJvYXJkLmFsbFN1bmsoKSkge1xuICAgIGdhbWVPdmVyKCk7XG4gIH1cbn07XG5cbi8qKlxuICogU3RhcnRzIGdhbWVcbiAqIEBjYWxsYmFja1xuICovXG5mdW5jdGlvbiBnYW1lKCkge1xuICBzdWJzY3JpYmUoXCJuZXdUdXJuXCIsIHR1cm4pO1xuICBhaVBsYWNlU2hpcChwbGF5ZXIyYm9hcmQpO1xuICBwdWJsaXNoKFwiZGlzcGxheUdhbWVib2FyZFwiLCBwbGF5ZXIxYm9hcmQuZ2FtZWJvYXJkLCBcIlBsYXllcjFcIik7XG4gIHB1Ymxpc2goXCJkaXNwbGF5R2FtZWJvYXJkXCIsIHBsYXllcjJib2FyZC5nYW1lYm9hcmQsIFwiQUlcIik7XG4gIHBsYXllcjEudG9nZ2xlVHVybigpO1xufVxuXG5jb25zdCBzZXRVcCA9IChsZW5ndGgsIGNvb3JkLCBkaXIsIGVsZW1lbnQpID0+IHtcbiAgY29uc3QgbmV3Q29vcmQgPSBbLi4uY29vcmRdO1xuICBpZiAoZGlyID09PSBcInlcIikge1xuICAgIG5ld0Nvb3JkWzBdID0gbmV3Q29vcmRbMF0gLSBlbGVtZW50O1xuICAgIHBsYXllcjFib2FyZC5wbGFjZVNoaXAoYXJyWzBdLCBsZW5ndGgsIG5ld0Nvb3JkLCBkaXIpO1xuICB9IGVsc2Uge1xuICAgIG5ld0Nvb3JkWzFdID0gbmV3Q29vcmRbMV0gLSBlbGVtZW50O1xuICAgIHBsYXllcjFib2FyZC5wbGFjZVNoaXAoYXJyWzBdLCBsZW5ndGgsIG5ld0Nvb3JkLCBkaXIpO1xuICB9XG4gIHB1Ymxpc2goXCJkaXNwbGF5R2FtZWJvYXJkXCIsIHBsYXllcjFib2FyZC5nYW1lYm9hcmQsIFwiUGxheWVyMVwiKTtcbiAgYXJyLnNoaWZ0KCk7XG4gIGlmIChhcnIubGVuZ3RoID09PSAwKSB7XG4gICAgYXJyID0gW1wiQ2FycmllclwiLCBcIkJhdHRsZXNoaXBcIiwgXCJDcnVpc2VyXCIsIFwiU3VibWFyaW5lXCIsIFwiRGVzdHJveWVyXCJdO1xuICAgIHB1Ymxpc2goXCJjZWxsQ2xpY2tcIik7XG4gIH1cbn07XG5cbmNvbnN0IGFyZVNoaXBzUGxhY2VkID0gKG5vKSA9PiB7XG4gIGlmIChzaGlwcy5sZW5ndGggPiA0KSB7XG4gICAgc2hpcHMgPSBbXTtcbiAgfVxuICBwbGF5ZXIxYm9hcmQuZ2FtZWJvYXJkLmZvckVhY2goKHJvdykgPT4ge1xuICAgIHJvdy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICBpZiAoKGNlbGwgIT09IG51bGwpICYgKGNlbGwgIT09IFwibWlzc1wiKSkge1xuICAgICAgICBpZiAoIXNoYXJlVmFsdWVzKHNoaXBzLCBbY2VsbC5uYW1lXSkpIHtcbiAgICAgICAgICBzaGlwcy5wdXNoKGNlbGwubmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIGlmIChzaGlwcy5sZW5ndGggPT09IG5vKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuZXhwb3J0IHsgZ2FtZSwgdHVybiwgc2V0VXAsIGFyZVNoaXBzUGxhY2VkIH07XG4iLCJpbXBvcnQgeyBjcmVhdGVTaGlwIH0gZnJvbSBcIi4vc2hpcFwiO1xuXG4vLyBAdHMtY2hlY2tcblxuLyoqXG4gKiBAbW9kdWxlIGdhbWVib2FyZFxuICovXG5cbi8qKlxuICogQ3JlYXRlcyBhIGdhbWVib2FyZCBvYmplY3RcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuY29uc3QgY3JlYXRlR2FtZWJvYXJkID0gKCkgPT4ge1xuICBsZXQgc2hpcHMgPSBbXTtcbiAgY29uc3QgZ2FtZWJvYXJkID0gW1tdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdXTtcbiAgZ2FtZWJvYXJkLmZvckVhY2goKGFycikgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgYXJyLnB1c2gobnVsbCk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBzaGFyZVZhbHVlcyA9IChiaWdBcnIsIGFycikgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmlnQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50ID0gYmlnQXJyW2ldO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3Qgc21hbGxDdXJyZW50ID0gYXJyW2pdO1xuICAgICAgICBpZiAoY3VycmVudC5zaGlwTmFtZSA9PT0gc21hbGxDdXJyZW50LnNoaXBOYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIC8vIHBsYWNlcyBzaGlwcyBvbiBnYW1lYm9hcmRcbiAgY29uc3QgcGxhY2VTaGlwID0gKG5hbWUsIGxlbmd0aE9mU2hpcCwgY29vcmQsIGRpcmVjdGlvbiA9IFwieFwiKSA9PiB7XG4gICAgY29uc3QgbmV3U2hpcCA9IGNyZWF0ZVNoaXAobmFtZSwgbGVuZ3RoT2ZTaGlwKTtcbiAgICBpZiAoIXNoYXJlVmFsdWVzKHNoaXBzLCBbbmV3U2hpcF0pKSB7XG4gICAgICBjb25zdCBsZW5ndGggPSBuZXdTaGlwLnNoaXBMZW5ndGg7XG4gICAgICBjb25zdCBjb29yZGluYXRlcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcInhcIikge1xuICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2goW2Nvb3JkWzBdLCBjb29yZFsxXSArIGldKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb29yZGluYXRlcy5wdXNoKFtjb29yZFswXSArIGksIGNvb3JkWzFdXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgY29vcmRpbmF0ZXMuZXZlcnkoKGN1cnJlbnQpID0+IHtcbiAgICAgICAgICBpZiAoY3VycmVudFswXSA+IDkgfHwgY3VycmVudFsxXSA+IDkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGdhbWVib2FyZFtjdXJyZW50WzBdXVtjdXJyZW50WzFdXSA9PT0gbnVsbDtcbiAgICAgICAgfSlcbiAgICAgICkge1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBjb29yZGluYXRlcy5mb3JFYWNoKChjdXJyZW50KSA9PiB7XG4gICAgICAgICAgZ2FtZWJvYXJkW2N1cnJlbnRbMF1dW2N1cnJlbnRbMV1dID0ge1xuICAgICAgICAgICAgbmFtZTogbmV3U2hpcC5zaGlwTmFtZSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBpbmRleCxcbiAgICAgICAgICAgIGlzSGl0OiBuZXdTaGlwLmJvZHlbaW5kZXhdLFxuICAgICAgICAgIH07XG4gICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfSk7XG4gICAgICAgIHNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIHJlY2VpdmVzIGF0dGFja3NcbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChjb29yZHMpID0+IHtcbiAgICBpZiAoZ2FtZWJvYXJkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXSA9PT0gbnVsbCkge1xuICAgICAgZ2FtZWJvYXJkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXSA9IFwibWlzc1wiO1xuICAgIH0gZWxzZSBpZiAoZ2FtZWJvYXJkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXSAhPT0gXCJtaXNzXCIpIHtcbiAgICAgIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgICAgaWYgKGdhbWVib2FyZFtjb29yZHNbMF1dW2Nvb3Jkc1sxXV0ubmFtZSA9PT0gc2hpcC5zaGlwTmFtZSkge1xuICAgICAgICAgIHNoaXAuaGl0KGdhbWVib2FyZFtjb29yZHNbMF1dW2Nvb3Jkc1sxXV0ucG9zaXRpb24pO1xuICAgICAgICAgIGdhbWVib2FyZFtjb29yZHNbMF1dW2Nvb3Jkc1sxXV0uaXNIaXQgPVxuICAgICAgICAgICAgc2hpcC5ib2R5W2dhbWVib2FyZFtjb29yZHNbMF1dW2Nvb3Jkc1sxXV0ucG9zaXRpb25dO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgLy8gY2hlY2tzIGlmIGFsbCBzaGlwcyBhcmUgc3Vua1xuICBjb25zdCBhbGxTdW5rID0gKCkgPT4ge1xuICAgIGNvbnN0IGJvb2xlYW4gPSBzaGlwcy5yZWR1Y2UoKGFjY3VtLCBzaGlwKSA9PiB7XG4gICAgICByZXR1cm4gYWNjdW0gJiYgc2hpcC5pc1N1bmsoKTtcbiAgICB9LCB0cnVlKTtcbiAgICByZXR1cm4gYm9vbGVhbjtcbiAgfTtcblxuICBjb25zdCBjbGVhclNoaXAgPSAoKSA9PiB7XG4gICAgc2hpcHMgPSBbXTtcbiAgICBnYW1lYm9hcmQuZm9yRWFjaCgoYXJyKSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgYXJyW2ldID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4geyBnYW1lYm9hcmQsIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFjaywgYWxsU3VuaywgY2xlYXJTaGlwIH07XG59O1xuXG5leHBvcnQgeyBjcmVhdGVHYW1lYm9hcmQgfTtcbiIsIi8vIEB0cy1jaGVja1xuXG4vKipcbiAqIEBtb2R1bGUgcGxheWVyXG4gKi9cblxuLyoqXG4gKiBjcmVhdGVzIFBsYXllcnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBwbGF5ZXJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuY29uc3QgY3JlYXRlUGxheWVyID0gKHBsYXllciA9IFwiaHVtYW5cIikgPT4ge1xuICBsZXQgdHVybiA9IHRydWU7XG4gIGxldCBhdHRhY2s7XG5cbiAgY29uc3QgZ2V0VHVybiA9ICgpID0+IHtcbiAgICByZXR1cm4gdHVybjtcbiAgfTtcblxuICBjb25zdCB0b2dnbGVUdXJuID0gKCkgPT4ge1xuICAgIHR1cm4gPSAhdHVybjtcbiAgfTtcblxuICBpZiAocGxheWVyID09PSBcImh1bWFuXCIpIHtcbiAgICBhdHRhY2sgPSAoYm9hcmQsIGNvb3JkcykgPT4ge1xuICAgICAgYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xuICAgIH07XG4gIH0gZWxzZSBpZiAocGxheWVyID09PSBcIkFJXCIpIHtcbiAgICBhdHRhY2sgPSAoYm9hcmQpID0+IHtcbiAgICAgIGNvbnN0IGF2YWlsYWJsZSA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZC5nYW1lYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBib2FyZC5nYW1lYm9hcmRbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBib2FyZC5nYW1lYm9hcmRbaV1bal0gPT09IG51bGwgfHxcbiAgICAgICAgICAgIGJvYXJkLmdhbWVib2FyZFtpXVtqXS5pc0hpdCA9PT0gZmFsc2VcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGF2YWlsYWJsZS5wdXNoKFtpLCBqXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXZhaWxhYmxlLmxlbmd0aCk7XG4gICAgICBib2FyZC5yZWNlaXZlQXR0YWNrKGF2YWlsYWJsZVt5XSk7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7IGdldFR1cm4sIHRvZ2dsZVR1cm4sIGF0dGFjayB9O1xufTtcblxuZXhwb3J0IHsgY3JlYXRlUGxheWVyIH07XG4iLCIvLyBAdHMtY2hlY2tcblxuLyoqXG4gKiBAbW9kdWxlIHB1YnN1YlxuICovXG5cbi8qKlxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5cbmNvbnN0IGV2ZW50cyA9IHt9O1xuXG4vKipcbiAqIFN1YnNjcmliZSB0byBhbiBldmVudFxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSAtIE5hbWUgb2YgdGhlIGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIEZ1bmN0aW9uIHRvIGJlIGNhbGxlZFxuICovXG5jb25zdCBzdWJzY3JpYmUgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBmbikge1xuICBldmVudHNbZXZlbnROYW1lXSA9IGV2ZW50c1tldmVudE5hbWVdIHx8IFtdO1xuICBldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKTtcbn07XG5cbi8qKlxuICogVW5zdXNjcmliZSBmcm9tIGFuIGV2ZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIC0gTmFtZSBvZiB0aGUgZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gRnVuY3Rpb24gdG8gYmUgcmVtb3ZlZFxuICovXG5jb25zdCB1bnN1YnNjcmliZSA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGZuKSB7XG4gIGlmIChldmVudHNbZXZlbnROYW1lXSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnRzW2V2ZW50TmFtZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChldmVudHNbZXZlbnROYW1lXVtpXSA9PT0gZm4pIHtcbiAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0uc3BsaWNlKGksIDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogUHVibGlzaCBhbiBldmVudFxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSAtIE5hbWUgb2YgdGhlIGV2ZW50XG4gKiBAcGFyYW0geyp9IGRhdGEgLWRhdGEgdG8gYmUgcGFzc2VkIGludG8gY2FsbGJhY2tcbiAqL1xuY29uc3QgcHVibGlzaCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIC4uLmRhdGEpIHtcbiAgaWYgKGV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgZXZlbnRzW2V2ZW50TmFtZV0uZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICAgIGZuKGRhdGFbMF0sIGRhdGFbMV0sIGRhdGFbMl0sIGRhdGFbM10pO1xuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgeyBwdWJsaXNoLCB1bnN1YnNjcmliZSwgc3Vic2NyaWJlIH07XG4iLCIvLyBAdHMtY2hlY2tcblxuLyoqXG4gKiBAbW9kdWxlIFNoaXBcbiAqL1xuLy8gQHRzLWNoZWNrXG5cbi8qKlxuICogU2hpcCBmYWN0b3J5IGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aFxuICogQHJldHVybiB7T2JqZWN0fSAtIHNoaXAgb2JqZWN0XG4gKi9cbmNvbnN0IGNyZWF0ZVNoaXAgPSAobmFtZSwgbGVuZ3RoKSA9PiB7XG4gIGNvbnN0IHNoaXBCb2R5ID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBzaGlwQm9keS5wdXNoKGZhbHNlKTtcbiAgfVxuICBjb25zdCBzaGlwID0ge1xuICAgIHNoaXBOYW1lOiBuYW1lLFxuICAgIGJvZHk6IHNoaXBCb2R5LFxuICAgIHNoaXBMZW5ndGg6IHNoaXBCb2R5Lmxlbmd0aCxcbiAgICBoaXQoaW5kZXgpIHtcbiAgICAgIHNoaXBCb2R5W2luZGV4XSA9IHRydWU7XG4gICAgfSxcbiAgICBpc1N1bmsoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBCb2R5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzaGlwQm9keVtpXSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gIH07XG4gIHJldHVybiBzaGlwO1xufTtcblxuZXhwb3J0IHsgY3JlYXRlU2hpcCB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9