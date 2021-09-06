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

export { displayGame };
