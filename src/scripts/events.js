import { publish } from "./pubsub";
import { createDiv } from "./gameDisplay";
import { areShipsPlaced } from "./gameLoop";

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
    publish(
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
  publish("restart");
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
  publish("setUp", id[1], coords, id[0], element);
  if (areShipsPlaced(noOfShips)) {
    Ship.remove();
    if (lengths.length > 0) {
      const newShip = createDiv(lengths[0]);
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

export { tdEvent, removeTdEvent, newGameEvent, toggleDirectionEvent };
