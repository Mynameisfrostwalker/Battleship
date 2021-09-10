import "../styles/reset.css";
import "../styles/main.css";
import { displayGame } from "./gameDisplay";
import { game } from "./gameLoop";
import { gameboardDisplay } from "./gameboardDisplay";
import { subscribe } from "./pubsub";
import { tdEvent, removeTdEvent, newGameEvent } from "./events";
import { displayGameOver } from "./gameDisplay";

// @ts-check

/**
 * @fileoverview Index.js is the rrot file of this project.
 * @author Frostwalker
 */

displayGame();

subscribe("cellClick", tdEvent);

subscribe("removeCellClick", removeTdEvent);

subscribe("displayGameboard", gameboardDisplay);

subscribe("gameOver", displayGameOver);

subscribe("newGame", newGameEvent);

game();
