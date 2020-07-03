import { setInitialGrid } from "../../helpers/gridHelpers";

test("Creates a grid with 15 rows and 50 columns", () => {
  const grid = setInitialGrid();
  expect(grid.length) === 15 //15 rows
  expect(grid[0].length) === 50 //50 columns
});

test("Creates a grid with nodes that have col, row, isStart, isFinish, distance, isVisited, isWall and previousNode", () => {
  const grid = setInitialGrid();
  const firstNode = grid[0][0];

  expect(firstNode.col) === 0;
  expect(firstNode.row) === 0;
  expect(firstNode.isStart) === false;
  expect(firstNode.isFinish) === false;
  expect(firstNode.distance) === Infinity;
  expect(firstNode.isVisited) === false;
  expect(firstNode.isWall) === false;
  expect(firstNode.previousNode) === null;
});

test("Creates a grid with start and end nodes that have isStart and isFinish as true respectively", () => {
  const grid = setInitialGrid();

  const startNode = grid[1][1];
  const endNode = grid[10][10];

  expect(startNode.isStart) === true;
  expect(startNode.isFinish) === false;

  expect(endNode.isStart) === false;
  expect(endNode.isFinish) === true;
});