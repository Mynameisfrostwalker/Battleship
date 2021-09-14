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
/* harmony export */   "newGameEvent": () => (/* binding */ newGameEvent),
/* harmony export */   "toggleDirectionEvent": () => (/* binding */ toggleDirectionEvent)
/* harmony export */ });
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubsub */ "./src/scripts/pubsub.js");
/* harmony import */ var _gameDisplay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameDisplay */ "./src/scripts/gameDisplay.js");
/* harmony import */ var _gameLoop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameLoop */ "./src/scripts/gameLoop.js");




// @ts-check

/**
 * @module events
 */

let count = 1;

let element;

let lengths = [4, 3, 3, 2];

let noOfShips = 1;

const record = (e) => {
  element = e.target.id;
};

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
  const button = document.querySelector("#newGame");
  button.addEventListener("click", newGame);
};

const toggleDirection = (event) => {
  event.target.previousElementSibling.classList.toggle("flexer");
  if (count % 2 !== 0) {
    event.target.previousElementSibling.setAttribute("data-direction", "x");
  } else {
    event.target.previousElementSibling.setAttribute("data-direction", "y");
  }
  count++;
};

const dragStart = (e) => {
  e.dataTransfer.setData(
    "text/plain",
    JSON.stringify([
      e.target.getAttribute("data-direction"),
      e.target.children.length,
    ])
  );
  e.target.style.opacity = "0.5";
};

const dragEnd = (e) => {
  e.target.style.opacity = "";
};

const dragEnter = (e) => {
  e.preventDefault();
};

const dragOver = (e) => {
  e.preventDefault();
};

const drop = (e) => {
  count = 1;
  const Ship = document.querySelector("#Ship");
  const aside = document.querySelector("aside");
  const id = JSON.parse(e.dataTransfer.getData("text/plain"));
  const coords = JSON.parse(e.target.attributes["data-coords"].nodeValue);
  (0,_pubsub__WEBPACK_IMPORTED_MODULE_0__.publish)("setUp", id[1], coords, id[0], element);
  if ((0,_gameLoop__WEBPACK_IMPORTED_MODULE_2__.areShipsPlaced)(noOfShips)) {
    Ship.remove();
    if (lengths.length > 0) {
      const newShip = (0,_gameDisplay__WEBPACK_IMPORTED_MODULE_1__.createDiv)(lengths[0]);
      aside.insertBefore(newShip, aside.children[0]);
      newShip.addEventListener("dragstart", dragStart);
      newShip.addEventListener("dragend", dragEnd);
      lengths.shift();
      const cells = document.querySelectorAll(".division");
      cells.forEach((cell) => {
        cell.addEventListener("mousedown", record);
      });
      noOfShips++;
    } else if (lengths.length === 0) {
      aside.remove();
      lengths = [4, 3, 3, 2];
      noOfShips = 1;
    }
  }
};

/**
 * Adds drag event listeners
 */
function toggleDirectionEvent() {
  const cells = document.querySelectorAll(".division");
  cells.forEach((cell) => {
    cell.addEventListener("mousedown", record);
  });
  const button = document.querySelector("#toggle");
  const ship = document.querySelector("#Ship");
  const boxes = document.querySelectorAll("[data-key='Player1']");
  button.addEventListener("click", toggleDirection);
  ship.addEventListener("dragstart", dragStart);
  ship.addEventListener("dragend", dragEnd);
  boxes.forEach((box) => {
    box.addEventListener("dragenter", dragEnter);
    box.addEventListener("dragover", dragOver);
    box.addEventListener("drop", drop);
  });
}




/***/ }),

/***/ "./src/scripts/gameDisplay.js":
/*!************************************!*\
  !*** ./src/scripts/gameDisplay.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayGame": () => (/* binding */ displayGame),
/* harmony export */   "displayGameOver": () => (/* binding */ displayGameOver),
/* harmony export */   "createDiv": () => (/* binding */ createDiv),
/* harmony export */   "newDragBox": () => (/* binding */ newDragBox)
/* harmony export */ });
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubsub */ "./src/scripts/pubsub.js");


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

const createDiv = (length) => {
  const mainDiv = document.createElement("div");
  mainDiv.id = "Ship";
  mainDiv.setAttribute("draggable", "true");
  mainDiv.setAttribute("data-direction", "y");
  for (let i = 0; i < length; i++) {
    const box = document.createElement("div");
    box.className = "division";
    box.id = `${i}`;
    mainDiv.appendChild(box);
  }
  return mainDiv;
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
  aside.appendChild(createDiv(5));
  const button = document.createElement("button");
  button.id = "toggle";
  button.textContent = "Change Axis";
  aside.appendChild(button);
  button.classList.add("button");
  body.appendChild(aside);
  (0,_pubsub__WEBPACK_IMPORTED_MODULE_0__.publish)("toggleEvent");
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
  newGameButton.id = "newGame";
  newGameButton.classList.add("button");
  card.appendChild(newGameButton);
  body.appendChild(card);
};

const newDragBox = () => {
  const body = document.querySelector("body");
  const aside = document.createElement("aside");
  aside.appendChild(createDiv(5));
  const button = document.createElement("button");
  button.id = "toggle";
  button.textContent = "Change Axis";
  aside.appendChild(button);
  button.classList.add("button");
  body.appendChild(aside);
  (0,_pubsub__WEBPACK_IMPORTED_MODULE_0__.publish)("toggleEvent");
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




/***/ }),

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

(0,_pubsub__WEBPACK_IMPORTED_MODULE_5__.subscribe)("toggleEvent", _events__WEBPACK_IMPORTED_MODULE_6__.toggleDirectionEvent);

(0,_gameDisplay__WEBPACK_IMPORTED_MODULE_2__.displayGame)();

(0,_pubsub__WEBPACK_IMPORTED_MODULE_5__.subscribe)("setUp", _gameLoop__WEBPACK_IMPORTED_MODULE_3__.setUp);

(0,_pubsub__WEBPACK_IMPORTED_MODULE_5__.subscribe)("cellClick", _events__WEBPACK_IMPORTED_MODULE_6__.tdEvent);

(0,_pubsub__WEBPACK_IMPORTED_MODULE_5__.subscribe)("removeCellClick", _events__WEBPACK_IMPORTED_MODULE_6__.removeTdEvent);

(0,_pubsub__WEBPACK_IMPORTED_MODULE_5__.subscribe)("displayGameboard", _gameboardDisplay__WEBPACK_IMPORTED_MODULE_4__.gameboardDisplay);

(0,_pubsub__WEBPACK_IMPORTED_MODULE_5__.subscribe)("gameOver", _gameDisplay__WEBPACK_IMPORTED_MODULE_2__.displayGameOver);

(0,_pubsub__WEBPACK_IMPORTED_MODULE_5__.subscribe)("newGame", _events__WEBPACK_IMPORTED_MODULE_6__.newGameEvent);

(0,_pubsub__WEBPACK_IMPORTED_MODULE_5__.subscribe)("restart", _gameDisplay__WEBPACK_IMPORTED_MODULE_2__.newDragBox);

(0,_gameLoop__WEBPACK_IMPORTED_MODULE_3__.game)();


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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkbattleship"] = self["webpackChunkbattleship"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["src_scripts_gameLoop_js"], () => (__webpack_require__("./src/scripts/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBbUM7QUFDTztBQUNFOztBQUU1Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJLGdEQUFPO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsWUFBWTtBQUNsRSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseURBQXlELFlBQVk7QUFDckUsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxnREFBTztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsZ0RBQU87QUFDVCxNQUFNLHlEQUFjO0FBQ3BCO0FBQ0E7QUFDQSxzQkFBc0IsdURBQVM7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVzRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNJbkM7O0FBRW5DOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWlDLE1BQU07QUFDdkMsb0NBQW9DLDJCQUEyQjtBQUMvRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixFQUFFO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxNQUFNLFdBQVcsRUFBRTtBQUNoQztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsNEJBQTRCOztBQUVwRCxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0E7QUFDQSxnQkFBZ0IsRUFBRTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsZ0RBQU87QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixRQUFRO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLGdEQUFPO0FBQ1Q7O0FBRStEOzs7Ozs7Ozs7Ozs7Ozs7QUMzSC9EO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJDQUEyQyxLQUFLO0FBQ2hELGtCQUFrQixrQkFBa0I7QUFDcEMsb0JBQW9CLHFCQUFxQjtBQUN6QztBQUNBLHlCQUF5Qix1QkFBdUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFNEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQkM7QUFDRDtBQUM0QjtBQUNmO0FBQ2E7QUFDakI7QUFNbkI7QUFDOEI7O0FBRWhEOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtEQUFTLGdCQUFnQix5REFBb0I7O0FBRTdDLHlEQUFXOztBQUVYLGtEQUFTLFVBQVUsNENBQUs7O0FBRXhCLGtEQUFTLGNBQWMsNENBQU87O0FBRTlCLGtEQUFTLG9CQUFvQixrREFBYTs7QUFFMUMsa0RBQVMscUJBQXFCLCtEQUFnQjs7QUFFOUMsa0RBQVMsYUFBYSx5REFBZTs7QUFFckMsa0RBQVMsWUFBWSxpREFBWTs7QUFFakMsa0RBQVMsWUFBWSxvREFBVTs7QUFFL0IsK0NBQUk7Ozs7Ozs7VUN2Q0o7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLCtCQUErQix3Q0FBd0M7V0FDdkU7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQkFBaUIscUJBQXFCO1dBQ3RDO1dBQ0E7V0FDQSxrQkFBa0IscUJBQXFCO1dBQ3ZDO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9tYWluLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9yZXNldC5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZ2FtZURpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2dhbWVib2FyZERpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHsgcHVibGlzaCB9IGZyb20gXCIuL3B1YnN1YlwiO1xuaW1wb3J0IHsgY3JlYXRlRGl2IH0gZnJvbSBcIi4vZ2FtZURpc3BsYXlcIjtcbmltcG9ydCB7IGFyZVNoaXBzUGxhY2VkIH0gZnJvbSBcIi4vZ2FtZUxvb3BcIjtcblxuLy8gQHRzLWNoZWNrXG5cbi8qKlxuICogQG1vZHVsZSBldmVudHNcbiAqL1xuXG5sZXQgY291bnQgPSAxO1xuXG5sZXQgZWxlbWVudDtcblxubGV0IGxlbmd0aHMgPSBbNCwgMywgMywgMl07XG5cbmxldCBub09mU2hpcHMgPSAxO1xuXG5jb25zdCByZWNvcmQgPSAoZSkgPT4ge1xuICBlbGVtZW50ID0gZS50YXJnZXQuaWQ7XG59O1xuXG5jb25zdCByZWdpc3RlckNlbGxDbGljayA9IChldmVudCkgPT4ge1xuICBpZiAoZXZlbnQudGFyZ2V0LmF0dHJpYnV0ZXNbXCJkYXRhLWtleVwiXS5ub2RlVmFsdWUgPT09IFwiQUlcIikge1xuICAgIHB1Ymxpc2goXG4gICAgICBcIm5ld1R1cm5cIixcbiAgICAgIEpTT04ucGFyc2UoZXZlbnQudGFyZ2V0LmF0dHJpYnV0ZXNbXCJkYXRhLWNvb3Jkc1wiXS5ub2RlVmFsdWUpXG4gICAgKTtcbiAgfVxufTtcblxuY29uc3QgdGRFdmVudCA9ICgpID0+IHtcbiAgY29uc3QgdGRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInRkXCIpO1xuICB0ZExpc3QuZm9yRWFjaCgodGQpID0+IHtcbiAgICB0ZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVnaXN0ZXJDZWxsQ2xpY2ssIHsgb25jZTogdHJ1ZSB9KTtcbiAgfSk7XG59O1xuXG5jb25zdCByZW1vdmVUZEV2ZW50ID0gKCkgPT4ge1xuICBjb25zdCB0ZExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwidGRcIik7XG4gIHRkTGlzdC5mb3JFYWNoKCh0ZCkgPT4ge1xuICAgIHRkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZWdpc3RlckNlbGxDbGljaywgeyBvbmNlOiB0cnVlIH0pO1xuICB9KTtcbn07XG5cbmNvbnN0IG5ld0dhbWUgPSAoZXZlbnQpID0+IHtcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuICBtYWluLnN0eWxlW1wib3BhY2l0eVwiXSA9IFwiMVwiO1xuICBldmVudC50YXJnZXQucGFyZW50Tm9kZS5yZW1vdmUoKTtcbiAgcHVibGlzaChcInJlc3RhcnRcIik7XG59O1xuXG5jb25zdCBuZXdHYW1lRXZlbnQgPSAoKSA9PiB7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3R2FtZVwiKTtcbiAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBuZXdHYW1lKTtcbn07XG5cbmNvbnN0IHRvZ2dsZURpcmVjdGlvbiA9IChldmVudCkgPT4ge1xuICBldmVudC50YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QudG9nZ2xlKFwiZmxleGVyXCIpO1xuICBpZiAoY291bnQgJSAyICE9PSAwKSB7XG4gICAgZXZlbnQudGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcuc2V0QXR0cmlidXRlKFwiZGF0YS1kaXJlY3Rpb25cIiwgXCJ4XCIpO1xuICB9IGVsc2Uge1xuICAgIGV2ZW50LnRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnNldEF0dHJpYnV0ZShcImRhdGEtZGlyZWN0aW9uXCIsIFwieVwiKTtcbiAgfVxuICBjb3VudCsrO1xufTtcblxuY29uc3QgZHJhZ1N0YXJ0ID0gKGUpID0+IHtcbiAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YShcbiAgICBcInRleHQvcGxhaW5cIixcbiAgICBKU09OLnN0cmluZ2lmeShbXG4gICAgICBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWRpcmVjdGlvblwiKSxcbiAgICAgIGUudGFyZ2V0LmNoaWxkcmVuLmxlbmd0aCxcbiAgICBdKVxuICApO1xuICBlLnRhcmdldC5zdHlsZS5vcGFjaXR5ID0gXCIwLjVcIjtcbn07XG5cbmNvbnN0IGRyYWdFbmQgPSAoZSkgPT4ge1xuICBlLnRhcmdldC5zdHlsZS5vcGFjaXR5ID0gXCJcIjtcbn07XG5cbmNvbnN0IGRyYWdFbnRlciA9IChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbn07XG5cbmNvbnN0IGRyYWdPdmVyID0gKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufTtcblxuY29uc3QgZHJvcCA9IChlKSA9PiB7XG4gIGNvdW50ID0gMTtcbiAgY29uc3QgU2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjU2hpcFwiKTtcbiAgY29uc3QgYXNpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYXNpZGVcIik7XG4gIGNvbnN0IGlkID0gSlNPTi5wYXJzZShlLmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dC9wbGFpblwiKSk7XG4gIGNvbnN0IGNvb3JkcyA9IEpTT04ucGFyc2UoZS50YXJnZXQuYXR0cmlidXRlc1tcImRhdGEtY29vcmRzXCJdLm5vZGVWYWx1ZSk7XG4gIHB1Ymxpc2goXCJzZXRVcFwiLCBpZFsxXSwgY29vcmRzLCBpZFswXSwgZWxlbWVudCk7XG4gIGlmIChhcmVTaGlwc1BsYWNlZChub09mU2hpcHMpKSB7XG4gICAgU2hpcC5yZW1vdmUoKTtcbiAgICBpZiAobGVuZ3Rocy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBuZXdTaGlwID0gY3JlYXRlRGl2KGxlbmd0aHNbMF0pO1xuICAgICAgYXNpZGUuaW5zZXJ0QmVmb3JlKG5ld1NoaXAsIGFzaWRlLmNoaWxkcmVuWzBdKTtcbiAgICAgIG5ld1NoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCBkcmFnU3RhcnQpO1xuICAgICAgbmV3U2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCBkcmFnRW5kKTtcbiAgICAgIGxlbmd0aHMuc2hpZnQoKTtcbiAgICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kaXZpc2lvblwiKTtcbiAgICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHJlY29yZCk7XG4gICAgICB9KTtcbiAgICAgIG5vT2ZTaGlwcysrO1xuICAgIH0gZWxzZSBpZiAobGVuZ3Rocy5sZW5ndGggPT09IDApIHtcbiAgICAgIGFzaWRlLnJlbW92ZSgpO1xuICAgICAgbGVuZ3RocyA9IFs0LCAzLCAzLCAyXTtcbiAgICAgIG5vT2ZTaGlwcyA9IDE7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIEFkZHMgZHJhZyBldmVudCBsaXN0ZW5lcnNcbiAqL1xuZnVuY3Rpb24gdG9nZ2xlRGlyZWN0aW9uRXZlbnQoKSB7XG4gIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kaXZpc2lvblwiKTtcbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCByZWNvcmQpO1xuICB9KTtcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0b2dnbGVcIik7XG4gIGNvbnN0IHNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1NoaXBcIik7XG4gIGNvbnN0IGJveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWtleT0nUGxheWVyMSddXCIpO1xuICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZURpcmVjdGlvbik7XG4gIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCBkcmFnU3RhcnQpO1xuICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW5kXCIsIGRyYWdFbmQpO1xuICBib3hlcy5mb3JFYWNoKChib3gpID0+IHtcbiAgICBib3guYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbnRlclwiLCBkcmFnRW50ZXIpO1xuICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgZHJhZ092ZXIpO1xuICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBkcm9wKTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IHRkRXZlbnQsIHJlbW92ZVRkRXZlbnQsIG5ld0dhbWVFdmVudCwgdG9nZ2xlRGlyZWN0aW9uRXZlbnQgfTtcbiIsImltcG9ydCB7IHB1Ymxpc2ggfSBmcm9tIFwiLi9wdWJzdWJcIjtcblxuLy8gQHRzLWNoZWNrXG5cbi8qKlxuICogQG1vZHVsZSBnYW1lRGlzcGxheVxuICovXG5cbmNvbnN0IGNyZWF0ZVRhYmxlQ2VsbHMgPSAoeSwgeCwgdGl0bGUpID0+IHtcbiAgY29uc3QgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gIHRkLnNldEF0dHJpYnV0ZShcImRhdGEta2V5XCIsIGAke3RpdGxlfWApO1xuICB0ZC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWNvb3Jkc1wiLCBgJHtKU09OLnN0cmluZ2lmeShbeSAtIDEsIHhdKX1gKTtcbiAgcmV0dXJuIHRkO1xufTtcblxuY29uc3QgY3JlYXRlVGFibGVIZWFkID0gKHksIHgsIHRpdGxlKSA9PiB7XG4gIGNvbnN0IHRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xuICBpZiAoeCAhPT0gMCkge1xuICAgIHRoLnRleHRDb250ZW50ID0gYCR7eH1gO1xuICB9XG4gIHJldHVybiB0aDtcbn07XG5cbmNvbnN0IGNyZWF0ZVRhYmxlUm93cyA9ICh5LCB0aXRsZSkgPT4ge1xuICBjb25zdCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcbiAgdHIuaWQgPSBgJHt0aXRsZX1ib2FyZC1yb3cke3l9YDtcbiAgaWYgKHkgIT09IDApIHtcbiAgICBjb25zdCB0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcbiAgICB0ci5hcHBlbmRDaGlsZCh0aCk7XG4gICAgdGgudGV4dENvbnRlbnQgPSBgJHtTdHJpbmcuZnJvbUNoYXJDb2RlKDY0ICsgeSl9YDtcblxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgMTA7IHgrKykge1xuICAgICAgdHIuYXBwZW5kQ2hpbGQoY3JlYXRlVGFibGVDZWxscyh5LCB4LCB0aXRsZSkpO1xuICAgIH1cbiAgICByZXR1cm4gdHI7XG4gIH0gZWxzZSB7XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPD0gMTA7IHgrKykge1xuICAgICAgdHIuYXBwZW5kQ2hpbGQoY3JlYXRlVGFibGVIZWFkKHksIHgsIHRpdGxlKSk7XG4gICAgfVxuICAgIHJldHVybiB0cjtcbiAgfVxufTtcblxuY29uc3QgY3JlYXRlQm9hcmQgPSAodGl0bGUpID0+IHtcbiAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XG4gIHRhYmxlLmlkID0gdGl0bGU7XG4gIGNvbnN0IGNhcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FwdGlvblwiKTtcbiAgY29uc3QgaDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gIGgyLnRleHRDb250ZW50ID0gdGl0bGU7XG4gIGNhcHRpb24uYXBwZW5kQ2hpbGQoaDIpO1xuICB0YWJsZS5hcHBlbmRDaGlsZChjYXB0aW9uKTtcbiAgZm9yIChsZXQgeSA9IDA7IHkgPD0gMTA7IHkrKykge1xuICAgIHRhYmxlLmFwcGVuZENoaWxkKGNyZWF0ZVRhYmxlUm93cyh5LCB0aXRsZSkpO1xuICB9XG4gIHJldHVybiB0YWJsZTtcbn07XG5cbmNvbnN0IGNyZWF0ZURpdiA9IChsZW5ndGgpID0+IHtcbiAgY29uc3QgbWFpbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG1haW5EaXYuaWQgPSBcIlNoaXBcIjtcbiAgbWFpbkRpdi5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIiwgXCJ0cnVlXCIpO1xuICBtYWluRGl2LnNldEF0dHJpYnV0ZShcImRhdGEtZGlyZWN0aW9uXCIsIFwieVwiKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgYm94LmNsYXNzTmFtZSA9IFwiZGl2aXNpb25cIjtcbiAgICBib3guaWQgPSBgJHtpfWA7XG4gICAgbWFpbkRpdi5hcHBlbmRDaGlsZChib3gpO1xuICB9XG4gIHJldHVybiBtYWluRGl2O1xufTtcblxuY29uc3QgZGlzcGxheUdhbWUgPSAoKSA9PiB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgY29uc3QgaDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gIGgxLnRleHRDb250ZW50ID0gXCJCQVRUTEVTSElQXCI7XG4gIGhlYWRlci5hcHBlbmRDaGlsZChoMSk7XG4gIGJvZHkuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJtYWluXCIpO1xuICBtYWluLmFwcGVuZENoaWxkKGNyZWF0ZUJvYXJkKFwiUGxheWVyMVwiKSk7XG4gIG1haW4uYXBwZW5kQ2hpbGQoY3JlYXRlQm9hcmQoXCJBSVwiKSk7XG4gIGJvZHkuYXBwZW5kQ2hpbGQobWFpbik7XG4gIGNvbnN0IGFzaWRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFzaWRlXCIpO1xuICBhc2lkZS5hcHBlbmRDaGlsZChjcmVhdGVEaXYoNSkpO1xuICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBidXR0b24uaWQgPSBcInRvZ2dsZVwiO1xuICBidXR0b24udGV4dENvbnRlbnQgPSBcIkNoYW5nZSBBeGlzXCI7XG4gIGFzaWRlLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uXCIpO1xuICBib2R5LmFwcGVuZENoaWxkKGFzaWRlKTtcbiAgcHVibGlzaChcInRvZ2dsZUV2ZW50XCIpO1xufTtcblxuY29uc3QgZGlzcGxheUdhbWVPdmVyID0gKG1lc3NhZ2UpID0+IHtcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG4gIG1haW4uc3R5bGVbXCJvcGFjaXR5XCJdID0gXCIwLjVcIjtcbiAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNhcmQuaWQgPSBcImNhcmRcIjtcbiAgY29uc3QgY2FyZFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgY2FyZFRleHQudGV4dENvbnRlbnQgPSBgJHttZXNzYWdlfWA7XG4gIGNhcmQuYXBwZW5kQ2hpbGQoY2FyZFRleHQpO1xuICBjb25zdCBuZXdHYW1lQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgbmV3R2FtZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiTmV3IEdhbWVcIjtcbiAgbmV3R2FtZUJ1dHRvbi5pZCA9IFwibmV3R2FtZVwiO1xuICBuZXdHYW1lQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidXR0b25cIik7XG4gIGNhcmQuYXBwZW5kQ2hpbGQobmV3R2FtZUJ1dHRvbik7XG4gIGJvZHkuYXBwZW5kQ2hpbGQoY2FyZCk7XG59O1xuXG5jb25zdCBuZXdEcmFnQm94ID0gKCkgPT4ge1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gIGNvbnN0IGFzaWRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFzaWRlXCIpO1xuICBhc2lkZS5hcHBlbmRDaGlsZChjcmVhdGVEaXYoNSkpO1xuICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBidXR0b24uaWQgPSBcInRvZ2dsZVwiO1xuICBidXR0b24udGV4dENvbnRlbnQgPSBcIkNoYW5nZSBBeGlzXCI7XG4gIGFzaWRlLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uXCIpO1xuICBib2R5LmFwcGVuZENoaWxkKGFzaWRlKTtcbiAgcHVibGlzaChcInRvZ2dsZUV2ZW50XCIpO1xufTtcblxuZXhwb3J0IHsgZGlzcGxheUdhbWUsIGRpc3BsYXlHYW1lT3ZlciwgY3JlYXRlRGl2LCBuZXdEcmFnQm94IH07XG4iLCIvKipcbiAqIEBtb2R1bGUgZ2FtZWJvYXJkRGlzcGxheVxuICovXG5cbmNvbnN0IGdhbWVib2FyZERpc3BsYXkgPSAoYm9hcmQsIG5hbWUpID0+IHtcbiAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuYW1lfWApO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBib2FyZFtpXS5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgY2VsbCA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGBbZGF0YS1jb29yZHM9XCIke0pTT04uc3RyaW5naWZ5KFtpLCBqXSl9XCJdYFxuICAgICAgKTtcbiAgICAgIGlmIChib2FyZFtpXVtqXSA9PT0gbnVsbCkge1xuICAgICAgICBjZWxsLnN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IFwid2hpdGVcIjtcbiAgICAgIH0gZWxzZSBpZiAoYm9hcmRbaV1bal0gPT09IFwibWlzc1wiKSB7XG4gICAgICAgIGNlbGwuc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gXCJ5ZWxsb3dcIjtcbiAgICAgICAgY2VsbC50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICB9IGVsc2UgaWYgKCFib2FyZFtpXVtqXS5pc0hpdCAmJiBuYW1lID09PSBcIlBsYXllcjFcIikge1xuICAgICAgICBjZWxsLnN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IFwiZ3JleVwiO1xuICAgICAgfSBlbHNlIGlmIChib2FyZFtpXVtqXS5pc0hpdCkge1xuICAgICAgICBjZWxsLnN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IFwicmVkXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjZWxsLnN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IFwid2hpdGVcIjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCB7IGdhbWVib2FyZERpc3BsYXkgfTtcbiIsImltcG9ydCBcIi4uL3N0eWxlcy9yZXNldC5jc3NcIjtcbmltcG9ydCBcIi4uL3N0eWxlcy9tYWluLmNzc1wiO1xuaW1wb3J0IHsgZGlzcGxheUdhbWUsIG5ld0RyYWdCb3ggfSBmcm9tIFwiLi9nYW1lRGlzcGxheVwiO1xuaW1wb3J0IHsgZ2FtZSwgc2V0VXAgfSBmcm9tIFwiLi9nYW1lTG9vcFwiO1xuaW1wb3J0IHsgZ2FtZWJvYXJkRGlzcGxheSB9IGZyb20gXCIuL2dhbWVib2FyZERpc3BsYXlcIjtcbmltcG9ydCB7IHN1YnNjcmliZSB9IGZyb20gXCIuL3B1YnN1YlwiO1xuaW1wb3J0IHtcbiAgdGRFdmVudCxcbiAgcmVtb3ZlVGRFdmVudCxcbiAgbmV3R2FtZUV2ZW50LFxuICB0b2dnbGVEaXJlY3Rpb25FdmVudCxcbn0gZnJvbSBcIi4vZXZlbnRzXCI7XG5pbXBvcnQgeyBkaXNwbGF5R2FtZU92ZXIgfSBmcm9tIFwiLi9nYW1lRGlzcGxheVwiO1xuXG4vLyBAdHMtY2hlY2tcblxuLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IEluZGV4LmpzIGlzIHRoZSBycm90IGZpbGUgb2YgdGhpcyBwcm9qZWN0LlxuICogQGF1dGhvciBGcm9zdHdhbGtlclxuICovXG5cbnN1YnNjcmliZShcInRvZ2dsZUV2ZW50XCIsIHRvZ2dsZURpcmVjdGlvbkV2ZW50KTtcblxuZGlzcGxheUdhbWUoKTtcblxuc3Vic2NyaWJlKFwic2V0VXBcIiwgc2V0VXApO1xuXG5zdWJzY3JpYmUoXCJjZWxsQ2xpY2tcIiwgdGRFdmVudCk7XG5cbnN1YnNjcmliZShcInJlbW92ZUNlbGxDbGlja1wiLCByZW1vdmVUZEV2ZW50KTtcblxuc3Vic2NyaWJlKFwiZGlzcGxheUdhbWVib2FyZFwiLCBnYW1lYm9hcmREaXNwbGF5KTtcblxuc3Vic2NyaWJlKFwiZ2FtZU92ZXJcIiwgZGlzcGxheUdhbWVPdmVyKTtcblxuc3Vic2NyaWJlKFwibmV3R2FtZVwiLCBuZXdHYW1lRXZlbnQpO1xuXG5zdWJzY3JpYmUoXCJyZXN0YXJ0XCIsIG5ld0RyYWdCb3gpO1xuXG5nYW1lKCk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJpbmRleFwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZHNbaV1dID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rYmF0dGxlc2hpcFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtiYXR0bGVzaGlwXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJzcmNfc2NyaXB0c19nYW1lTG9vcF9qc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zY3JpcHRzL2luZGV4LmpzXCIpKSlcbl9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8oX193ZWJwYWNrX2V4cG9ydHNfXyk7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=