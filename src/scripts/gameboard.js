import { createShip } from "../scripts/ship";

// @ts-check

/**
 * @module gameboard
 */

/**
 * Creates a gameboard object
 * @return {Object}
 */
const createGameboard = () => {
  const ships = [];
  const gameboard = [[], [], [], [], [], [], [], [], [], []];
  gameboard.forEach((arr) => {
    for (let i = 0; i < 10; i++) {
      arr.push(null);
    }
  });

  // places ships on gameboard
  const placeShip = (name, coord, direction = "x") => {
    const newShip = createShip(name, ships.length + 1);
    if (ships.every((ship) => ship.shipName !== newShip.shipName)) {
      ships.push(newShip);
      const length = newShip.shipLength;
      const coordinates = [];
      for (let i = 0; i < length; i++) {
        if (direction === "x") {
          coordinates.push([coord[0], coord[1] + i]);
        } else {
          coordinates.push([coord[0] + i, coord[1]]);
        }
      }
      if (
        coordinates.every((current) => {
          return gameboard[current[0]][current[1]] === null;
        })
      ) {
        let index = 0;
        coordinates.forEach((current) => {
          gameboard[current[0]][current[1]] = {
            name: newShip.shipName,
            position: index,
          };
          index++;
        });
      }
    }
  };

  // receives attacks
  return { gameboard, placeShip };
};

export { createGameboard };
