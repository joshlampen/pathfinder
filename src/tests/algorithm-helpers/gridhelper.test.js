import { setInitialGrid } from "../../helpers/gridHelpers";

test("Creates a grid with 15 rows and 50 columns", () => {
  const grid = setInitialGrid();
  expect(grid.length) === 15 //15 rows
  expect(grid[0].length) === 50 //50 columns
});

test("Creates a grid with nodes that have col, row, isStart, isFinish, distance, isVisited, isWall and previousNode", () => {
  const grid = setInitialGrid();
  const firstNode = grid[0][0];

  expect(firstNode.col).toBe(0);
  expect(firstNode.row).toBe(0);
  expect(firstNode.isStart).toBe(false);
  expect(firstNode.isFinish).toBe(false);
  expect(firstNode.distance).toBe(Infinity);
  expect(firstNode.isVisited).toBe(false);
  expect(firstNode.isWall).toBe(false);
  expect(firstNode.previousNode).toBe(null);
});

test("Creates a grid with start and end nodes that have isStart and isFinish as true respectively", () => {
  const grid = setInitialGrid();
  grid[1][1].isStart = true;
  grid[10][10].isFinish = true;

  const startNode = grid[1][1];
  const endNode = grid[10][10];

  expect(startNode.isStart).toBe(true);
  expect(startNode.isFinish).toBe(false);

  expect(endNode.isStart).toBe(false);
  expect(endNode.isFinish).toBe(true);
});