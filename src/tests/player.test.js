import { createPlayer } from "../scripts/player";
import { createGameboard } from "../scripts/gameboard";

test("can get player turn", () => {
  const player1 = createPlayer("human");
  expect(player1.getTurn()).toBe(true);
});

test("can toggle player turn", () => {
  const player1 = createPlayer("human");
  expect(player1.getTurn()).toBe(true);
  player1.toggleTurn();
  expect(player1.getTurn()).toBe(false);
});

test("player can attack enemy", () => {
  const player1 = createPlayer("human");
  const enemyBoard = createGameboard();
  player1.attack(enemyBoard, [2, 1]);
  expect(enemyBoard.gameboard[2][1]).toBe("miss");
});

test("AI can attack enemy", () => {
  const player1 = createPlayer("AI");
  const enemyBoard = createGameboard();
  player1.attack(enemyBoard);
  const boolean = enemyBoard.gameboard.reduce((accum, curr) => {
    const value = curr.every((item) => item === null);
    return accum && value;
  }, true);
  expect(boolean).toBe(false);
});

test("can not hit same coordinate twice", () => {
  let count = 0;
  const player1 = createPlayer("AI");
  const enemyBoard = createGameboard();
  const mathRandomSpy = jest.spyOn(Math, "random");
  mathRandomSpy.mockImplementation(() => 0.5);
  player1.attack(enemyBoard);
  enemyBoard.gameboard.forEach((curr) => {
    curr.forEach((item) => {
      if (item !== null) {
        count++;
      }
    });
  });
  player1.attack(enemyBoard);
  expect(count).toBe(1);
  player1.attack(enemyBoard);
  enemyBoard.gameboard.forEach((curr) => {
    curr.forEach((item) => {
      if (item !== null) {
        count++;
      }
    });
  });
  player1.attack(enemyBoard);
  expect(count).toBe(2);
  mathRandomSpy.mockRestore();
});

test("AI can hit ships", () => {
  const player1 = createPlayer("AI");
  const enemyBoard = createGameboard();
  enemyBoard.placeShip("battleship", 1, [0, 0]);
  const mathRandomSpy = jest.spyOn(Math, "random");
  mathRandomSpy.mockImplementation(() => 0);
  player1.attack(enemyBoard);
  expect(enemyBoard.gameboard[0][0].isHit).toBe(true);
  mathRandomSpy.mockRestore();
});
