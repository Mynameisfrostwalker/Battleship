import { createShip } from "./ship";

// @ts-check

/**
 * @module gameboard
 */

/**
 * Creates a gameboard object
 * @type {Function}
 * @namespace createGameboard
 * @return {Object}
 */
const createGameboard = () => {
  /**
   * @type {Array}
   * @memberof createGameboard
   */
  let ships = [];

  /**
   * @type {Array<Array>}
   * @memberof createGameboard
   */
  const gameboard = [[], [], [], [], [], [], [], [], [], []];
  gameboard.forEach((arr) => {
    for (let i = 0; i < 10; i++) {
      arr.push(null);
    }
  });

  /**
   * Checks if two arrays share the same value
   * @param {Array} bigArr
   * @param {Array} arr
   * @memberof createGameboard
   * @return {Boolean}
   */
  const shareValues = (bigArr, arr) => {
    for (let i = 0; i < bigArr.length; i++) {
      const current = bigArr[i];
      for (let j = 0; j < arr.length; j++) {
        const smallCurrent = arr[j];
        if (current.shipName === smallCurrent.shipName) {
          return true;
        }
      }
    }
    return false;
  };

  /**
   * Places ships on gameboard
   * @param {String} name - Name of ship
   * @param {Number} lengthOfShip - Ship length
   * @param {Array<Number>} coord - Coordinates
   * @param {String} direction - Vertical or horizontal alignment
   * @memberof createGameboard
   */
  const placeShip = (name, lengthOfShip, coord, direction = "x") => {
    const newShip = createShip(name, lengthOfShip);
    if (!shareValues(ships, [newShip])) {
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
          if (current[0] > 9 || current[1] > 9) {
            return false;
          }
          return gameboard[current[0]][current[1]] === null;
        })
      ) {
        let index = 0;
        coordinates.forEach((current) => {
          gameboard[current[0]][current[1]] = {
            name: newShip.shipName,
            position: index,
            isHit: newShip.body[index],
          };
          index++;
        });
        ships.push(newShip);
      }
    }
  };

  /**
   * Attacks gambeboard cell
   * @param {Array<Number>} coords - cell to attack
   * @memberof createGameboard
   */
  const receiveAttack = (coords) => {
    if (gameboard[coords[0]][coords[1]] === null) {
      gameboard[coords[0]][coords[1]] = "miss";
    } else if (gameboard[coords[0]][coords[1]] !== "miss") {
      ships.forEach((ship) => {
        if (gameboard[coords[0]][coords[1]].name === ship.shipName) {
          ship.hit(gameboard[coords[0]][coords[1]].position);
          gameboard[coords[0]][coords[1]].isHit =
            ship.body[gameboard[coords[0]][coords[1]].position];
        }
      });
    }
  };

  /**
   * Checks if all ships are sunk
   * @memberof createGameboard
   * @return {Boolean} -true if all ships are sunk
   */
  const allSunk = () => {
    const boolean = ships.reduce((accum, ship) => {
      return accum && ship.isSunk();
    }, true);
    return boolean;
  };

  /**
   * Clears gameboard
   * @member createGameboard
   * @function
   */
  const clearShip = () => {
    ships = [];
    gameboard.forEach((arr) => {
      for (let i = 0; i < 10; i++) {
        arr[i] = null;
      }
    });
  };

  return { gameboard, placeShip, receiveAttack, allSunk, clearShip };
};

export { createGameboard };
