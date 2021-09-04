import { createGameboard } from "../scripts/gameboard";

test("creates null gameboard", () => {
  const gameboard1 = createGameboard();
  expect(gameboard1.gameboard.length).toBe(10);
  const boolean = gameboard1.gameboard.reduce((accum, curr) => {
    const value = curr.every((item) => item === null);
    return accum && value;
  }, true);
  expect(boolean).toBe(true);
});

test("places ships", () => {
  const gameboard1 = createGameboard();
  gameboard1.placeShip("battleship", [0, 0]);
  expect(gameboard1.gameboard[0][0].name).toBe("battleship");
});

test("places more than one ship", () => {
  const gameboard1 = createGameboard();
  gameboard1.placeShip("battleship", [0, 0]);
  gameboard1.placeShip("patrol boat", [0, 2]);
  expect(gameboard1.gameboard[0][2].name).toBe("patrol boat");
  expect(gameboard1.gameboard[0][3].name).toBe("patrol boat");
});

test("places ships vertically", () => {
  const gameboard1 = createGameboard();
  gameboard1.placeShip("battleship", [0, 0]);
  gameboard1.placeShip("patrol boat", [1, 0], "y");
  expect(gameboard1.gameboard[1][0].name).toBe("patrol boat");
  expect(gameboard1.gameboard[2][0].name).toBe("patrol boat");
});

test("ships do not overlap", () => {
  const gameboard1 = createGameboard();
  gameboard1.placeShip("battleship", [0, 0]);
  gameboard1.placeShip("patrol boat", [0, 0]);
  expect(gameboard1.gameboard[0][0].name).toBe("battleship");
  expect(gameboard1.gameboard[0][1]).toBeNull();
});

test("stores positions", () => {
  const gameboard1 = createGameboard();
  gameboard1.placeShip("battleship", [0, 0]);
  gameboard1.placeShip("patrol boat", [1, 0]);
  gameboard1.placeShip("destroyer", [2, 0]);
  gameboard1.placeShip("cruiser", [3, 0], "y");
  expect(gameboard1.gameboard[3][0].name).toBe("cruiser");
  expect(gameboard1.gameboard[3][0].position).toBe(0);
  expect(gameboard1.gameboard[4][0].position).toBe(1);
  expect(gameboard1.gameboard[5][0].position).toBe(2);
});

test("no multiple ships with same name", () => {
  const gameboard1 = createGameboard();
  gameboard1.placeShip("battleship", [0, 0]);
  gameboard1.placeShip("battleship", [1, 0]);
  expect(gameboard1.gameboard[0][0].name).toBe("battleship");
  expect(gameboard1.gameboard[1][0]).toBeNull();
});

test("receive attack records misses", () => {
  const gameboard1 = createGameboard();
  gameboard1.receiveAttack([1, 1]);
  expect(gameboard1.gameboard[1][1]).toBe("miss");
});

test("sends hit function to correct ship", () => {
  const gameboard1 = createGameboard();
  gameboard1.placeShip("battleship", [1, 1]);
  gameboard1.receiveAttack([1, 1]);
  expect(gameboard1.gameboard[1][1].isHit).toBe(true);
});

test("all ships are sunk", () => {
  const gameboard1 = createGameboard();
  gameboard1.placeShip("battleship", [1, 1]);
  gameboard1.receiveAttack([1, 1]);
  gameboard1.placeShip("patrol boat", [2, 2], "y");
  gameboard1.receiveAttack([2, 2]);
  gameboard1.receiveAttack([3, 2]);
  expect(gameboard1.allSunk()).toBe(true);
});

test("all ships are not sunk", () => {
  const gameboard1 = createGameboard();
  gameboard1.placeShip("battleship", [1, 1]);
  gameboard1.receiveAttack([1, 1]);
  gameboard1.placeShip("patrol boat", [2, 2], "y");
  gameboard1.receiveAttack([2, 2]);
  expect(gameboard1.allSunk()).toBe(false);
});
