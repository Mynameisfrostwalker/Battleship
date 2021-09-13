/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/******/ 			"events": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["src_scripts_gameLoop_js"], () => (__webpack_require__("./src/scripts/events.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QztXQUNBO1dBQ0Esa0JBQWtCLHFCQUFxQjtXQUN2QztXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWhEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NjcmlwdHMvZ2FtZURpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jaHVuayBsb2FkZWQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwdWJsaXNoIH0gZnJvbSBcIi4vcHVic3ViXCI7XG5pbXBvcnQgeyBjcmVhdGVEaXYgfSBmcm9tIFwiLi9nYW1lRGlzcGxheVwiO1xuaW1wb3J0IHsgYXJlU2hpcHNQbGFjZWQgfSBmcm9tIFwiLi9nYW1lTG9vcFwiO1xuXG4vLyBAdHMtY2hlY2tcblxuLyoqXG4gKiBAbW9kdWxlIGV2ZW50c1xuICovXG5cbmxldCBjb3VudCA9IDE7XG5cbmxldCBlbGVtZW50O1xuXG5sZXQgbGVuZ3RocyA9IFs0LCAzLCAzLCAyXTtcblxubGV0IG5vT2ZTaGlwcyA9IDE7XG5cbmNvbnN0IHJlY29yZCA9IChlKSA9PiB7XG4gIGVsZW1lbnQgPSBlLnRhcmdldC5pZDtcbn07XG5cbmNvbnN0IHJlZ2lzdGVyQ2VsbENsaWNrID0gKGV2ZW50KSA9PiB7XG4gIGlmIChldmVudC50YXJnZXQuYXR0cmlidXRlc1tcImRhdGEta2V5XCJdLm5vZGVWYWx1ZSA9PT0gXCJBSVwiKSB7XG4gICAgcHVibGlzaChcbiAgICAgIFwibmV3VHVyblwiLFxuICAgICAgSlNPTi5wYXJzZShldmVudC50YXJnZXQuYXR0cmlidXRlc1tcImRhdGEtY29vcmRzXCJdLm5vZGVWYWx1ZSlcbiAgICApO1xuICB9XG59O1xuXG5jb25zdCB0ZEV2ZW50ID0gKCkgPT4ge1xuICBjb25zdCB0ZExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwidGRcIik7XG4gIHRkTGlzdC5mb3JFYWNoKCh0ZCkgPT4ge1xuICAgIHRkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZWdpc3RlckNlbGxDbGljaywgeyBvbmNlOiB0cnVlIH0pO1xuICB9KTtcbn07XG5cbmNvbnN0IHJlbW92ZVRkRXZlbnQgPSAoKSA9PiB7XG4gIGNvbnN0IHRkTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJ0ZFwiKTtcbiAgdGRMaXN0LmZvckVhY2goKHRkKSA9PiB7XG4gICAgdGQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlZ2lzdGVyQ2VsbENsaWNrLCB7IG9uY2U6IHRydWUgfSk7XG4gIH0pO1xufTtcblxuY29uc3QgbmV3R2FtZSA9IChldmVudCkgPT4ge1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG4gIG1haW4uc3R5bGVbXCJvcGFjaXR5XCJdID0gXCIxXCI7XG4gIGV2ZW50LnRhcmdldC5wYXJlbnROb2RlLnJlbW92ZSgpO1xuICBwdWJsaXNoKFwicmVzdGFydFwiKTtcbn07XG5cbmNvbnN0IG5ld0dhbWVFdmVudCA9ICgpID0+IHtcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXdHYW1lXCIpO1xuICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG5ld0dhbWUpO1xufTtcblxuY29uc3QgdG9nZ2xlRGlyZWN0aW9uID0gKGV2ZW50KSA9PiB7XG4gIGV2ZW50LnRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC50b2dnbGUoXCJmbGV4ZXJcIik7XG4gIGlmIChjb3VudCAlIDIgIT09IDApIHtcbiAgICBldmVudC50YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZy5zZXRBdHRyaWJ1dGUoXCJkYXRhLWRpcmVjdGlvblwiLCBcInhcIik7XG4gIH0gZWxzZSB7XG4gICAgZXZlbnQudGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcuc2V0QXR0cmlidXRlKFwiZGF0YS1kaXJlY3Rpb25cIiwgXCJ5XCIpO1xuICB9XG4gIGNvdW50Kys7XG59O1xuXG5jb25zdCBkcmFnU3RhcnQgPSAoZSkgPT4ge1xuICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKFxuICAgIFwidGV4dC9wbGFpblwiLFxuICAgIEpTT04uc3RyaW5naWZ5KFtcbiAgICAgIGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtZGlyZWN0aW9uXCIpLFxuICAgICAgZS50YXJnZXQuY2hpbGRyZW4ubGVuZ3RoLFxuICAgIF0pXG4gICk7XG4gIGUudGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSBcIjAuNVwiO1xufTtcblxuY29uc3QgZHJhZ0VuZCA9IChlKSA9PiB7XG4gIGUudGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSBcIlwiO1xufTtcblxuY29uc3QgZHJhZ0VudGVyID0gKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufTtcblxuY29uc3QgZHJhZ092ZXIgPSAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG59O1xuXG5jb25zdCBkcm9wID0gKGUpID0+IHtcbiAgY291bnQgPSAxO1xuICBjb25zdCBTaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNTaGlwXCIpO1xuICBjb25zdCBhc2lkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJhc2lkZVwiKTtcbiAgY29uc3QgaWQgPSBKU09OLnBhcnNlKGUuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0L3BsYWluXCIpKTtcbiAgY29uc3QgY29vcmRzID0gSlNPTi5wYXJzZShlLnRhcmdldC5hdHRyaWJ1dGVzW1wiZGF0YS1jb29yZHNcIl0ubm9kZVZhbHVlKTtcbiAgcHVibGlzaChcInNldFVwXCIsIGlkWzFdLCBjb29yZHMsIGlkWzBdLCBlbGVtZW50KTtcbiAgaWYgKGFyZVNoaXBzUGxhY2VkKG5vT2ZTaGlwcykpIHtcbiAgICBTaGlwLnJlbW92ZSgpO1xuICAgIGlmIChsZW5ndGhzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IG5ld1NoaXAgPSBjcmVhdGVEaXYobGVuZ3Roc1swXSk7XG4gICAgICBhc2lkZS5pbnNlcnRCZWZvcmUobmV3U2hpcCwgYXNpZGUuY2hpbGRyZW5bMF0pO1xuICAgICAgbmV3U2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGRyYWdTdGFydCk7XG4gICAgICBuZXdTaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW5kXCIsIGRyYWdFbmQpO1xuICAgICAgbGVuZ3Rocy5zaGlmdCgpO1xuICAgICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRpdmlzaW9uXCIpO1xuICAgICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgcmVjb3JkKTtcbiAgICAgIH0pO1xuICAgICAgbm9PZlNoaXBzKys7XG4gICAgfSBlbHNlIGlmIChsZW5ndGhzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgYXNpZGUucmVtb3ZlKCk7XG4gICAgICBsZW5ndGhzID0gWzQsIDMsIDMsIDJdO1xuICAgICAgbm9PZlNoaXBzID0gMTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogQWRkcyBkcmFnIGV2ZW50IGxpc3RlbmVyc1xuICovXG5mdW5jdGlvbiB0b2dnbGVEaXJlY3Rpb25FdmVudCgpIHtcbiAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRpdmlzaW9uXCIpO1xuICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHJlY29yZCk7XG4gIH0pO1xuICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RvZ2dsZVwiKTtcbiAgY29uc3Qgc2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjU2hpcFwiKTtcbiAgY29uc3QgYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEta2V5PSdQbGF5ZXIxJ11cIik7XG4gIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlRGlyZWN0aW9uKTtcbiAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGRyYWdTdGFydCk7XG4gIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgZHJhZ0VuZCk7XG4gIGJveGVzLmZvckVhY2goKGJveCkgPT4ge1xuICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VudGVyXCIsIGRyYWdFbnRlcik7XG4gICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCBkcmFnT3Zlcik7XG4gICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIGRyb3ApO1xuICB9KTtcbn1cblxuZXhwb3J0IHsgdGRFdmVudCwgcmVtb3ZlVGRFdmVudCwgbmV3R2FtZUV2ZW50LCB0b2dnbGVEaXJlY3Rpb25FdmVudCB9O1xuIiwiaW1wb3J0IHsgcHVibGlzaCB9IGZyb20gXCIuL3B1YnN1YlwiO1xuXG4vLyBAdHMtY2hlY2tcblxuLyoqXG4gKiBAbW9kdWxlIGdhbWVEaXNwbGF5XG4gKi9cblxuY29uc3QgY3JlYXRlVGFibGVDZWxscyA9ICh5LCB4LCB0aXRsZSkgPT4ge1xuICBjb25zdCB0ZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgdGQuc2V0QXR0cmlidXRlKFwiZGF0YS1rZXlcIiwgYCR7dGl0bGV9YCk7XG4gIHRkLnNldEF0dHJpYnV0ZShcImRhdGEtY29vcmRzXCIsIGAke0pTT04uc3RyaW5naWZ5KFt5IC0gMSwgeF0pfWApO1xuICByZXR1cm4gdGQ7XG59O1xuXG5jb25zdCBjcmVhdGVUYWJsZUhlYWQgPSAoeSwgeCwgdGl0bGUpID0+IHtcbiAgY29uc3QgdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XG4gIGlmICh4ICE9PSAwKSB7XG4gICAgdGgudGV4dENvbnRlbnQgPSBgJHt4fWA7XG4gIH1cbiAgcmV0dXJuIHRoO1xufTtcblxuY29uc3QgY3JlYXRlVGFibGVSb3dzID0gKHksIHRpdGxlKSA9PiB7XG4gIGNvbnN0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xuICB0ci5pZCA9IGAke3RpdGxlfWJvYXJkLXJvdyR7eX1gO1xuICBpZiAoeSAhPT0gMCkge1xuICAgIGNvbnN0IHRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xuICAgIHRyLmFwcGVuZENoaWxkKHRoKTtcbiAgICB0aC50ZXh0Q29udGVudCA9IGAke1N0cmluZy5mcm9tQ2hhckNvZGUoNjQgKyB5KX1gO1xuXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCAxMDsgeCsrKSB7XG4gICAgICB0ci5hcHBlbmRDaGlsZChjcmVhdGVUYWJsZUNlbGxzKHksIHgsIHRpdGxlKSk7XG4gICAgfVxuICAgIHJldHVybiB0cjtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8PSAxMDsgeCsrKSB7XG4gICAgICB0ci5hcHBlbmRDaGlsZChjcmVhdGVUYWJsZUhlYWQoeSwgeCwgdGl0bGUpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRyO1xuICB9XG59O1xuXG5jb25zdCBjcmVhdGVCb2FyZCA9ICh0aXRsZSkgPT4ge1xuICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcbiAgdGFibGUuaWQgPSB0aXRsZTtcbiAgY29uc3QgY2FwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYXB0aW9uXCIpO1xuICBjb25zdCBoMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgaDIudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgY2FwdGlvbi5hcHBlbmRDaGlsZChoMik7XG4gIHRhYmxlLmFwcGVuZENoaWxkKGNhcHRpb24pO1xuICBmb3IgKGxldCB5ID0gMDsgeSA8PSAxMDsgeSsrKSB7XG4gICAgdGFibGUuYXBwZW5kQ2hpbGQoY3JlYXRlVGFibGVSb3dzKHksIHRpdGxlKSk7XG4gIH1cbiAgcmV0dXJuIHRhYmxlO1xufTtcblxuY29uc3QgY3JlYXRlRGl2ID0gKGxlbmd0aCkgPT4ge1xuICBjb25zdCBtYWluRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbWFpbkRpdi5pZCA9IFwiU2hpcFwiO1xuICBtYWluRGl2LnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCBcInRydWVcIik7XG4gIG1haW5EaXYuc2V0QXR0cmlidXRlKFwiZGF0YS1kaXJlY3Rpb25cIiwgXCJ5XCIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBib3guY2xhc3NOYW1lID0gXCJkaXZpc2lvblwiO1xuICAgIGJveC5pZCA9IGAke2l9YDtcbiAgICBtYWluRGl2LmFwcGVuZENoaWxkKGJveCk7XG4gIH1cbiAgcmV0dXJuIG1haW5EaXY7XG59O1xuXG5jb25zdCBkaXNwbGF5R2FtZSA9ICgpID0+IHtcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xuICBjb25zdCBoMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgaDEudGV4dENvbnRlbnQgPSBcIkJBVFRMRVNISVBcIjtcbiAgaGVhZGVyLmFwcGVuZENoaWxkKGgxKTtcbiAgYm9keS5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm1haW5cIik7XG4gIG1haW4uYXBwZW5kQ2hpbGQoY3JlYXRlQm9hcmQoXCJQbGF5ZXIxXCIpKTtcbiAgbWFpbi5hcHBlbmRDaGlsZChjcmVhdGVCb2FyZChcIkFJXCIpKTtcbiAgYm9keS5hcHBlbmRDaGlsZChtYWluKTtcbiAgY29uc3QgYXNpZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXNpZGVcIik7XG4gIGFzaWRlLmFwcGVuZENoaWxkKGNyZWF0ZURpdig1KSk7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGJ1dHRvbi5pZCA9IFwidG9nZ2xlXCI7XG4gIGJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQ2hhbmdlIEF4aXNcIjtcbiAgYXNpZGUuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidXR0b25cIik7XG4gIGJvZHkuYXBwZW5kQ2hpbGQoYXNpZGUpO1xuICBwdWJsaXNoKFwidG9nZ2xlRXZlbnRcIik7XG59O1xuXG5jb25zdCBkaXNwbGF5R2FtZU92ZXIgPSAobWVzc2FnZSkgPT4ge1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcbiAgbWFpbi5zdHlsZVtcIm9wYWNpdHlcIl0gPSBcIjAuNVwiO1xuICBjb25zdCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY2FyZC5pZCA9IFwiY2FyZFwiO1xuICBjb25zdCBjYXJkVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBjYXJkVGV4dC50ZXh0Q29udGVudCA9IGAke21lc3NhZ2V9YDtcbiAgY2FyZC5hcHBlbmRDaGlsZChjYXJkVGV4dCk7XG4gIGNvbnN0IG5ld0dhbWVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBuZXdHYW1lQnV0dG9uLnRleHRDb250ZW50ID0gXCJOZXcgR2FtZVwiO1xuICBuZXdHYW1lQnV0dG9uLmlkID0gXCJuZXdHYW1lXCI7XG4gIG5ld0dhbWVCdXR0b24uY2xhc3NMaXN0LmFkZChcImJ1dHRvblwiKTtcbiAgY2FyZC5hcHBlbmRDaGlsZChuZXdHYW1lQnV0dG9uKTtcbiAgYm9keS5hcHBlbmRDaGlsZChjYXJkKTtcbn07XG5cbmNvbnN0IG5ld0RyYWdCb3ggPSAoKSA9PiB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbiAgY29uc3QgYXNpZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXNpZGVcIik7XG4gIGFzaWRlLmFwcGVuZENoaWxkKGNyZWF0ZURpdig1KSk7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGJ1dHRvbi5pZCA9IFwidG9nZ2xlXCI7XG4gIGJ1dHRvbi50ZXh0Q29udGVudCA9IFwiQ2hhbmdlIEF4aXNcIjtcbiAgYXNpZGUuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJidXR0b25cIik7XG4gIGJvZHkuYXBwZW5kQ2hpbGQoYXNpZGUpO1xuICBwdWJsaXNoKFwidG9nZ2xlRXZlbnRcIik7XG59O1xuXG5leHBvcnQgeyBkaXNwbGF5R2FtZSwgZGlzcGxheUdhbWVPdmVyLCBjcmVhdGVEaXYsIG5ld0RyYWdCb3ggfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImV2ZW50c1wiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZHNbaV1dID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rYmF0dGxlc2hpcFwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtiYXR0bGVzaGlwXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJzcmNfc2NyaXB0c19nYW1lTG9vcF9qc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zY3JpcHRzL2V2ZW50cy5qc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9