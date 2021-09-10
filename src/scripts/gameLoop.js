import { createPlayer } from "./player";
import { createGameboard } from "./gameboard";
import { publish, subscribe, unsubscribe } from "./pubsub";

// @ts-check

const player1 = createPlayer("human");
const player2 = createPlayer("AI");
const player1board = createGameboard();
const player2board = createGameboard();

/**
 * @module gameLoop
 */

const shareValues = (bigArr, arr) => {
  for (let i = 0; i < bigArr.length; i++) {
    const current = bigArr[i];
    for (let j = 0; j < arr.length; j++) {
      const smallCurrent = arr[j];
      if (current[0] === smallCurrent[0] && current[1] === smallCurrent[1]) {
        return true;
      }
    }
  }
  return false;
};

const aiPlaceShip = (gameboard) => {
  const coords = [];
  const directions = [];
  const random = (length) => {
    return Math.floor(Math.random() * (10 - length));
  };

  // finds random coordinates which satisfy the conditions
  const findRandom = (length, direction) => {
    let coord1;
    let coord2;
    if (direction === "x") {
      coord1 = random(0);
      coord2 = random(length);
    }
    if (direction === "y") {
      coord1 = random(length);
      coord2 = random(0);
    }
    const secondCoords = [];
    for (let i = 0; i < length; i++) {
      if (direction === "x") {
        secondCoords.push([coord1, coord2 + i]);
      }
      if (direction === "y") {
        secondCoords.push([coord1 + i, coord2]);
      }
    }
    if (!shareValues(coords, secondCoords)) {
      for (let i = -1; i <= length; i++) {
        if (direction === "x") {
          coords.push([coord1, coord2 + i]);
          coords.push([coord1 + 1, coord2 + i]);
          coords.push([coord1 - 1, coord2 + i]);
        } else if (direction === "y") {
          coords.push([coord1 + i, coord2]);
          coords.push([coord1 + i, coord2 + 1]);
          coords.push([coord1 + i, coord2 - 1]);
        }
      }
      return [coord1, coord2];
    } else {
      return findRandom(length, direction);
    }
  };

  for (let i = 0; i < 5; i++) {
    const rand = Math.floor(Math.random() * 11);
    if (rand > 5) {
      directions.push("y");
    } else {
      directions.push("x");
    }
  }

  gameboard.placeShip(
    "Carrier",
    5,
    findRandom(5, directions[0]),
    directions[0]
  );
  gameboard.placeShip(
    "Battleship",
    4,
    findRandom(4, directions[1]),
    directions[1]
  );
  gameboard.placeShip(
    "Cruiser",
    3,
    findRandom(3, directions[2]),
    directions[2]
  );
  gameboard.placeShip(
    "Submarine",
    3,
    findRandom(3, directions[3]),
    directions[3]
  );
  gameboard.placeShip(
    "Destroyer",
    2,
    findRandom(2, directions[4]),
    directions[4]
  );
};

const gameOver = () => {
  publish("removeCellClick");
  if (player1board.allSunk()) {
    publish("gameOver", "AI has won the game");
  } else {
    publish("gameOver", "Player1 has won the game");
  }
  player1board.clearShip();
  player2board.clearShip();
  unsubscribe("newTurn", turn);
  subscribe("restart", game);
  publish("newGame");
};

const turn = (coords) => {
  player1.toggleTurn();
  player2.toggleTurn();
  player1.attack(player2board, coords);
  publish("displayGameboard", player2board.gameboard, "AI");
  if (player1board.allSunk() || player2board.allSunk()) {
    gameOver();
    return;
  }
  player2.attack(player1board);
  publish("displayGameboard", player1board.gameboard, "Player1");
  if (player1board.allSunk() || player2board.allSunk()) {
    gameOver();
  }
};

/**
 * Starts game
 * @callback
 */
function game() {
  subscribe("newTurn", turn);
  publish("cellClick");
  console.log("b");
  player1board.placeShip("Carrier", 5, [0, 0], "y");
  player1board.placeShip("Battleship", 4, [7, 2], "x");
  player1board.placeShip("Cruiser", 3, [3, 6], "y");
  player1board.placeShip("Submarine", 3, [7, 9], "y");
  player1board.placeShip("Destroyer", 2, [2, 3], "x");
  aiPlaceShip(player2board);
  publish("displayGameboard", player1board.gameboard, "Player1");
  publish("displayGameboard", player2board.gameboard, "AI");
  player1.toggleTurn();
}

export { game, turn };
