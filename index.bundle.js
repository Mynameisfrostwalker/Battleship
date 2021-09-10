/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles/main.css":
/*!*****************************!*\
  !*** ./src/styles/main.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/styles/reset.css":
/*!******************************!*\
  !*** ./src/styles/reset.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/scripts/events.js":
/*!*******************************!*\
  !*** ./src/scripts/events.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tdEvent": () => (/* binding */ tdEvent),
/* harmony export */   "removeTdEvent": () => (/* binding */ removeTdEvent),
/* harmony export */   "newGameEvent": () => (/* binding */ newGameEvent)
/* harmony export */ });
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubsub */ "./src/scripts/pubsub.js");


// @ts-check

/**
 * @module events
 */

const registerCellClick = (event) => {
  if (event.target.attributes["data-key"].nodeValue === "AI") {
    (0,_pubsub__WEBPACK_IMPORTED_MODULE_0__.publish)(
      "newTurn",
      JSON.parse(event.target.attributes["data-coords"].nodeValue)
    );
  }
};

const tdEvent = () => {
  const tdList = document.querySelectorAll("td");
  tdList.forEach((td) => {
    td.addEventListener("click", registerCellClick, { once: true });
  });
};

const removeTdEvent = () => {
  const tdList = document.querySelectorAll("td");
  tdList.forEach((td) => {
    td.removeEventListener("click", registerCellClick, { once: true });
  });
};

const newGame = (event) => {
  const main = document.querySelector("main");
  main.style["opacity"] = "1";
  event.target.parentNode.remove();
  (0,_pubsub__WEBPACK_IMPORTED_MODULE_0__.publish)("restart");
};

const newGameEvent = () => {
  const button = document.querySelector("button");
  button.addEventListener("click", newGame);
};




/***/ }),

/***/ "./src/scripts/gameDisplay.js":
/*!************************************!*\
  !*** ./src/scripts/gameDisplay.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayGame": () => (/* binding */ displayGame),
/* harmony export */   "displayGameOver": () => (/* binding */ displayGameOver)
/* harmony export */ });
// @ts-check

/**
 * @module gameDisplay
 */

const createTableCells = (y, x, title) => {
  const td = document.createElement("td");
  td.setAttribute("data-key", `${title}`);
  td.setAttribute("data-coords", `${JSON.stringify([y - 1, x])}`);
  return td;
};

const createTableHead = (y, x, title) => {
  const th = document.createElement("th");
  if (x !== 0) {
    th.textContent = `${x}`;
  }
  return th;
};

const createTableRows = (y, title) => {
  const tr = document.createElement("tr");
  tr.id = `${title}board-row${y}`;
  if (y !== 0) {
    const th = document.createElement("th");
    tr.appendChild(th);
    th.textContent = `${String.fromCharCode(64 + y)}`;

    for (let x = 0; x < 10; x++) {
      tr.appendChild(createTableCells(y, x, title));
    }
    return tr;
  } else {
    for (let x = 0; x <= 10; x++) {
      tr.appendChild(createTableHead(y, x, title));
    }
    return tr;
  }
};

const createBoard = (title) => {
  const table = document.createElement("table");
  table.id = title;
  const caption = document.createElement("caption");
  const h2 = document.createElement("h2");
  h2.textContent = title;
  caption.appendChild(h2);
  table.appendChild(caption);
  for (let y = 0; y <= 10; y++) {
    table.appendChild(createTableRows(y, title));
  }
  return table;
};

const displayGame = () => {
  const body = document.querySelector("body");
  const header = document.createElement("header");
  const h1 = document.createElement("h1");
  h1.textContent = "BATTLESHIP";
  header.appendChild(h1);
  body.appendChild(header);
  const main = document.createElement("main");
  main.appendChild(createBoard("Player1"));
  main.appendChild(createBoard("AI"));
  body.appendChild(main);
  const aside = document.createElement("aside");
  body.appendChild(aside);
};

const displayGameOver = (message) => {
  const body = document.querySelector("body");
  const main = document.querySelector("main");
  main.style["opacity"] = "0.5";
  const card = document.createElement("div");
  card.id = "card";
  const cardText = document.createElement("p");
  cardText.textContent = `${message}`;
  card.appendChild(cardText);
  const newGameButton = document.createElement("button");
  newGameButton.textContent = "New Game";
  newGameButton.classList.add("button");
  card.appendChild(newGameButton);
  body.appendChild(card);
};




/***/ }),

/***/ "./src/scripts/gameLoop.js":
/*!*********************************!*\
  !*** ./src/scripts/gameLoop.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ "./src/scripts/gameboardDisplay.js":
/*!*****************************************!*\
  !*** ./src/scripts/gameboardDisplay.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameboardDisplay": () => (/* binding */ gameboardDisplay)
/* harmony export */ });
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
        cell.textContent = "";
      } else if (!board[i][j].isHit) {
        cell.style["background-color"] = "grey";
      } else if (board[i][j].isHit) {
        cell.style["background-color"] = "red";
      } else {
        cell.style["background-color"] = "white";
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
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_reset_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/reset.css */ "./src/styles/reset.css");
/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/main.css */ "./src/styles/main.css");
/* harmony import */ var _gameDisplay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameDisplay */ "./src/scripts/gameDisplay.js");
/* harmony import */ var _gameLoop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gameLoop */ "./src/scripts/gameLoop.js");
/* harmony import */ var _gameboardDisplay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gameboardDisplay */ "./src/scripts/gameboardDisplay.js");
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pubsub */ "./src/scripts/pubsub.js");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./events */ "./src/scripts/events.js");









// @ts-check

/**
 * @fileoverview Index.js is the rrot file of this project.
 * @author Frostwalker
 */

(0,_gameDisplay__WEBPACK_IMPORTED_MODULE_2__.displayGame)();

(0,_pubsub__WEBPACK_IMPORTED_MODULE_5__.subscribe)("cellClick", _events__WEBPACK_IMPORTED_MODULE_6__.tdEvent);

(0,_pubsub__WEBPACK_IMPORTED_MODULE_5__.subscribe)("removeCellClick", _events__WEBPACK_IMPORTED_MODULE_6__.removeTdEvent);

(0,_pubsub__WEBPACK_IMPORTED_MODULE_5__.subscribe)("displayGameboard", _gameboardDisplay__WEBPACK_IMPORTED_MODULE_4__.gameboardDisplay);

(0,_pubsub__WEBPACK_IMPORTED_MODULE_5__.subscribe)("gameOver", _gameDisplay__WEBPACK_IMPORTED_MODULE_2__.displayGameOver);

(0,_pubsub__WEBPACK_IMPORTED_MODULE_5__.subscribe)("newGame", _events__WEBPACK_IMPORTED_MODULE_6__.newGameEvent);

(0,_gameLoop__WEBPACK_IMPORTED_MODULE_3__.game)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBbUM7O0FBRW5DOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSSxnREFBTztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELFlBQVk7QUFDbEUsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCxZQUFZO0FBQ3JFLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsZ0RBQU87QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQ2hEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWlDLE1BQU07QUFDdkMsb0NBQW9DLDJCQUEyQjtBQUMvRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixFQUFFO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxNQUFNLFdBQVcsRUFBRTtBQUNoQztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsNEJBQTRCOztBQUVwRCxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixRQUFRO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUV3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RGQTtBQUNNO0FBQ2E7O0FBRTNEOztBQUVBLGdCQUFnQixxREFBWTtBQUM1QixnQkFBZ0IscURBQVk7QUFDNUIscUJBQXFCLDJEQUFlO0FBQ3BDLHFCQUFxQiwyREFBZTs7QUFFcEM7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLG1CQUFtQjtBQUNyQztBQUNBLG9CQUFvQixnQkFBZ0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGFBQWE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRSxnREFBTztBQUNUO0FBQ0EsSUFBSSxnREFBTztBQUNYLElBQUk7QUFDSixJQUFJLGdEQUFPO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsRUFBRSxvREFBVztBQUNiLEVBQUUsa0RBQVM7QUFDWCxFQUFFLGdEQUFPO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLGdEQUFPO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsZ0RBQU87QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxrREFBUztBQUNYLEVBQUUsZ0RBQU87QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsZ0RBQU87QUFDVCxFQUFFLGdEQUFPO0FBQ1Q7QUFDQTs7QUFFc0I7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwS2M7O0FBRXBDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0Esb0JBQW9CLGlEQUFVO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixZQUFZO0FBQ2xDO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixRQUFRO0FBQzlCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUEsV0FBVztBQUNYOztBQUUyQjs7Ozs7Ozs7Ozs7Ozs7O0FDM0YzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQ0FBMkMsS0FBSztBQUNoRCxrQkFBa0Isa0JBQWtCO0FBQ3BDLG9CQUFvQixxQkFBcUI7QUFDekM7QUFDQSx5QkFBeUIsdUJBQXVCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRTRCOzs7Ozs7Ozs7Ozs7Ozs7QUMzQjVCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxzQkFBc0IsNEJBQTRCO0FBQ2xELHdCQUF3QiwrQkFBK0I7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDs7QUFFd0I7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaER4Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFVBQVU7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsVUFBVTtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsOEJBQThCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxHQUFHO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUUyQzs7Ozs7Ozs7Ozs7Ozs7O0FDbkQzQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFlBQVk7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHNCQUFzQixxQkFBcUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRXNCOzs7Ozs7O1VDckN0QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTjZCO0FBQ0Q7QUFDZ0I7QUFDVjtBQUNvQjtBQUNqQjtBQUMyQjtBQUNoQjs7QUFFaEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseURBQVc7O0FBRVgsa0RBQVMsY0FBYyw0Q0FBTzs7QUFFOUIsa0RBQVMsb0JBQW9CLGtEQUFhOztBQUUxQyxrREFBUyxxQkFBcUIsK0RBQWdCOztBQUU5QyxrREFBUyxhQUFhLHlEQUFlOztBQUVyQyxrREFBUyxZQUFZLGlEQUFZOztBQUVqQywrQ0FBSSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL21haW4uY3NzPzU4NDYiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvcmVzZXQuY3NzP2RkNTEiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZ2FtZURpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2dhbWVMb29wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2dhbWVib2FyZERpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvcHVic3ViLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHsgcHVibGlzaCB9IGZyb20gXCIuL3B1YnN1YlwiO1xuXG4vLyBAdHMtY2hlY2tcblxuLyoqXG4gKiBAbW9kdWxlIGV2ZW50c1xuICovXG5cbmNvbnN0IHJlZ2lzdGVyQ2VsbENsaWNrID0gKGV2ZW50KSA9PiB7XG4gIGlmIChldmVudC50YXJnZXQuYXR0cmlidXRlc1tcImRhdGEta2V5XCJdLm5vZGVWYWx1ZSA9PT0gXCJBSVwiKSB7XG4gICAgcHVibGlzaChcbiAgICAgIFwibmV3VHVyblwiLFxuICAgICAgSlNPTi5wYXJzZShldmVudC50YXJnZXQuYXR0cmlidXRlc1tcImRhdGEtY29vcmRzXCJdLm5vZGVWYWx1ZSlcbiAgICApO1xuICB9XG59O1xuXG5jb25zdCB0ZEV2ZW50ID0gKCkgPT4ge1xuICBjb25zdCB0ZExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwidGRcIik7XG4gIHRkTGlzdC5mb3JFYWNoKCh0ZCkgPT4ge1xuICAgIHRkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZWdpc3RlckNlbGxDbGljaywgeyBvbmNlOiB0cnVlIH0pO1xuICB9KTtcbn07XG5cbmNvbnN0IHJlbW92ZVRkRXZlbnQgPSAoKSA9PiB7XG4gIGNvbnN0IHRkTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJ0ZFwiKTtcbiAgdGRMaXN0LmZvckVhY2goKHRkKSA9PiB7XG4gICAgdGQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlZ2lzdGVyQ2VsbENsaWNrLCB7IG9uY2U6IHRydWUgfSk7XG4gIH0pO1xufTtcblxuY29uc3QgbmV3R2FtZSA9IChldmVudCkgPT4ge1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG4gIG1haW4uc3R5bGVbXCJvcGFjaXR5XCJdID0gXCIxXCI7XG4gIGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLnJlbW92ZSgpO1xuICBwdWJsaXNoKFwicmVzdGFydFwiKTtcbn07XG5cbmNvbnN0IG5ld0dhbWVFdmVudCA9ICgpID0+IHtcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvblwiKTtcbiAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBuZXdHYW1lKTtcbn07XG5cbmV4cG9ydCB7IHRkRXZlbnQsIHJlbW92ZVRkRXZlbnQsIG5ld0dhbWVFdmVudCB9O1xuIiwiLy8gQHRzLWNoZWNrXG5cbi8qKlxuICogQG1vZHVsZSBnYW1lRGlzcGxheVxuICovXG5cbmNvbnN0IGNyZWF0ZVRhYmxlQ2VsbHMgPSAoeSwgeCwgdGl0bGUpID0+IHtcbiAgY29uc3QgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gIHRkLnNldEF0dHJpYnV0ZShcImRhdGEta2V5XCIsIGAke3RpdGxlfWApO1xuICB0ZC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvb3Jkc1wiLCBgJHtKU09OLnN0cmluZ2lmeShbeSAtIDEsIHhdKX1gKTtcbiAgcmV0dXJuIHRkO1xufTtcblxuY29uc3QgY3JlYXRlVGFibGVIZWFkID0gKHksIHgsIHRpdGxlKSA9PiB7XG4gIGNvbnN0IHRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xuICBpZiAoeCAhPT0gMCkge1xuICAgIHRoLnRleHRDb250ZW50ID0gYCR7eH1gO1xuICB9XG4gIHJldHVybiB0aDtcbn07XG5cbmNvbnN0IGNyZWF0ZVRhYmxlUm93cyA9ICh5LCB0aXRsZSkgPT4ge1xuICBjb25zdCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcbiAgdHIuaWQgPSBgJHt0aXRsZX1ib2FyZC1yb3cke3l9YDtcbiAgaWYgKHkgIT09IDApIHtcbiAgICBjb25zdCB0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcbiAgICB0ci5hcHBlbmRDaGlsZCh0aCk7XG4gICAgdGgudGV4dENvbnRlbnQgPSBgJHtTdHJpbmcuZnJvbUNoYXJDb2RlKDY0ICsgeSl9YDtcblxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgMTA7IHgrKykge1xuICAgICAgdHIuYXBwZW5kQ2hpbGQoY3JlYXRlVGFibGVDZWxscyh5LCB4LCB0aXRsZSkpO1xuICAgIH1cbiAgICByZXR1cm4gdHI7XG4gIH0gZWxzZSB7XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPD0gMTA7IHgrKykge1xuICAgICAgdHIuYXBwZW5kQ2hpbGQoY3JlYXRlVGFibGVIZWFkKHksIHgsIHRpdGxlKSk7XG4gICAgfVxuICAgIHJldHVybiB0cjtcbiAgfVxufTtcblxuY29uc3QgY3JlYXRlQm9hcmQgPSAodGl0bGUpID0+IHtcbiAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XG4gIHRhYmxlLmlkID0gdGl0bGU7XG4gIGNvbnN0IGNhcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FwdGlvblwiKTtcbiAgY29uc3QgaDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gIGgyLnRleHRDb250ZW50ID0gdGl0bGU7XG4gIGNhcHRpb24uYXBwZW5kQ2hpbGQoaDIpO1xuICB0YWJsZS5hcHBlbmRDaGlsZChjYXB0aW9uKTtcbiAgZm9yIChsZXQgeSA9IDA7IHkgPD0gMTA7IHkrKykge1xuICAgIHRhYmxlLmFwcGVuZENoaWxkKGNyZWF0ZVRhYmxlUm93cyh5LCB0aXRsZSkpO1xuICB9XG4gIHJldHVybiB0YWJsZTtcbn07XG5cbmNvbnN0IGRpc3BsYXlHYW1lID0gKCkgPT4ge1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIik7XG4gIGNvbnN0IGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICBoMS50ZXh0Q29udGVudCA9IFwiQkFUVExFU0hJUFwiO1xuICBoZWFkZXIuYXBwZW5kQ2hpbGQoaDEpO1xuICBib2R5LmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibWFpblwiKTtcbiAgbWFpbi5hcHBlbmRDaGlsZChjcmVhdGVCb2FyZChcIlBsYXllcjFcIikpO1xuICBtYWluLmFwcGVuZENoaWxkKGNyZWF0ZUJvYXJkKFwiQUlcIikpO1xuICBib2R5LmFwcGVuZENoaWxkKG1haW4pO1xuICBjb25zdCBhc2lkZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhc2lkZVwiKTtcbiAgYm9keS5hcHBlbmRDaGlsZChhc2lkZSk7XG59O1xuXG5jb25zdCBkaXNwbGF5R2FtZU92ZXIgPSAobWVzc2FnZSkgPT4ge1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcbiAgbWFpbi5zdHlsZVtcIm9wYWNpdHlcIl0gPSBcIjAuNVwiO1xuICBjb25zdCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY2FyZC5pZCA9IFwiY2FyZFwiO1xuICBjb25zdCBjYXJkVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBjYXJkVGV4dC50ZXh0Q29udGVudCA9IGAke21lc3NhZ2V9YDtcbiAgY2FyZC5hcHBlbmRDaGlsZChjYXJkVGV4dCk7XG4gIGNvbnN0IG5ld0dhbWVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBuZXdHYW1lQnV0dG9uLnRleHRDb250ZW50ID0gXCJOZXcgR2FtZVwiO1xuICBuZXdHYW1lQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidXR0b25cIik7XG4gIGNhcmQuYXBwZW5kQ2hpbGQobmV3R2FtZUJ1dHRvbik7XG4gIGJvZHkuYXBwZW5kQ2hpbGQoY2FyZCk7XG59O1xuXG5leHBvcnQgeyBkaXNwbGF5R2FtZSwgZGlzcGxheUdhbWVPdmVyIH07XG4iLCJpbXBvcnQgeyBjcmVhdGVQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IGNyZWF0ZUdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IHsgcHVibGlzaCwgc3Vic2NyaWJlLCB1bnN1YnNjcmliZSB9IGZyb20gXCIuL3B1YnN1YlwiO1xuXG4vLyBAdHMtY2hlY2tcblxuY29uc3QgcGxheWVyMSA9IGNyZWF0ZVBsYXllcihcImh1bWFuXCIpO1xuY29uc3QgcGxheWVyMiA9IGNyZWF0ZVBsYXllcihcIkFJXCIpO1xuY29uc3QgcGxheWVyMWJvYXJkID0gY3JlYXRlR2FtZWJvYXJkKCk7XG5jb25zdCBwbGF5ZXIyYm9hcmQgPSBjcmVhdGVHYW1lYm9hcmQoKTtcblxuLyoqXG4gKiBAbW9kdWxlIGdhbWVMb29wXG4gKi9cblxuY29uc3Qgc2hhcmVWYWx1ZXMgPSAoYmlnQXJyLCBhcnIpID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBiaWdBcnIubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjdXJyZW50ID0gYmlnQXJyW2ldO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgYXJyLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBzbWFsbEN1cnJlbnQgPSBhcnJbal07XG4gICAgICBpZiAoY3VycmVudFswXSA9PT0gc21hbGxDdXJyZW50WzBdICYmIGN1cnJlbnRbMV0gPT09IHNtYWxsQ3VycmVudFsxXSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuY29uc3QgYWlQbGFjZVNoaXAgPSAoZ2FtZWJvYXJkKSA9PiB7XG4gIGNvbnN0IGNvb3JkcyA9IFtdO1xuICBjb25zdCBkaXJlY3Rpb25zID0gW107XG4gIGNvbnN0IHJhbmRvbSA9IChsZW5ndGgpID0+IHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwIC0gbGVuZ3RoKSk7XG4gIH07XG5cbiAgLy8gZmluZHMgcmFuZG9tIGNvb3JkaW5hdGVzIHdoaWNoIHNhdGlzZnkgdGhlIGNvbmRpdGlvbnNcbiAgY29uc3QgZmluZFJhbmRvbSA9IChsZW5ndGgsIGRpcmVjdGlvbikgPT4ge1xuICAgIGxldCBjb29yZDE7XG4gICAgbGV0IGNvb3JkMjtcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcInhcIikge1xuICAgICAgY29vcmQxID0gcmFuZG9tKDApO1xuICAgICAgY29vcmQyID0gcmFuZG9tKGxlbmd0aCk7XG4gICAgfVxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwieVwiKSB7XG4gICAgICBjb29yZDEgPSByYW5kb20obGVuZ3RoKTtcbiAgICAgIGNvb3JkMiA9IHJhbmRvbSgwKTtcbiAgICB9XG4gICAgY29uc3Qgc2Vjb25kQ29vcmRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ4XCIpIHtcbiAgICAgICAgc2Vjb25kQ29vcmRzLnB1c2goW2Nvb3JkMSwgY29vcmQyICsgaV0pO1xuICAgICAgfVxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ5XCIpIHtcbiAgICAgICAgc2Vjb25kQ29vcmRzLnB1c2goW2Nvb3JkMSArIGksIGNvb3JkMl0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXNoYXJlVmFsdWVzKGNvb3Jkcywgc2Vjb25kQ29vcmRzKSkge1xuICAgICAgZm9yIChsZXQgaSA9IC0xOyBpIDw9IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwieFwiKSB7XG4gICAgICAgICAgY29vcmRzLnB1c2goW2Nvb3JkMSwgY29vcmQyICsgaV0pO1xuICAgICAgICAgIGNvb3Jkcy5wdXNoKFtjb29yZDEgKyAxLCBjb29yZDIgKyBpXSk7XG4gICAgICAgICAgY29vcmRzLnB1c2goW2Nvb3JkMSAtIDEsIGNvb3JkMiArIGldKTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwieVwiKSB7XG4gICAgICAgICAgY29vcmRzLnB1c2goW2Nvb3JkMSArIGksIGNvb3JkMl0pO1xuICAgICAgICAgIGNvb3Jkcy5wdXNoKFtjb29yZDEgKyBpLCBjb29yZDIgKyAxXSk7XG4gICAgICAgICAgY29vcmRzLnB1c2goW2Nvb3JkMSArIGksIGNvb3JkMiAtIDFdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIFtjb29yZDEsIGNvb3JkMl07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmaW5kUmFuZG9tKGxlbmd0aCwgZGlyZWN0aW9uKTtcbiAgICB9XG4gIH07XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICBjb25zdCByYW5kID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTEpO1xuICAgIGlmIChyYW5kID4gNSkge1xuICAgICAgZGlyZWN0aW9ucy5wdXNoKFwieVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0aW9ucy5wdXNoKFwieFwiKTtcbiAgICB9XG4gIH1cblxuICBnYW1lYm9hcmQucGxhY2VTaGlwKFxuICAgIFwiQ2FycmllclwiLFxuICAgIDUsXG4gICAgZmluZFJhbmRvbSg1LCBkaXJlY3Rpb25zWzBdKSxcbiAgICBkaXJlY3Rpb25zWzBdXG4gICk7XG4gIGdhbWVib2FyZC5wbGFjZVNoaXAoXG4gICAgXCJCYXR0bGVzaGlwXCIsXG4gICAgNCxcbiAgICBmaW5kUmFuZG9tKDQsIGRpcmVjdGlvbnNbMV0pLFxuICAgIGRpcmVjdGlvbnNbMV1cbiAgKTtcbiAgZ2FtZWJvYXJkLnBsYWNlU2hpcChcbiAgICBcIkNydWlzZXJcIixcbiAgICAzLFxuICAgIGZpbmRSYW5kb20oMywgZGlyZWN0aW9uc1syXSksXG4gICAgZGlyZWN0aW9uc1syXVxuICApO1xuICBnYW1lYm9hcmQucGxhY2VTaGlwKFxuICAgIFwiU3VibWFyaW5lXCIsXG4gICAgMyxcbiAgICBmaW5kUmFuZG9tKDMsIGRpcmVjdGlvbnNbM10pLFxuICAgIGRpcmVjdGlvbnNbM11cbiAgKTtcbiAgZ2FtZWJvYXJkLnBsYWNlU2hpcChcbiAgICBcIkRlc3Ryb3llclwiLFxuICAgIDIsXG4gICAgZmluZFJhbmRvbSgyLCBkaXJlY3Rpb25zWzRdKSxcbiAgICBkaXJlY3Rpb25zWzRdXG4gICk7XG59O1xuXG5jb25zdCBnYW1lT3ZlciA9ICgpID0+IHtcbiAgcHVibGlzaChcInJlbW92ZUNlbGxDbGlja1wiKTtcbiAgaWYgKHBsYXllcjFib2FyZC5hbGxTdW5rKCkpIHtcbiAgICBwdWJsaXNoKFwiZ2FtZU92ZXJcIiwgXCJBSSBoYXMgd29uIHRoZSBnYW1lXCIpO1xuICB9IGVsc2Uge1xuICAgIHB1Ymxpc2goXCJnYW1lT3ZlclwiLCBcIlBsYXllcjEgaGFzIHdvbiB0aGUgZ2FtZVwiKTtcbiAgfVxuICBwbGF5ZXIxYm9hcmQuY2xlYXJTaGlwKCk7XG4gIHBsYXllcjJib2FyZC5jbGVhclNoaXAoKTtcbiAgdW5zdWJzY3JpYmUoXCJuZXdUdXJuXCIsIHR1cm4pO1xuICBzdWJzY3JpYmUoXCJyZXN0YXJ0XCIsIGdhbWUpO1xuICBwdWJsaXNoKFwibmV3R2FtZVwiKTtcbn07XG5cbmNvbnN0IHR1cm4gPSAoY29vcmRzKSA9PiB7XG4gIHBsYXllcjEudG9nZ2xlVHVybigpO1xuICBwbGF5ZXIyLnRvZ2dsZVR1cm4oKTtcbiAgcGxheWVyMS5hdHRhY2socGxheWVyMmJvYXJkLCBjb29yZHMpO1xuICBwdWJsaXNoKFwiZGlzcGxheUdhbWVib2FyZFwiLCBwbGF5ZXIyYm9hcmQuZ2FtZWJvYXJkLCBcIkFJXCIpO1xuICBpZiAocGxheWVyMWJvYXJkLmFsbFN1bmsoKSB8fCBwbGF5ZXIyYm9hcmQuYWxsU3VuaygpKSB7XG4gICAgZ2FtZU92ZXIoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgcGxheWVyMi5hdHRhY2socGxheWVyMWJvYXJkKTtcbiAgcHVibGlzaChcImRpc3BsYXlHYW1lYm9hcmRcIiwgcGxheWVyMWJvYXJkLmdhbWVib2FyZCwgXCJQbGF5ZXIxXCIpO1xuICBpZiAocGxheWVyMWJvYXJkLmFsbFN1bmsoKSB8fCBwbGF5ZXIyYm9hcmQuYWxsU3VuaygpKSB7XG4gICAgZ2FtZU92ZXIoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTdGFydHMgZ2FtZVxuICogQGNhbGxiYWNrXG4gKi9cbmZ1bmN0aW9uIGdhbWUoKSB7XG4gIHN1YnNjcmliZShcIm5ld1R1cm5cIiwgdHVybik7XG4gIHB1Ymxpc2goXCJjZWxsQ2xpY2tcIik7XG4gIGNvbnNvbGUubG9nKFwiYlwiKTtcbiAgcGxheWVyMWJvYXJkLnBsYWNlU2hpcChcIkNhcnJpZXJcIiwgNSwgWzAsIDBdLCBcInlcIik7XG4gIHBsYXllcjFib2FyZC5wbGFjZVNoaXAoXCJCYXR0bGVzaGlwXCIsIDQsIFs3LCAyXSwgXCJ4XCIpO1xuICBwbGF5ZXIxYm9hcmQucGxhY2VTaGlwKFwiQ3J1aXNlclwiLCAzLCBbMywgNl0sIFwieVwiKTtcbiAgcGxheWVyMWJvYXJkLnBsYWNlU2hpcChcIlN1Ym1hcmluZVwiLCAzLCBbNywgOV0sIFwieVwiKTtcbiAgcGxheWVyMWJvYXJkLnBsYWNlU2hpcChcIkRlc3Ryb3llclwiLCAyLCBbMiwgM10sIFwieFwiKTtcbiAgYWlQbGFjZVNoaXAocGxheWVyMmJvYXJkKTtcbiAgcHVibGlzaChcImRpc3BsYXlHYW1lYm9hcmRcIiwgcGxheWVyMWJvYXJkLmdhbWVib2FyZCwgXCJQbGF5ZXIxXCIpO1xuICBwdWJsaXNoKFwiZGlzcGxheUdhbWVib2FyZFwiLCBwbGF5ZXIyYm9hcmQuZ2FtZWJvYXJkLCBcIkFJXCIpO1xuICBwbGF5ZXIxLnRvZ2dsZVR1cm4oKTtcbn1cblxuZXhwb3J0IHsgZ2FtZSwgdHVybiB9O1xuIiwiaW1wb3J0IHsgY3JlYXRlU2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcblxuLy8gQHRzLWNoZWNrXG5cbi8qKlxuICogQG1vZHVsZSBnYW1lYm9hcmRcbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgYSBnYW1lYm9hcmQgb2JqZWN0XG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmNvbnN0IGNyZWF0ZUdhbWVib2FyZCA9ICgpID0+IHtcbiAgbGV0IHNoaXBzID0gW107XG4gIGNvbnN0IGdhbWVib2FyZCA9IFtbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXV07XG4gIGdhbWVib2FyZC5mb3JFYWNoKChhcnIpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGFyci5wdXNoKG51bGwpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gcGxhY2VzIHNoaXBzIG9uIGdhbWVib2FyZFxuICBjb25zdCBwbGFjZVNoaXAgPSAobmFtZSwgbGVuZ3RoT2ZTaGlwLCBjb29yZCwgZGlyZWN0aW9uID0gXCJ4XCIpID0+IHtcbiAgICBjb25zdCBuZXdTaGlwID0gY3JlYXRlU2hpcChuYW1lLCBsZW5ndGhPZlNoaXApO1xuICAgIGlmIChzaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5zaGlwTmFtZSAhPT0gbmV3U2hpcC5zaGlwTmFtZSkpIHtcbiAgICAgIGNvbnN0IGxlbmd0aCA9IG5ld1NoaXAuc2hpcExlbmd0aDtcbiAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwieFwiKSB7XG4gICAgICAgICAgY29vcmRpbmF0ZXMucHVzaChbY29vcmRbMF0sIGNvb3JkWzFdICsgaV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvb3JkaW5hdGVzLnB1c2goW2Nvb3JkWzBdICsgaSwgY29vcmRbMV1dKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBjb29yZGluYXRlcy5ldmVyeSgoY3VycmVudCkgPT4ge1xuICAgICAgICAgIGlmIChjdXJyZW50WzBdID4gOSB8fCBjdXJyZW50WzFdID4gOSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZ2FtZWJvYXJkW2N1cnJlbnRbMF1dW2N1cnJlbnRbMV1dID09PSBudWxsO1xuICAgICAgICB9KVxuICAgICAgKSB7XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIGNvb3JkaW5hdGVzLmZvckVhY2goKGN1cnJlbnQpID0+IHtcbiAgICAgICAgICBnYW1lYm9hcmRbY3VycmVudFswXV1bY3VycmVudFsxXV0gPSB7XG4gICAgICAgICAgICBuYW1lOiBuZXdTaGlwLnNoaXBOYW1lLFxuICAgICAgICAgICAgcG9zaXRpb246IGluZGV4LFxuICAgICAgICAgICAgaXNIaXQ6IG5ld1NoaXAuYm9keVtpbmRleF0sXG4gICAgICAgICAgfTtcbiAgICAgICAgICBpbmRleCsrO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgc2hpcHMucHVzaChuZXdTaGlwKTtcbiAgfTtcblxuICAvLyByZWNlaXZlcyBhdHRhY2tzXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmRzKSA9PiB7XG4gICAgaWYgKGdhbWVib2FyZFtjb29yZHNbMF1dW2Nvb3Jkc1sxXV0gPT09IG51bGwpIHtcbiAgICAgIGdhbWVib2FyZFtjb29yZHNbMF1dW2Nvb3Jkc1sxXV0gPSBcIm1pc3NcIjtcbiAgICB9IGVsc2UgaWYgKGdhbWVib2FyZFtjb29yZHNbMF1dW2Nvb3Jkc1sxXV0gIT09IFwibWlzc1wiKSB7XG4gICAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgIGlmIChnYW1lYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV1dLm5hbWUgPT09IHNoaXAuc2hpcE5hbWUpIHtcbiAgICAgICAgICBzaGlwLmhpdChnYW1lYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV1dLnBvc2l0aW9uKTtcbiAgICAgICAgICBnYW1lYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV1dLmlzSGl0ID1cbiAgICAgICAgICAgIHNoaXAuYm9keVtnYW1lYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV1dLnBvc2l0aW9uXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIGNoZWNrcyBpZiBhbGwgc2hpcHMgYXJlIHN1bmtcbiAgY29uc3QgYWxsU3VuayA9ICgpID0+IHtcbiAgICBjb25zdCBib29sZWFuID0gc2hpcHMucmVkdWNlKChhY2N1bSwgc2hpcCkgPT4ge1xuICAgICAgcmV0dXJuIGFjY3VtICYmIHNoaXAuaXNTdW5rKCk7XG4gICAgfSwgdHJ1ZSk7XG4gICAgcmV0dXJuIGJvb2xlYW47XG4gIH07XG5cbiAgY29uc3QgY2xlYXJTaGlwID0gKCkgPT4ge1xuICAgIHNoaXBzID0gW107XG4gICAgZ2FtZWJvYXJkLmZvckVhY2goKGFycikgPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgIGFycltpXSA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHsgZ2FtZWJvYXJkLCBwbGFjZVNoaXAsIHJlY2VpdmVBdHRhY2ssIGFsbFN1bmssIGNsZWFyU2hpcCB9O1xufTtcblxuZXhwb3J0IHsgY3JlYXRlR2FtZWJvYXJkIH07XG4iLCIvKipcbiAqIEBtb2R1bGUgZ2FtZWJvYXJkRGlzcGxheVxuICovXG5cbmNvbnN0IGdhbWVib2FyZERpc3BsYXkgPSAoYm9hcmQsIG5hbWUpID0+IHtcbiAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuYW1lfWApO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBib2FyZFtpXS5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgY2VsbCA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGBbZGF0YS1jb29yZHM9XCIke0pTT04uc3RyaW5naWZ5KFtpLCBqXSl9XCJdYFxuICAgICAgKTtcbiAgICAgIGlmIChib2FyZFtpXVtqXSA9PT0gbnVsbCkge1xuICAgICAgICBjZWxsLnN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IFwid2hpdGVcIjtcbiAgICAgIH0gZWxzZSBpZiAoYm9hcmRbaV1bal0gPT09IFwibWlzc1wiKSB7XG4gICAgICAgIGNlbGwuc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gXCJ5ZWxsb3dcIjtcbiAgICAgICAgY2VsbC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICB9IGVsc2UgaWYgKCFib2FyZFtpXVtqXS5pc0hpdCkge1xuICAgICAgICBjZWxsLnN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IFwiZ3JleVwiO1xuICAgICAgfSBlbHNlIGlmIChib2FyZFtpXVtqXS5pc0hpdCkge1xuICAgICAgICBjZWxsLnN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IFwicmVkXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjZWxsLnN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IFwid2hpdGVcIjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCB7IGdhbWVib2FyZERpc3BsYXkgfTtcbiIsIi8vIEB0cy1jaGVja1xuXG4vKipcbiAqIEBtb2R1bGUgcGxheWVyXG4gKi9cblxuLyoqXG4gKiBjcmVhdGVzIFBsYXllcnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBwbGF5ZXJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuY29uc3QgY3JlYXRlUGxheWVyID0gKHBsYXllciA9IFwiaHVtYW5cIikgPT4ge1xuICBsZXQgdHVybiA9IHRydWU7XG4gIGxldCBhdHRhY2s7XG5cbiAgY29uc3QgZ2V0VHVybiA9ICgpID0+IHtcbiAgICByZXR1cm4gdHVybjtcbiAgfTtcblxuICBjb25zdCB0b2dnbGVUdXJuID0gKCkgPT4ge1xuICAgIHR1cm4gPSAhdHVybjtcbiAgfTtcblxuICBpZiAocGxheWVyID09PSBcImh1bWFuXCIpIHtcbiAgICBhdHRhY2sgPSAoYm9hcmQsIGNvb3JkcykgPT4ge1xuICAgICAgYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xuICAgIH07XG4gIH0gZWxzZSBpZiAocGxheWVyID09PSBcIkFJXCIpIHtcbiAgICBhdHRhY2sgPSAoYm9hcmQpID0+IHtcbiAgICAgIGNvbnN0IGF2YWlsYWJsZSA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZC5nYW1lYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBib2FyZC5nYW1lYm9hcmRbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBib2FyZC5nYW1lYm9hcmRbaV1bal0gPT09IG51bGwgfHxcbiAgICAgICAgICAgIGJvYXJkLmdhbWVib2FyZFtpXVtqXS5pc0hpdCA9PT0gZmFsc2VcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGF2YWlsYWJsZS5wdXNoKFtpLCBqXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXZhaWxhYmxlLmxlbmd0aCk7XG4gICAgICBib2FyZC5yZWNlaXZlQXR0YWNrKGF2YWlsYWJsZVt5XSk7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7IGdldFR1cm4sIHRvZ2dsZVR1cm4sIGF0dGFjayB9O1xufTtcblxuZXhwb3J0IHsgY3JlYXRlUGxheWVyIH07XG4iLCIvLyBAdHMtY2hlY2tcblxuLyoqXG4gKiBAbW9kdWxlIHB1YnN1YlxuICovXG5cbi8qKlxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5cbmNvbnN0IGV2ZW50cyA9IHt9O1xuXG4vKipcbiAqIFN1YnNjcmliZSB0byBhbiBldmVudFxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSAtIE5hbWUgb2YgdGhlIGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIEZ1bmN0aW9uIHRvIGJlIGNhbGxlZFxuICovXG5jb25zdCBzdWJzY3JpYmUgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBmbikge1xuICBldmVudHNbZXZlbnROYW1lXSA9IGV2ZW50c1tldmVudE5hbWVdIHx8IFtdO1xuICBldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKTtcbn07XG5cbi8qKlxuICogVW5zdXNjcmliZSBmcm9tIGFuIGV2ZW50XG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lIC0gTmFtZSBvZiB0aGUgZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gRnVuY3Rpb24gdG8gYmUgcmVtb3ZlZFxuICovXG5jb25zdCB1bnN1YnNjcmliZSA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGZuKSB7XG4gIGlmIChldmVudHNbZXZlbnROYW1lXSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnRzW2V2ZW50TmFtZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChldmVudHNbZXZlbnROYW1lXVtpXSA9PT0gZm4pIHtcbiAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0uc3BsaWNlKGksIDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogUHVibGlzaCBhbiBldmVudFxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSAtIE5hbWUgb2YgdGhlIGV2ZW50XG4gKiBAcGFyYW0geyp9IGRhdGEgLWRhdGEgdG8gYmUgcGFzc2VkIGludG8gY2FsbGJhY2tcbiAqL1xuY29uc3QgcHVibGlzaCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIC4uLmRhdGEpIHtcbiAgaWYgKGV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgZXZlbnRzW2V2ZW50TmFtZV0uZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICAgIGZuKGRhdGFbMF0sIGRhdGFbMV0pO1xuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgeyBwdWJsaXNoLCB1bnN1YnNjcmliZSwgc3Vic2NyaWJlIH07XG4iLCIvLyBAdHMtY2hlY2tcblxuLyoqXG4gKiBAbW9kdWxlIFNoaXBcbiAqL1xuLy8gQHRzLWNoZWNrXG5cbi8qKlxuICogU2hpcCBmYWN0b3J5IGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aFxuICogQHJldHVybiB7T2JqZWN0fSAtIHNoaXAgb2JqZWN0XG4gKi9cbmNvbnN0IGNyZWF0ZVNoaXAgPSAobmFtZSwgbGVuZ3RoKSA9PiB7XG4gIGNvbnN0IHNoaXBCb2R5ID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBzaGlwQm9keS5wdXNoKGZhbHNlKTtcbiAgfVxuICBjb25zdCBzaGlwID0ge1xuICAgIHNoaXBOYW1lOiBuYW1lLFxuICAgIGJvZHk6IHNoaXBCb2R5LFxuICAgIHNoaXBMZW5ndGg6IHNoaXBCb2R5Lmxlbmd0aCxcbiAgICBoaXQoaW5kZXgpIHtcbiAgICAgIHNoaXBCb2R5W2luZGV4XSA9IHRydWU7XG4gICAgfSxcbiAgICBpc1N1bmsoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBCb2R5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzaGlwQm9keVtpXSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gIH07XG4gIHJldHVybiBzaGlwO1xufTtcblxuZXhwb3J0IHsgY3JlYXRlU2hpcCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuLi9zdHlsZXMvcmVzZXQuY3NzXCI7XG5pbXBvcnQgXCIuLi9zdHlsZXMvbWFpbi5jc3NcIjtcbmltcG9ydCB7IGRpc3BsYXlHYW1lIH0gZnJvbSBcIi4vZ2FtZURpc3BsYXlcIjtcbmltcG9ydCB7IGdhbWUgfSBmcm9tIFwiLi9nYW1lTG9vcFwiO1xuaW1wb3J0IHsgZ2FtZWJvYXJkRGlzcGxheSB9IGZyb20gXCIuL2dhbWVib2FyZERpc3BsYXlcIjtcbmltcG9ydCB7IHN1YnNjcmliZSB9IGZyb20gXCIuL3B1YnN1YlwiO1xuaW1wb3J0IHsgdGRFdmVudCwgcmVtb3ZlVGRFdmVudCwgbmV3R2FtZUV2ZW50IH0gZnJvbSBcIi4vZXZlbnRzXCI7XG5pbXBvcnQgeyBkaXNwbGF5R2FtZU92ZXIgfSBmcm9tIFwiLi9nYW1lRGlzcGxheVwiO1xuXG4vLyBAdHMtY2hlY2tcblxuLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IEluZGV4LmpzIGlzIHRoZSBycm90IGZpbGUgb2YgdGhpcyBwcm9qZWN0LlxuICogQGF1dGhvciBGcm9zdHdhbGtlclxuICovXG5cbmRpc3BsYXlHYW1lKCk7XG5cbnN1YnNjcmliZShcImNlbGxDbGlja1wiLCB0ZEV2ZW50KTtcblxuc3Vic2NyaWJlKFwicmVtb3ZlQ2VsbENsaWNrXCIsIHJlbW92ZVRkRXZlbnQpO1xuXG5zdWJzY3JpYmUoXCJkaXNwbGF5R2FtZWJvYXJkXCIsIGdhbWVib2FyZERpc3BsYXkpO1xuXG5zdWJzY3JpYmUoXCJnYW1lT3ZlclwiLCBkaXNwbGF5R2FtZU92ZXIpO1xuXG5zdWJzY3JpYmUoXCJuZXdHYW1lXCIsIG5ld0dhbWVFdmVudCk7XG5cbmdhbWUoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==