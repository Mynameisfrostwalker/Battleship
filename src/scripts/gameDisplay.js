import { publish } from "./pubsub";

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
  publish("toggleEvent");
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
  publish("toggleEvent");
};

export { displayGame, displayGameOver, createDiv, newDragBox };
