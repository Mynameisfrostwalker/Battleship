// @ts-check

/**
 * @module Ship
 */
// @ts-check

/**
 * Ship factory function
 * @param {string} name
 * @param {number} length
 * @return {Object} - ship object
 */
const createShip = (name, length) => {
  const shipBody = [];
  for (let i = 0; i < length; i++) {
    shipBody.push(false);
  }

  /**
   * @type {Object}
   * @namespace Ship
   */
  const ship = {
    /**
     * @memberof Ship
     * @type {String}
     */
    shipName: name,

    /**
     * @memberof Ship
     * @type {Array}
     */
    body: shipBody,

    /**
     * @type {Number}
     */
    shipLength: shipBody.length,

    /**
     * @memberof Ship
     * @param {Number} index - place where ship was hit
     */
    hit(index) {
      shipBody[index] = true;
    },

    /**
     * checks if ship is sunk
     * @memberof Ship
     * @return {Boolean}
     */
    isSunk() {
      for (let i = 0; i < shipBody.length; i++) {
        if (shipBody[i] === false) {
          return false;
        }
      }
      return true;
    },
  };
  return ship;
};

export { createShip };
