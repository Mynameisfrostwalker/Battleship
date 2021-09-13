import "../styles/reset.css";
import "../styles/main.css";
import { displayGame, newDragBox } from "./gameDisplay";
import { game, setUp } from "./gameLoop";
import { gameboardDisplay } from "./gameboardDisplay";
import { subscribe } from "./pubsub";
import {
  tdEvent,
  removeTdEvent,
  newGameEvent,
  toggleDirectionEvent,
} from "./events";
import { displayGameOver } from "./gameDisplay";

// @ts-check

/**
 * @fileoverview Index.js is the rrot file of this project.
 * @author Frostwalker
 */

subscribe("toggleEvent", toggleDirectionEvent);

displayGame();

subscribe("setUp", setUp);

subscribe("cellClick", tdEvent);

subscribe("removeCellClick", removeTdEvent);

subscribe("displayGameboard", gameboardDisplay);

subscribe("gameOver", displayGameOver);

subscribe("newGame", newGameEvent);

subscribe("restart", newDragBox);

game();
