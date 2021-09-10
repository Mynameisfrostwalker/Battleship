import { publish } from "./pubsub";

// @ts-check

/**
 * @module events
 */

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
  const button = document.querySelector("button");
  button.addEventListener("click", newGame);
};

export { tdEvent, removeTdEvent, newGameEvent };
