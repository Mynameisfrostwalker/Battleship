/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/*!************************************!*\
  !*** ./src/scripts/gameDisplay.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayGame": () => (/* binding */ displayGame)
/* harmony export */ });
// @ts-check

/**
 * @module gameDisplay
 */

const createTableCells = (y, x, title) => {
  const td = document.createElement("td");
  td.id = `${title}board-cell${y},${x}`;
  return td;
};

const createTableHead = (y, x, title) => {
  const th = document.createElement("th");
  th.id = `${title}board-cell${y},${x}`;
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
  main.appendChild(createBoard("Player2"));
  body.appendChild(main);
};



/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZURpc3BsYXkuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7O1VBQUE7VUFDQTs7Ozs7V0NEQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLE1BQU0sWUFBWSxFQUFFLEdBQUcsRUFBRTtBQUN0QztBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLE1BQU0sWUFBWSxFQUFFLEdBQUcsRUFBRTtBQUN0QztBQUNBLHdCQUF3QixFQUFFO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxNQUFNLFdBQVcsRUFBRTtBQUNoQztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsNEJBQTRCOztBQUVwRCxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFdUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zY3JpcHRzL2dhbWVEaXNwbGF5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gQHRzLWNoZWNrXG5cbi8qKlxuICogQG1vZHVsZSBnYW1lRGlzcGxheVxuICovXG5cbmNvbnN0IGNyZWF0ZVRhYmxlQ2VsbHMgPSAoeSwgeCwgdGl0bGUpID0+IHtcbiAgY29uc3QgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gIHRkLmlkID0gYCR7dGl0bGV9Ym9hcmQtY2VsbCR7eX0sJHt4fWA7XG4gIHJldHVybiB0ZDtcbn07XG5cbmNvbnN0IGNyZWF0ZVRhYmxlSGVhZCA9ICh5LCB4LCB0aXRsZSkgPT4ge1xuICBjb25zdCB0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcbiAgdGguaWQgPSBgJHt0aXRsZX1ib2FyZC1jZWxsJHt5fSwke3h9YDtcbiAgaWYgKHggIT09IDApIHtcbiAgICB0aC50ZXh0Q29udGVudCA9IGAke3h9YDtcbiAgfVxuICByZXR1cm4gdGg7XG59O1xuXG5jb25zdCBjcmVhdGVUYWJsZVJvd3MgPSAoeSwgdGl0bGUpID0+IHtcbiAgY29uc3QgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XG4gIHRyLmlkID0gYCR7dGl0bGV9Ym9hcmQtcm93JHt5fWA7XG4gIGlmICh5ICE9PSAwKSB7XG4gICAgY29uc3QgdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XG4gICAgdHIuYXBwZW5kQ2hpbGQodGgpO1xuICAgIHRoLnRleHRDb250ZW50ID0gYCR7U3RyaW5nLmZyb21DaGFyQ29kZSg2NCArIHkpfWA7XG5cbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwOyB4KyspIHtcbiAgICAgIHRyLmFwcGVuZENoaWxkKGNyZWF0ZVRhYmxlQ2VsbHMoeSwgeCwgdGl0bGUpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRyO1xuICB9IGVsc2Uge1xuICAgIGZvciAobGV0IHggPSAwOyB4IDw9IDEwOyB4KyspIHtcbiAgICAgIHRyLmFwcGVuZENoaWxkKGNyZWF0ZVRhYmxlSGVhZCh5LCB4LCB0aXRsZSkpO1xuICAgIH1cbiAgICByZXR1cm4gdHI7XG4gIH1cbn07XG5cbmNvbnN0IGNyZWF0ZUJvYXJkID0gKHRpdGxlKSA9PiB7XG4gIGNvbnN0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xuICBjb25zdCBjYXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhcHRpb25cIik7XG4gIGNvbnN0IGgyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICBoMi50ZXh0Q29udGVudCA9IHRpdGxlO1xuICBjYXB0aW9uLmFwcGVuZENoaWxkKGgyKTtcbiAgdGFibGUuYXBwZW5kQ2hpbGQoY2FwdGlvbik7XG4gIGZvciAobGV0IHkgPSAwOyB5IDw9IDEwOyB5KyspIHtcbiAgICB0YWJsZS5hcHBlbmRDaGlsZChjcmVhdGVUYWJsZVJvd3MoeSwgdGl0bGUpKTtcbiAgfVxuICByZXR1cm4gdGFibGU7XG59O1xuXG5jb25zdCBkaXNwbGF5R2FtZSA9ICgpID0+IHtcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xuICBjb25zdCBoMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgaDEudGV4dENvbnRlbnQgPSBcIkJBVFRMRVNISVBcIjtcbiAgaGVhZGVyLmFwcGVuZENoaWxkKGgxKTtcbiAgYm9keS5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm1haW5cIik7XG4gIG1haW4uYXBwZW5kQ2hpbGQoY3JlYXRlQm9hcmQoXCJQbGF5ZXIxXCIpKTtcbiAgbWFpbi5hcHBlbmRDaGlsZChjcmVhdGVCb2FyZChcIlBsYXllcjJcIikpO1xuICBib2R5LmFwcGVuZENoaWxkKG1haW4pO1xufTtcblxuZXhwb3J0IHsgZGlzcGxheUdhbWUgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==