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

/**
 * @type {Number}
 */
let count = 1;

/**
 * @type {Number}
 */
let element;

/**
 * @type {Array<Number>}
 */
let lengths = [4, 3, 3, 2];

/**
 * @type {Number}
 */
let noOfShips = 1;

/**
 * records div id on click
 * @param {Object} e
 */
const record = (e) => {
  element = e.target.id;
};

/**
 * starts new turn
 * @param {Object} event
 */
const registerCellClick = (event) => {
  if (event.target.attributes["data-key"].nodeValue === "AI") {
    (0,_pubsub__WEBPACK_IMPORTED_MODULE_0__.publish)(
      "newTurn",
      JSON.parse(event.target.attributes["data-coords"].nodeValue)
    );
  }
};

/**
 * Attaches event listener to table cells
 * @function
 */
const tdEvent = () => {
  const tdList = document.querySelectorAll("td");
  tdList.forEach((td) => {
    td.addEventListener("click", registerCellClick, { once: true });
  });
};

/**
 * Removes event listener from table cells
 * @function
 */
const removeTdEvent = () => {
  const tdList = document.querySelectorAll("td");
  tdList.forEach((td) => {
    td.removeEventListener("click", registerCellClick, { once: true });
  });
};

/**
 * Starts new game
 * @param {Object} event
 */
const newGame = (event) => {
  const main = document.querySelector("main");
  main.style["opacity"] = "1";
  event.target.parentNode.remove();
  (0,_pubsub__WEBPACK_IMPORTED_MODULE_0__.publish)("restart");
};

/**
 * Attaches event listener to button
 * @function
 */
const newGameEvent = () => {
  const button = document.querySelector("#newGame");
  button.addEventListener("click", newGame);
};

/**
 * Changes ship direction
 * @param {Object} event
 */
const toggleDirection = (event) => {
  event.target.previousElementSibling.classList.toggle("flexer");
  if (count % 2 !== 0) {
    event.target.previousElementSibling.setAttribute("data-direction", "x");
  } else {
    event.target.previousElementSibling.setAttribute("data-direction", "y");
  }
  count++;
};

/**
 *
 * @param {Object} e
 */
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

/**
 *
 * @param {Object} e
 */
const dragEnd = (e) => {
  e.target.style.opacity = "";
};

/**
 *
 * @param {Object} e
 */
const dragEnter = (e) => {
  e.preventDefault();
};

/**
 *
 * @param {Object} e
 */
const dragOver = (e) => {
  e.preventDefault();
};

/**
 *
 * @param {Object} e
 */
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
      const p = document.querySelector("#display");
      p.textContent = "";
      aside.remove();
      lengths = [4, 3, 3, 2];
      noOfShips = 1;
    }
  }
};

/**
 * Adds drag event listeners
 * @function
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

/**
 * creates cells
 * @param {Number} y - horizontal coordinate
 * @param {Number} x - vertical coordinate
 * @param {String} title -table name
 * @return {Object}
 */
const createTableCells = (y, x, title) => {
  const td = document.createElement("td");
  td.setAttribute("data-key", `${title}`);
  td.setAttribute("data-coords", `${JSON.stringify([y - 1, x])}`);
  return td;
};

/**
 * creates Head
 * @param {Number} x - vertical coordinate
 * @return {Object} - cell
 */
const createTableHead = (x) => {
  const th = document.createElement("th");
  if (x !== 0) {
    th.textContent = `${x}`;
  }
  return th;
};

/**
 * creates rows
 * @param {Number} y - horizontal coordinate
 * @param {String} title -table name
 * @return {Object} -row
 */
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

/**
 * creates table
 * @param {*} title - table name
 * @return {Object} - table
 */
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

/**
 * creates draggable ships
 * @param {Number} length
 * @return {Object} - Ship div
 */
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

/**
 * Initial display
 * @function
 */
const displayGame = () => {
  const body = document.querySelector("body");
  const header = document.createElement("header");
  const h1 = document.createElement("h1");
  h1.textContent = "BATTLESHIP";
  const p = document.createElement("p");
  p.id = "display";
  p.textContent = "Place Your Ship!!!";
  header.appendChild(h1);
  header.appendChild(p);
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

/**
 *
 * @param {String} message - Winner message
 */
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

/**
 * crated div that contains ships
 * @function
 */
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

/**
 * displays gameboard
 * @param {Object} board -board to diplay
 * @param {string} name - name of board
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL21haW4uY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL3Jlc2V0LmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZXZlbnRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9nYW1lRGlzcGxheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZ2FtZWJvYXJkRGlzcGxheS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgeyBwdWJsaXNoIH0gZnJvbSBcIi4vcHVic3ViXCI7XG5pbXBvcnQgeyBjcmVhdGVEaXYgfSBmcm9tIFwiLi9nYW1lRGlzcGxheVwiO1xuaW1wb3J0IHsgYXJlU2hpcHNQbGFjZWQgfSBmcm9tIFwiLi9nYW1lTG9vcFwiO1xuXG4vLyBAdHMtY2hlY2tcblxuLyoqXG4gKiBAbW9kdWxlIGV2ZW50c1xuICovXG5cbi8qKlxuICogQHR5cGUge051bWJlcn1cbiAqL1xubGV0IGNvdW50ID0gMTtcblxuLyoqXG4gKiBAdHlwZSB7TnVtYmVyfVxuICovXG5sZXQgZWxlbWVudDtcblxuLyoqXG4gKiBAdHlwZSB7QXJyYXk8TnVtYmVyPn1cbiAqL1xubGV0IGxlbmd0aHMgPSBbNCwgMywgMywgMl07XG5cbi8qKlxuICogQHR5cGUge051bWJlcn1cbiAqL1xubGV0IG5vT2ZTaGlwcyA9IDE7XG5cbi8qKlxuICogcmVjb3JkcyBkaXYgaWQgb24gY2xpY2tcbiAqIEBwYXJhbSB7T2JqZWN0fSBlXG4gKi9cbmNvbnN0IHJlY29yZCA9IChlKSA9PiB7XG4gIGVsZW1lbnQgPSBlLnRhcmdldC5pZDtcbn07XG5cbi8qKlxuICogc3RhcnRzIG5ldyB0dXJuXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAqL1xuY29uc3QgcmVnaXN0ZXJDZWxsQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgaWYgKGV2ZW50LnRhcmdldC5hdHRyaWJ1dGVzW1wiZGF0YS1rZXlcIl0ubm9kZVZhbHVlID09PSBcIkFJXCIpIHtcbiAgICBwdWJsaXNoKFxuICAgICAgXCJuZXdUdXJuXCIsXG4gICAgICBKU09OLnBhcnNlKGV2ZW50LnRhcmdldC5hdHRyaWJ1dGVzW1wiZGF0YS1jb29yZHNcIl0ubm9kZVZhbHVlKVxuICAgICk7XG4gIH1cbn07XG5cbi8qKlxuICogQXR0YWNoZXMgZXZlbnQgbGlzdGVuZXIgdG8gdGFibGUgY2VsbHNcbiAqIEBmdW5jdGlvblxuICovXG5jb25zdCB0ZEV2ZW50ID0gKCkgPT4ge1xuICBjb25zdCB0ZExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwidGRcIik7XG4gIHRkTGlzdC5mb3JFYWNoKCh0ZCkgPT4ge1xuICAgIHRkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZWdpc3RlckNlbGxDbGljaywgeyBvbmNlOiB0cnVlIH0pO1xuICB9KTtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBldmVudCBsaXN0ZW5lciBmcm9tIHRhYmxlIGNlbGxzXG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgcmVtb3ZlVGRFdmVudCA9ICgpID0+IHtcbiAgY29uc3QgdGRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInRkXCIpO1xuICB0ZExpc3QuZm9yRWFjaCgodGQpID0+IHtcbiAgICB0ZC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVnaXN0ZXJDZWxsQ2xpY2ssIHsgb25jZTogdHJ1ZSB9KTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIFN0YXJ0cyBuZXcgZ2FtZVxuICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gKi9cbmNvbnN0IG5ld0dhbWUgPSAoZXZlbnQpID0+IHtcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuICBtYWluLnN0eWxlW1wib3BhY2l0eVwiXSA9IFwiMVwiO1xuICBldmVudC50YXJnZXQucGFyZW50Tm9kZS5yZW1vdmUoKTtcbiAgcHVibGlzaChcInJlc3RhcnRcIik7XG59O1xuXG4vKipcbiAqIEF0dGFjaGVzIGV2ZW50IGxpc3RlbmVyIHRvIGJ1dHRvblxuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IG5ld0dhbWVFdmVudCA9ICgpID0+IHtcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXdHYW1lXCIpO1xuICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG5ld0dhbWUpO1xufTtcblxuLyoqXG4gKiBDaGFuZ2VzIHNoaXAgZGlyZWN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAqL1xuY29uc3QgdG9nZ2xlRGlyZWN0aW9uID0gKGV2ZW50KSA9PiB7XG4gIGV2ZW50LnRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC50b2dnbGUoXCJmbGV4ZXJcIik7XG4gIGlmIChjb3VudCAlIDIgIT09IDApIHtcbiAgICBldmVudC50YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZy5zZXRBdHRyaWJ1dGUoXCJkYXRhLWRpcmVjdGlvblwiLCBcInhcIik7XG4gIH0gZWxzZSB7XG4gICAgZXZlbnQudGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcuc2V0QXR0cmlidXRlKFwiZGF0YS1kaXJlY3Rpb25cIiwgXCJ5XCIpO1xuICB9XG4gIGNvdW50Kys7XG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZVxuICovXG5jb25zdCBkcmFnU3RhcnQgPSAoZSkgPT4ge1xuICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKFxuICAgIFwidGV4dC9wbGFpblwiLFxuICAgIEpTT04uc3RyaW5naWZ5KFtcbiAgICAgIGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtZGlyZWN0aW9uXCIpLFxuICAgICAgZS50YXJnZXQuY2hpbGRyZW4ubGVuZ3RoLFxuICAgIF0pXG4gICk7XG4gIGUudGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSBcIjAuNVwiO1xufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGVcbiAqL1xuY29uc3QgZHJhZ0VuZCA9IChlKSA9PiB7XG4gIGUudGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSBcIlwiO1xufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGVcbiAqL1xuY29uc3QgZHJhZ0VudGVyID0gKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGVcbiAqL1xuY29uc3QgZHJhZ092ZXIgPSAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZVxuICovXG5jb25zdCBkcm9wID0gKGUpID0+IHtcbiAgY291bnQgPSAxO1xuICBjb25zdCBTaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNTaGlwXCIpO1xuICBjb25zdCBhc2lkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJhc2lkZVwiKTtcbiAgY29uc3QgaWQgPSBKU09OLnBhcnNlKGUuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0L3BsYWluXCIpKTtcbiAgY29uc3QgY29vcmRzID0gSlNPTi5wYXJzZShlLnRhcmdldC5hdHRyaWJ1dGVzW1wiZGF0YS1jb29yZHNcIl0ubm9kZVZhbHVlKTtcbiAgcHVibGlzaChcInNldFVwXCIsIGlkWzFdLCBjb29yZHMsIGlkWzBdLCBlbGVtZW50KTtcbiAgaWYgKGFyZVNoaXBzUGxhY2VkKG5vT2ZTaGlwcykpIHtcbiAgICBTaGlwLnJlbW92ZSgpO1xuICAgIGlmIChsZW5ndGhzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IG5ld1NoaXAgPSBjcmVhdGVEaXYobGVuZ3Roc1swXSk7XG4gICAgICBhc2lkZS5pbnNlcnRCZWZvcmUobmV3U2hpcCwgYXNpZGUuY2hpbGRyZW5bMF0pO1xuICAgICAgbmV3U2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGRyYWdTdGFydCk7XG4gICAgICBuZXdTaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW5kXCIsIGRyYWdFbmQpO1xuICAgICAgbGVuZ3Rocy5zaGlmdCgpO1xuICAgICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRpdmlzaW9uXCIpO1xuICAgICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgcmVjb3JkKTtcbiAgICAgIH0pO1xuICAgICAgbm9PZlNoaXBzKys7XG4gICAgfSBlbHNlIGlmIChsZW5ndGhzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc3QgcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGlzcGxheVwiKTtcbiAgICAgIHAudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgYXNpZGUucmVtb3ZlKCk7XG4gICAgICBsZW5ndGhzID0gWzQsIDMsIDMsIDJdO1xuICAgICAgbm9PZlNoaXBzID0gMTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogQWRkcyBkcmFnIGV2ZW50IGxpc3RlbmVyc1xuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIHRvZ2dsZURpcmVjdGlvbkV2ZW50KCkge1xuICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZGl2aXNpb25cIik7XG4gIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgcmVjb3JkKTtcbiAgfSk7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9nZ2xlXCIpO1xuICBjb25zdCBzaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNTaGlwXCIpO1xuICBjb25zdCBib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1rZXk9J1BsYXllcjEnXVwiKTtcbiAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVEaXJlY3Rpb24pO1xuICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgZHJhZ1N0YXJ0KTtcbiAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCBkcmFnRW5kKTtcbiAgYm94ZXMuZm9yRWFjaCgoYm94KSA9PiB7XG4gICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW50ZXJcIiwgZHJhZ0VudGVyKTtcbiAgICBib3guYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIGRyYWdPdmVyKTtcbiAgICBib3guYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgZHJvcCk7XG4gIH0pO1xufVxuXG5leHBvcnQgeyB0ZEV2ZW50LCByZW1vdmVUZEV2ZW50LCBuZXdHYW1lRXZlbnQsIHRvZ2dsZURpcmVjdGlvbkV2ZW50IH07XG4iLCJpbXBvcnQgeyBwdWJsaXNoIH0gZnJvbSBcIi4vcHVic3ViXCI7XG5cbi8vIEB0cy1jaGVja1xuXG4vKipcbiAqIEBtb2R1bGUgZ2FtZURpc3BsYXlcbiAqL1xuXG4vKipcbiAqIGNyZWF0ZXMgY2VsbHNcbiAqIEBwYXJhbSB7TnVtYmVyfSB5IC0gaG9yaXpvbnRhbCBjb29yZGluYXRlXG4gKiBAcGFyYW0ge051bWJlcn0geCAtIHZlcnRpY2FsIGNvb3JkaW5hdGVcbiAqIEBwYXJhbSB7U3RyaW5nfSB0aXRsZSAtdGFibGUgbmFtZVxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5jb25zdCBjcmVhdGVUYWJsZUNlbGxzID0gKHksIHgsIHRpdGxlKSA9PiB7XG4gIGNvbnN0IHRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICB0ZC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWtleVwiLCBgJHt0aXRsZX1gKTtcbiAgdGQuc2V0QXR0cmlidXRlKFwiZGF0YS1jb29yZHNcIiwgYCR7SlNPTi5zdHJpbmdpZnkoW3kgLSAxLCB4XSl9YCk7XG4gIHJldHVybiB0ZDtcbn07XG5cbi8qKlxuICogY3JlYXRlcyBIZWFkXG4gKiBAcGFyYW0ge051bWJlcn0geCAtIHZlcnRpY2FsIGNvb3JkaW5hdGVcbiAqIEByZXR1cm4ge09iamVjdH0gLSBjZWxsXG4gKi9cbmNvbnN0IGNyZWF0ZVRhYmxlSGVhZCA9ICh4KSA9PiB7XG4gIGNvbnN0IHRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xuICBpZiAoeCAhPT0gMCkge1xuICAgIHRoLnRleHRDb250ZW50ID0gYCR7eH1gO1xuICB9XG4gIHJldHVybiB0aDtcbn07XG5cbi8qKlxuICogY3JlYXRlcyByb3dzXG4gKiBAcGFyYW0ge051bWJlcn0geSAtIGhvcml6b250YWwgY29vcmRpbmF0ZVxuICogQHBhcmFtIHtTdHJpbmd9IHRpdGxlIC10YWJsZSBuYW1lXG4gKiBAcmV0dXJuIHtPYmplY3R9IC1yb3dcbiAqL1xuY29uc3QgY3JlYXRlVGFibGVSb3dzID0gKHksIHRpdGxlKSA9PiB7XG4gIGNvbnN0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xuICB0ci5pZCA9IGAke3RpdGxlfWJvYXJkLXJvdyR7eX1gO1xuICBpZiAoeSAhPT0gMCkge1xuICAgIGNvbnN0IHRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xuICAgIHRyLmFwcGVuZENoaWxkKHRoKTtcbiAgICB0aC50ZXh0Q29udGVudCA9IGAke1N0cmluZy5mcm9tQ2hhckNvZGUoNjQgKyB5KX1gO1xuXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCsrKSB7XG4gICAgICB0ci5hcHBlbmRDaGlsZChjcmVhdGVUYWJsZUNlbGxzKHksIHgsIHRpdGxlKSk7XG4gICAgfVxuICAgIHJldHVybiB0cjtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8PSAxMDsgeCsrKSB7XG4gICAgICB0ci5hcHBlbmRDaGlsZChjcmVhdGVUYWJsZUhlYWQoeSwgeCwgdGl0bGUpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRyO1xuICB9XG59O1xuXG4vKipcbiAqIGNyZWF0ZXMgdGFibGVcbiAqIEBwYXJhbSB7Kn0gdGl0bGUgLSB0YWJsZSBuYW1lXG4gKiBAcmV0dXJuIHtPYmplY3R9IC0gdGFibGVcbiAqL1xuY29uc3QgY3JlYXRlQm9hcmQgPSAodGl0bGUpID0+IHtcbiAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XG4gIHRhYmxlLmlkID0gdGl0bGU7XG4gIGNvbnN0IGNhcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FwdGlvblwiKTtcbiAgY29uc3QgaDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gIGgyLnRleHRDb250ZW50ID0gdGl0bGU7XG4gIGNhcHRpb24uYXBwZW5kQ2hpbGQoaDIpO1xuICB0YWJsZS5hcHBlbmRDaGlsZChjYXB0aW9uKTtcbiAgZm9yIChsZXQgeSA9IDA7IHkgPD0gMTA7IHkrKykge1xuICAgIHRhYmxlLmFwcGVuZENoaWxkKGNyZWF0ZVRhYmxlUm93cyh5LCB0aXRsZSkpO1xuICB9XG4gIHJldHVybiB0YWJsZTtcbn07XG5cbi8qKlxuICogY3JlYXRlcyBkcmFnZ2FibGUgc2hpcHNcbiAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGhcbiAqIEByZXR1cm4ge09iamVjdH0gLSBTaGlwIGRpdlxuICovXG5jb25zdCBjcmVhdGVEaXYgPSAobGVuZ3RoKSA9PiB7XG4gIGNvbnN0IG1haW5EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBtYWluRGl2LmlkID0gXCJTaGlwXCI7XG4gIG1haW5EaXYuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIFwidHJ1ZVwiKTtcbiAgbWFpbkRpdi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWRpcmVjdGlvblwiLCBcInlcIik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGJveC5jbGFzc05hbWUgPSBcImRpdmlzaW9uXCI7XG4gICAgYm94LmlkID0gYCR7aX1gO1xuICAgIG1haW5EaXYuYXBwZW5kQ2hpbGQoYm94KTtcbiAgfVxuICByZXR1cm4gbWFpbkRpdjtcbn07XG5cbi8qKlxuICogSW5pdGlhbCBkaXNwbGF5XG4gKiBAZnVuY3Rpb25cbiAqL1xuY29uc3QgZGlzcGxheUdhbWUgPSAoKSA9PiB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgY29uc3QgaDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gIGgxLnRleHRDb250ZW50ID0gXCJCQVRUTEVTSElQXCI7XG4gIGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgcC5pZCA9IFwiZGlzcGxheVwiO1xuICBwLnRleHRDb250ZW50ID0gXCJQbGFjZSBZb3VyIFNoaXAhISFcIjtcbiAgaGVhZGVyLmFwcGVuZENoaWxkKGgxKTtcbiAgaGVhZGVyLmFwcGVuZENoaWxkKHApO1xuICBib2R5LmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibWFpblwiKTtcbiAgbWFpbi5hcHBlbmRDaGlsZChjcmVhdGVCb2FyZChcIlBsYXllcjFcIikpO1xuICBtYWluLmFwcGVuZENoaWxkKGNyZWF0ZUJvYXJkKFwiQUlcIikpO1xuICBib2R5LmFwcGVuZENoaWxkKG1haW4pO1xuICBjb25zdCBhc2lkZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhc2lkZVwiKTtcbiAgYXNpZGUuYXBwZW5kQ2hpbGQoY3JlYXRlRGl2KDUpKTtcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgYnV0dG9uLmlkID0gXCJ0b2dnbGVcIjtcbiAgYnV0dG9uLnRleHRDb250ZW50ID0gXCJDaGFuZ2UgQXhpc1wiO1xuICBhc2lkZS5hcHBlbmRDaGlsZChidXR0b24pO1xuICBidXR0b24uY2xhc3NMaXN0LmFkZChcImJ1dHRvblwiKTtcbiAgYm9keS5hcHBlbmRDaGlsZChhc2lkZSk7XG4gIHB1Ymxpc2goXCJ0b2dnbGVFdmVudFwiKTtcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIC0gV2lubmVyIG1lc3NhZ2VcbiAqL1xuY29uc3QgZGlzcGxheUdhbWVPdmVyID0gKG1lc3NhZ2UpID0+IHtcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG4gIG1haW4uc3R5bGVbXCJvcGFjaXR5XCJdID0gXCIwLjVcIjtcbiAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNhcmQuaWQgPSBcImNhcmRcIjtcbiAgY29uc3QgY2FyZFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgY2FyZFRleHQudGV4dENvbnRlbnQgPSBgJHttZXNzYWdlfWA7XG4gIGNhcmQuYXBwZW5kQ2hpbGQoY2FyZFRleHQpO1xuICBjb25zdCBuZXdHYW1lQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgbmV3R2FtZUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiTmV3IEdhbWVcIjtcbiAgbmV3R2FtZUJ1dHRvbi5pZCA9IFwibmV3R2FtZVwiO1xuICBuZXdHYW1lQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidXR0b25cIik7XG4gIGNhcmQuYXBwZW5kQ2hpbGQobmV3R2FtZUJ1dHRvbik7XG4gIGJvZHkuYXBwZW5kQ2hpbGQoY2FyZCk7XG59O1xuXG4vKipcbiAqIGNyYXRlZCBkaXYgdGhhdCBjb250YWlucyBzaGlwc1xuICogQGZ1bmN0aW9uXG4gKi9cbmNvbnN0IG5ld0RyYWdCb3ggPSAoKSA9PiB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbiAgY29uc3QgYXNpZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXNpZGVcIik7XG4gIGFzaWRlLmFwcGVuZENoaWxkKGNyZWF0ZURpdig1KSk7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGJ1dHRvbi5pZCA9IFwidG9nZ2xlXCI7XG4gIGJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQ2hhbmdlIEF4aXNcIjtcbiAgYXNpZGUuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidXR0b25cIik7XG4gIGJvZHkuYXBwZW5kQ2hpbGQoYXNpZGUpO1xuICBwdWJsaXNoKFwidG9nZ2xlRXZlbnRcIik7XG59O1xuXG5leHBvcnQgeyBkaXNwbGF5R2FtZSwgZGlzcGxheUdhbWVPdmVyLCBjcmVhdGVEaXYsIG5ld0RyYWdCb3ggfTtcbiIsIi8qKlxuICogQG1vZHVsZSBnYW1lYm9hcmREaXNwbGF5XG4gKi9cblxuLyoqXG4gKiBkaXNwbGF5cyBnYW1lYm9hcmRcbiAqIEBwYXJhbSB7T2JqZWN0fSBib2FyZCAtYm9hcmQgdG8gZGlwbGF5XG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIG5hbWUgb2YgYm9hcmRcbiAqL1xuY29uc3QgZ2FtZWJvYXJkRGlzcGxheSA9IChib2FyZCwgbmFtZSkgPT4ge1xuICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25hbWV9YCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGJvYXJkW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBjZWxsID0gdGFibGUucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYFtkYXRhLWNvb3Jkcz1cIiR7SlNPTi5zdHJpbmdpZnkoW2ksIGpdKX1cIl1gXG4gICAgICApO1xuICAgICAgaWYgKGJvYXJkW2ldW2pdID09PSBudWxsKSB7XG4gICAgICAgIGNlbGwuc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gXCJ3aGl0ZVwiO1xuICAgICAgfSBlbHNlIGlmIChib2FyZFtpXVtqXSA9PT0gXCJtaXNzXCIpIHtcbiAgICAgICAgY2VsbC5zdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSBcInllbGxvd1wiO1xuICAgICAgICBjZWxsLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgIH0gZWxzZSBpZiAoIWJvYXJkW2ldW2pdLmlzSGl0ICYmIG5hbWUgPT09IFwiUGxheWVyMVwiKSB7XG4gICAgICAgIGNlbGwuc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gXCJncmV5XCI7XG4gICAgICB9IGVsc2UgaWYgKGJvYXJkW2ldW2pdLmlzSGl0KSB7XG4gICAgICAgIGNlbGwuc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gXCJyZWRcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNlbGwuc3R5bGVbXCJiYWNrZ3JvdW5kLWNvbG9yXCJdID0gXCJ3aGl0ZVwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IHsgZ2FtZWJvYXJkRGlzcGxheSB9O1xuIiwiaW1wb3J0IFwiLi4vc3R5bGVzL3Jlc2V0LmNzc1wiO1xuaW1wb3J0IFwiLi4vc3R5bGVzL21haW4uY3NzXCI7XG5pbXBvcnQgeyBkaXNwbGF5R2FtZSwgbmV3RHJhZ0JveCB9IGZyb20gXCIuL2dhbWVEaXNwbGF5XCI7XG5pbXBvcnQgeyBnYW1lLCBzZXRVcCB9IGZyb20gXCIuL2dhbWVMb29wXCI7XG5pbXBvcnQgeyBnYW1lYm9hcmREaXNwbGF5IH0gZnJvbSBcIi4vZ2FtZWJvYXJkRGlzcGxheVwiO1xuaW1wb3J0IHsgc3Vic2NyaWJlIH0gZnJvbSBcIi4vcHVic3ViXCI7XG5pbXBvcnQge1xuICB0ZEV2ZW50LFxuICByZW1vdmVUZEV2ZW50LFxuICBuZXdHYW1lRXZlbnQsXG4gIHRvZ2dsZURpcmVjdGlvbkV2ZW50LFxufSBmcm9tIFwiLi9ldmVudHNcIjtcbmltcG9ydCB7IGRpc3BsYXlHYW1lT3ZlciB9IGZyb20gXCIuL2dhbWVEaXNwbGF5XCI7XG5cbi8vIEB0cy1jaGVja1xuXG4vKipcbiAqIEBmaWxlb3ZlcnZpZXcgSW5kZXguanMgaXMgdGhlIHJyb3QgZmlsZSBvZiB0aGlzIHByb2plY3QuXG4gKiBAYXV0aG9yIEZyb3N0d2Fsa2VyXG4gKi9cblxuc3Vic2NyaWJlKFwidG9nZ2xlRXZlbnRcIiwgdG9nZ2xlRGlyZWN0aW9uRXZlbnQpO1xuXG5kaXNwbGF5R2FtZSgpO1xuXG5zdWJzY3JpYmUoXCJzZXRVcFwiLCBzZXRVcCk7XG5cbnN1YnNjcmliZShcImNlbGxDbGlja1wiLCB0ZEV2ZW50KTtcblxuc3Vic2NyaWJlKFwicmVtb3ZlQ2VsbENsaWNrXCIsIHJlbW92ZVRkRXZlbnQpO1xuXG5zdWJzY3JpYmUoXCJkaXNwbGF5R2FtZWJvYXJkXCIsIGdhbWVib2FyZERpc3BsYXkpO1xuXG5zdWJzY3JpYmUoXCJnYW1lT3ZlclwiLCBkaXNwbGF5R2FtZU92ZXIpO1xuXG5zdWJzY3JpYmUoXCJuZXdHYW1lXCIsIG5ld0dhbWVFdmVudCk7XG5cbnN1YnNjcmliZShcInJlc3RhcnRcIiwgbmV3RHJhZ0JveCk7XG5cbmdhbWUoKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImluZGV4XCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkc1tpXV0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtiYXR0bGVzaGlwXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2JhdHRsZXNoaXBcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInNyY19zY3JpcHRzX2dhbWVMb29wX2pzXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3NjcmlwdHMvaW5kZXguanNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==