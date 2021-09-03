// @ts-check

/**
 * @module Ship
 */

/**
 * Ship factory function
 * @param {number} length
 * @return {Object} - ship object
 */
const createShip = (length) => {
  const lengthArray = [];
  for (let i = 0; i < length; i++) {
    lengthArray.push(false);
  }
  const ship = {
    shipBody: lengthArray,
    shipLength: lengthArray.length,
    hit(index) {
      this.shipBody[index] = true;
    },
    isSunk() {
      for (let i = 0; i < this.shipBody.length; i++) {
        if (this.shipBody[i] === false) {
          return false;
        }
      }
      return true;
    },
  };
  return ship;
};

export { createShip };
