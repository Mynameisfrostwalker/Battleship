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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9tYWluLmNzcz81ODQ2Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL3Jlc2V0LmNzcz9kZDUxIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2dhbWVEaXNwbGF5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9nYW1lYm9hcmREaXNwbGF5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2NyaXB0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IHB1Ymxpc2ggfSBmcm9tIFwiLi9wdWJzdWJcIjtcbmltcG9ydCB7IGNyZWF0ZURpdiB9IGZyb20gXCIuL2dhbWVEaXNwbGF5XCI7XG5pbXBvcnQgeyBhcmVTaGlwc1BsYWNlZCB9IGZyb20gXCIuL2dhbWVMb29wXCI7XG5cbi8vIEB0cy1jaGVja1xuXG4vKipcbiAqIEBtb2R1bGUgZXZlbnRzXG4gKi9cblxubGV0IGNvdW50ID0gMTtcblxubGV0IGVsZW1lbnQ7XG5cbmxldCBsZW5ndGhzID0gWzQsIDMsIDMsIDJdO1xuXG5sZXQgbm9PZlNoaXBzID0gMTtcblxuY29uc3QgcmVjb3JkID0gKGUpID0+IHtcbiAgZWxlbWVudCA9IGUudGFyZ2V0LmlkO1xufTtcblxuY29uc3QgcmVnaXN0ZXJDZWxsQ2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgaWYgKGV2ZW50LnRhcmdldC5hdHRyaWJ1dGVzW1wiZGF0YS1rZXlcIl0ubm9kZVZhbHVlID09PSBcIkFJXCIpIHtcbiAgICBwdWJsaXNoKFxuICAgICAgXCJuZXdUdXJuXCIsXG4gICAgICBKU09OLnBhcnNlKGV2ZW50LnRhcmdldC5hdHRyaWJ1dGVzW1wiZGF0YS1jb29yZHNcIl0ubm9kZVZhbHVlKVxuICAgICk7XG4gIH1cbn07XG5cbmNvbnN0IHRkRXZlbnQgPSAoKSA9PiB7XG4gIGNvbnN0IHRkTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJ0ZFwiKTtcbiAgdGRMaXN0LmZvckVhY2goKHRkKSA9PiB7XG4gICAgdGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlZ2lzdGVyQ2VsbENsaWNrLCB7IG9uY2U6IHRydWUgfSk7XG4gIH0pO1xufTtcblxuY29uc3QgcmVtb3ZlVGRFdmVudCA9ICgpID0+IHtcbiAgY29uc3QgdGRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInRkXCIpO1xuICB0ZExpc3QuZm9yRWFjaCgodGQpID0+IHtcbiAgICB0ZC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcmVnaXN0ZXJDZWxsQ2xpY2ssIHsgb25jZTogdHJ1ZSB9KTtcbiAgfSk7XG59O1xuXG5jb25zdCBuZXdHYW1lID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcbiAgbWFpbi5zdHlsZVtcIm9wYWNpdHlcIl0gPSBcIjFcIjtcbiAgZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUucmVtb3ZlKCk7XG4gIHB1Ymxpc2goXCJyZXN0YXJ0XCIpO1xufTtcblxuY29uc3QgbmV3R2FtZUV2ZW50ID0gKCkgPT4ge1xuICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ld0dhbWVcIik7XG4gIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbmV3R2FtZSk7XG59O1xuXG5jb25zdCB0b2dnbGVEaXJlY3Rpb24gPSAoZXZlbnQpID0+IHtcbiAgZXZlbnQudGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZShcImZsZXhlclwiKTtcbiAgaWYgKGNvdW50ICUgMiAhPT0gMCkge1xuICAgIGV2ZW50LnRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnNldEF0dHJpYnV0ZShcImRhdGEtZGlyZWN0aW9uXCIsIFwieFwiKTtcbiAgfSBlbHNlIHtcbiAgICBldmVudC50YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZy5zZXRBdHRyaWJ1dGUoXCJkYXRhLWRpcmVjdGlvblwiLCBcInlcIik7XG4gIH1cbiAgY291bnQrKztcbn07XG5cbmNvbnN0IGRyYWdTdGFydCA9IChlKSA9PiB7XG4gIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoXG4gICAgXCJ0ZXh0L3BsYWluXCIsXG4gICAgSlNPTi5zdHJpbmdpZnkoW1xuICAgICAgZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1kaXJlY3Rpb25cIiksXG4gICAgICBlLnRhcmdldC5jaGlsZHJlbi5sZW5ndGgsXG4gICAgXSlcbiAgKTtcbiAgZS50YXJnZXQuc3R5bGUub3BhY2l0eSA9IFwiMC41XCI7XG59O1xuXG5jb25zdCBkcmFnRW5kID0gKGUpID0+IHtcbiAgZS50YXJnZXQuc3R5bGUub3BhY2l0eSA9IFwiXCI7XG59O1xuXG5jb25zdCBkcmFnRW50ZXIgPSAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG59O1xuXG5jb25zdCBkcmFnT3ZlciA9IChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbn07XG5cbmNvbnN0IGRyb3AgPSAoZSkgPT4ge1xuICBjb3VudCA9IDE7XG4gIGNvbnN0IFNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1NoaXBcIik7XG4gIGNvbnN0IGFzaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImFzaWRlXCIpO1xuICBjb25zdCBpZCA9IEpTT04ucGFyc2UoZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHQvcGxhaW5cIikpO1xuICBjb25zdCBjb29yZHMgPSBKU09OLnBhcnNlKGUudGFyZ2V0LmF0dHJpYnV0ZXNbXCJkYXRhLWNvb3Jkc1wiXS5ub2RlVmFsdWUpO1xuICBwdWJsaXNoKFwic2V0VXBcIiwgaWRbMV0sIGNvb3JkcywgaWRbMF0sIGVsZW1lbnQpO1xuICBpZiAoYXJlU2hpcHNQbGFjZWQobm9PZlNoaXBzKSkge1xuICAgIFNoaXAucmVtb3ZlKCk7XG4gICAgaWYgKGxlbmd0aHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgbmV3U2hpcCA9IGNyZWF0ZURpdihsZW5ndGhzWzBdKTtcbiAgICAgIGFzaWRlLmluc2VydEJlZm9yZShuZXdTaGlwLCBhc2lkZS5jaGlsZHJlblswXSk7XG4gICAgICBuZXdTaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgZHJhZ1N0YXJ0KTtcbiAgICAgIG5ld1NoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgZHJhZ0VuZCk7XG4gICAgICBsZW5ndGhzLnNoaWZ0KCk7XG4gICAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZGl2aXNpb25cIik7XG4gICAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCByZWNvcmQpO1xuICAgICAgfSk7XG4gICAgICBub09mU2hpcHMrKztcbiAgICB9IGVsc2UgaWYgKGxlbmd0aHMubGVuZ3RoID09PSAwKSB7XG4gICAgICBhc2lkZS5yZW1vdmUoKTtcbiAgICAgIGxlbmd0aHMgPSBbNCwgMywgMywgMl07XG4gICAgICBub09mU2hpcHMgPSAxO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBBZGRzIGRyYWcgZXZlbnQgbGlzdGVuZXJzXG4gKi9cbmZ1bmN0aW9uIHRvZ2dsZURpcmVjdGlvbkV2ZW50KCkge1xuICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZGl2aXNpb25cIik7XG4gIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgcmVjb3JkKTtcbiAgfSk7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9nZ2xlXCIpO1xuICBjb25zdCBzaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNTaGlwXCIpO1xuICBjb25zdCBib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZGF0YS1rZXk9J1BsYXllcjEnXVwiKTtcbiAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVEaXJlY3Rpb24pO1xuICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgZHJhZ1N0YXJ0KTtcbiAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCBkcmFnRW5kKTtcbiAgYm94ZXMuZm9yRWFjaCgoYm94KSA9PiB7XG4gICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW50ZXJcIiwgZHJhZ0VudGVyKTtcbiAgICBib3guYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIGRyYWdPdmVyKTtcbiAgICBib3guYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgZHJvcCk7XG4gIH0pO1xufVxuXG5leHBvcnQgeyB0ZEV2ZW50LCByZW1vdmVUZEV2ZW50LCBuZXdHYW1lRXZlbnQsIHRvZ2dsZURpcmVjdGlvbkV2ZW50IH07XG4iLCJpbXBvcnQgeyBwdWJsaXNoIH0gZnJvbSBcIi4vcHVic3ViXCI7XG5cbi8vIEB0cy1jaGVja1xuXG4vKipcbiAqIEBtb2R1bGUgZ2FtZURpc3BsYXlcbiAqL1xuXG5jb25zdCBjcmVhdGVUYWJsZUNlbGxzID0gKHksIHgsIHRpdGxlKSA9PiB7XG4gIGNvbnN0IHRkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICB0ZC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWtleVwiLCBgJHt0aXRsZX1gKTtcbiAgdGQuc2V0QXR0cmlidXRlKFwiZGF0YS1jb29yZHNcIiwgYCR7SlNPTi5zdHJpbmdpZnkoW3kgLSAxLCB4XSl9YCk7XG4gIHJldHVybiB0ZDtcbn07XG5cbmNvbnN0IGNyZWF0ZVRhYmxlSGVhZCA9ICh5LCB4LCB0aXRsZSkgPT4ge1xuICBjb25zdCB0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcbiAgaWYgKHggIT09IDApIHtcbiAgICB0aC50ZXh0Q29udGVudCA9IGAke3h9YDtcbiAgfVxuICByZXR1cm4gdGg7XG59O1xuXG5jb25zdCBjcmVhdGVUYWJsZVJvd3MgPSAoeSwgdGl0bGUpID0+IHtcbiAgY29uc3QgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XG4gIHRyLmlkID0gYCR7dGl0bGV9Ym9hcmQtcm93JHt5fWA7XG4gIGlmICh5ICE9PSAwKSB7XG4gICAgY29uc3QgdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XG4gICAgdHIuYXBwZW5kQ2hpbGQodGgpO1xuICAgIHRoLnRleHRDb250ZW50ID0gYCR7U3RyaW5nLmZyb21DaGFyQ29kZSg2NCArIHkpfWA7XG5cbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwOyB4KyspIHtcbiAgICAgIHRyLmFwcGVuZENoaWxkKGNyZWF0ZVRhYmxlQ2VsbHMoeSwgeCwgdGl0bGUpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRyO1xuICB9IGVsc2Uge1xuICAgIGZvciAobGV0IHggPSAwOyB4IDw9IDEwOyB4KyspIHtcbiAgICAgIHRyLmFwcGVuZENoaWxkKGNyZWF0ZVRhYmxlSGVhZCh5LCB4LCB0aXRsZSkpO1xuICAgIH1cbiAgICByZXR1cm4gdHI7XG4gIH1cbn07XG5cbmNvbnN0IGNyZWF0ZUJvYXJkID0gKHRpdGxlKSA9PiB7XG4gIGNvbnN0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xuICB0YWJsZS5pZCA9IHRpdGxlO1xuICBjb25zdCBjYXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhcHRpb25cIik7XG4gIGNvbnN0IGgyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICBoMi50ZXh0Q29udGVudCA9IHRpdGxlO1xuICBjYXB0aW9uLmFwcGVuZENoaWxkKGgyKTtcbiAgdGFibGUuYXBwZW5kQ2hpbGQoY2FwdGlvbik7XG4gIGZvciAobGV0IHkgPSAwOyB5IDw9IDEwOyB5KyspIHtcbiAgICB0YWJsZS5hcHBlbmRDaGlsZChjcmVhdGVUYWJsZVJvd3MoeSwgdGl0bGUpKTtcbiAgfVxuICByZXR1cm4gdGFibGU7XG59O1xuXG5jb25zdCBjcmVhdGVEaXYgPSAobGVuZ3RoKSA9PiB7XG4gIGNvbnN0IG1haW5EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBtYWluRGl2LmlkID0gXCJTaGlwXCI7XG4gIG1haW5EaXYuc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIFwidHJ1ZVwiKTtcbiAgbWFpbkRpdi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWRpcmVjdGlvblwiLCBcInlcIik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGJveC5jbGFzc05hbWUgPSBcImRpdmlzaW9uXCI7XG4gICAgYm94LmlkID0gYCR7aX1gO1xuICAgIG1haW5EaXYuYXBwZW5kQ2hpbGQoYm94KTtcbiAgfVxuICByZXR1cm4gbWFpbkRpdjtcbn07XG5cbmNvbnN0IGRpc3BsYXlHYW1lID0gKCkgPT4ge1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIik7XG4gIGNvbnN0IGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICBoMS50ZXh0Q29udGVudCA9IFwiQkFUVExFU0hJUFwiO1xuICBoZWFkZXIuYXBwZW5kQ2hpbGQoaDEpO1xuICBib2R5LmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibWFpblwiKTtcbiAgbWFpbi5hcHBlbmRDaGlsZChjcmVhdGVCb2FyZChcIlBsYXllcjFcIikpO1xuICBtYWluLmFwcGVuZENoaWxkKGNyZWF0ZUJvYXJkKFwiQUlcIikpO1xuICBib2R5LmFwcGVuZENoaWxkKG1haW4pO1xuICBjb25zdCBhc2lkZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhc2lkZVwiKTtcbiAgYXNpZGUuYXBwZW5kQ2hpbGQoY3JlYXRlRGl2KDUpKTtcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgYnV0dG9uLmlkID0gXCJ0b2dnbGVcIjtcbiAgYnV0dG9uLnRleHRDb250ZW50ID0gXCJDaGFuZ2UgQXhpc1wiO1xuICBhc2lkZS5hcHBlbmRDaGlsZChidXR0b24pO1xuICBidXR0b24uY2xhc3NMaXN0LmFkZChcImJ1dHRvblwiKTtcbiAgYm9keS5hcHBlbmRDaGlsZChhc2lkZSk7XG4gIHB1Ymxpc2goXCJ0b2dnbGVFdmVudFwiKTtcbn07XG5cbmNvbnN0IGRpc3BsYXlHYW1lT3ZlciA9IChtZXNzYWdlKSA9PiB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuICBtYWluLnN0eWxlW1wib3BhY2l0eVwiXSA9IFwiMC41XCI7XG4gIGNvbnN0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjYXJkLmlkID0gXCJjYXJkXCI7XG4gIGNvbnN0IGNhcmRUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGNhcmRUZXh0LnRleHRDb250ZW50ID0gYCR7bWVzc2FnZX1gO1xuICBjYXJkLmFwcGVuZENoaWxkKGNhcmRUZXh0KTtcbiAgY29uc3QgbmV3R2FtZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIG5ld0dhbWVCdXR0b24udGV4dENvbnRlbnQgPSBcIk5ldyBHYW1lXCI7XG4gIG5ld0dhbWVCdXR0b24uaWQgPSBcIm5ld0dhbWVcIjtcbiAgbmV3R2FtZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uXCIpO1xuICBjYXJkLmFwcGVuZENoaWxkKG5ld0dhbWVCdXR0b24pO1xuICBib2R5LmFwcGVuZENoaWxkKGNhcmQpO1xufTtcblxuY29uc3QgbmV3RHJhZ0JveCA9ICgpID0+IHtcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuICBjb25zdCBhc2lkZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhc2lkZVwiKTtcbiAgYXNpZGUuYXBwZW5kQ2hpbGQoY3JlYXRlRGl2KDUpKTtcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgYnV0dG9uLmlkID0gXCJ0b2dnbGVcIjtcbiAgYnV0dG9uLnRleHRDb250ZW50ID0gXCJDaGFuZ2UgQXhpc1wiO1xuICBhc2lkZS5hcHBlbmRDaGlsZChidXR0b24pO1xuICBidXR0b24uY2xhc3NMaXN0LmFkZChcImJ1dHRvblwiKTtcbiAgYm9keS5hcHBlbmRDaGlsZChhc2lkZSk7XG4gIHB1Ymxpc2goXCJ0b2dnbGVFdmVudFwiKTtcbn07XG5cbmV4cG9ydCB7IGRpc3BsYXlHYW1lLCBkaXNwbGF5R2FtZU92ZXIsIGNyZWF0ZURpdiwgbmV3RHJhZ0JveCB9O1xuIiwiLyoqXG4gKiBAbW9kdWxlIGdhbWVib2FyZERpc3BsYXlcbiAqL1xuXG5jb25zdCBnYW1lYm9hcmREaXNwbGF5ID0gKGJvYXJkLCBuYW1lKSA9PiB7XG4gIGNvbnN0IHRhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bmFtZX1gKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBib2FyZC5sZW5ndGg7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgYm9hcmRbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IGNlbGwgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgW2RhdGEtY29vcmRzPVwiJHtKU09OLnN0cmluZ2lmeShbaSwgal0pfVwiXWBcbiAgICAgICk7XG4gICAgICBpZiAoYm9hcmRbaV1bal0gPT09IG51bGwpIHtcbiAgICAgICAgY2VsbC5zdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSBcIndoaXRlXCI7XG4gICAgICB9IGVsc2UgaWYgKGJvYXJkW2ldW2pdID09PSBcIm1pc3NcIikge1xuICAgICAgICBjZWxsLnN0eWxlW1wiYmFja2dyb3VuZC1jb2xvclwiXSA9IFwieWVsbG93XCI7XG4gICAgICAgIGNlbGwudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgfSBlbHNlIGlmICghYm9hcmRbaV1bal0uaXNIaXQgJiYgbmFtZSA9PT0gXCJQbGF5ZXIxXCIpIHtcbiAgICAgICAgY2VsbC5zdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSBcImdyZXlcIjtcbiAgICAgIH0gZWxzZSBpZiAoYm9hcmRbaV1bal0uaXNIaXQpIHtcbiAgICAgICAgY2VsbC5zdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSBcInJlZFwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbC5zdHlsZVtcImJhY2tncm91bmQtY29sb3JcIl0gPSBcIndoaXRlXCI7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgeyBnYW1lYm9hcmREaXNwbGF5IH07XG4iLCJpbXBvcnQgXCIuLi9zdHlsZXMvcmVzZXQuY3NzXCI7XG5pbXBvcnQgXCIuLi9zdHlsZXMvbWFpbi5jc3NcIjtcbmltcG9ydCB7IGRpc3BsYXlHYW1lLCBuZXdEcmFnQm94IH0gZnJvbSBcIi4vZ2FtZURpc3BsYXlcIjtcbmltcG9ydCB7IGdhbWUsIHNldFVwIH0gZnJvbSBcIi4vZ2FtZUxvb3BcIjtcbmltcG9ydCB7IGdhbWVib2FyZERpc3BsYXkgfSBmcm9tIFwiLi9nYW1lYm9hcmREaXNwbGF5XCI7XG5pbXBvcnQgeyBzdWJzY3JpYmUgfSBmcm9tIFwiLi9wdWJzdWJcIjtcbmltcG9ydCB7XG4gIHRkRXZlbnQsXG4gIHJlbW92ZVRkRXZlbnQsXG4gIG5ld0dhbWVFdmVudCxcbiAgdG9nZ2xlRGlyZWN0aW9uRXZlbnQsXG59IGZyb20gXCIuL2V2ZW50c1wiO1xuaW1wb3J0IHsgZGlzcGxheUdhbWVPdmVyIH0gZnJvbSBcIi4vZ2FtZURpc3BsYXlcIjtcblxuLy8gQHRzLWNoZWNrXG5cbi8qKlxuICogQGZpbGVvdmVydmlldyBJbmRleC5qcyBpcyB0aGUgcnJvdCBmaWxlIG9mIHRoaXMgcHJvamVjdC5cbiAqIEBhdXRob3IgRnJvc3R3YWxrZXJcbiAqL1xuXG5zdWJzY3JpYmUoXCJ0b2dnbGVFdmVudFwiLCB0b2dnbGVEaXJlY3Rpb25FdmVudCk7XG5cbmRpc3BsYXlHYW1lKCk7XG5cbnN1YnNjcmliZShcInNldFVwXCIsIHNldFVwKTtcblxuc3Vic2NyaWJlKFwiY2VsbENsaWNrXCIsIHRkRXZlbnQpO1xuXG5zdWJzY3JpYmUoXCJyZW1vdmVDZWxsQ2xpY2tcIiwgcmVtb3ZlVGRFdmVudCk7XG5cbnN1YnNjcmliZShcImRpc3BsYXlHYW1lYm9hcmRcIiwgZ2FtZWJvYXJkRGlzcGxheSk7XG5cbnN1YnNjcmliZShcImdhbWVPdmVyXCIsIGRpc3BsYXlHYW1lT3Zlcik7XG5cbnN1YnNjcmliZShcIm5ld0dhbWVcIiwgbmV3R2FtZUV2ZW50KTtcblxuc3Vic2NyaWJlKFwicmVzdGFydFwiLCBuZXdEcmFnQm94KTtcblxuZ2FtZSgpO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiaW5kZXhcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRzW2ldXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2JhdHRsZXNoaXBcIl0gPSBzZWxmW1wid2VicGFja0NodW5rYmF0dGxlc2hpcFwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wic3JjX3NjcmlwdHNfZ2FtZUxvb3BfanNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc2NyaXB0cy9pbmRleC5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9