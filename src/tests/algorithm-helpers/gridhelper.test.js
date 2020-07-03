import { setInitialGrid } from "../../helpers/gridHelpers";

test("Creates a grid with 15 rows and 50 columns", () => {
  const grid = setInitialGrid();
  expect(grid.length) === 15 //15 rows
  expect(grid[0].length) === 50 //50 columns
})