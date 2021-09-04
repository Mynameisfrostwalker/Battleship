import { createShip } from "../scripts/ship";

test("factory function creates ship objects of correct length", () => {
  const ship5 = createShip("ship5", 5);
  const ship4 = createShip("ship4", 4);
  const ship3 = createShip("ship3", 3);
  expect(ship5.shipLength).toBe(5);
  expect(ship4.shipLength).toBe(4);
  expect(ship3.shipLength).toBe(3);
});

test("hit function works", () => {
  const ship = createShip("ship", 3);
  ship.hit(1);
  expect(ship.body[1]).toBeTruthy();
});

test("Is sunk function works", () => {
  const ship = createShip("ship", 3);
  ship.hit(0);
  expect(ship.isSunk()).toBeFalsy();
  ship.hit(1);
  expect(ship.isSunk()).toBeFalsy();
  ship.hit(2);
  expect(ship.isSunk()).toBeTruthy();
});
