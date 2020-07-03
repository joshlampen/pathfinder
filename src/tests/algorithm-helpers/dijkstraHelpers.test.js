import { setInitialGrid } from "../../helpers/gridHelpers";
import dijkstra from "../../helpers/dijkstraHelpers";

describe("Should return the visited nodes", () => {

  test("When start node is surrounded by walls, length of visited nodes should be 1", () => {
    const grid = setInitialGrid();
    const startNode = grid[1][1];
    const finishNode = grid[6][6];
    grid[0][1].isWall = true;
    grid[2][1].isWall = true;
    grid[1][2].isWall = true;
    grid[1][0].isWall = true;

    const search = dijkstra(grid, startNode, finishNode);
    expect(search.length).toBe(1);
  })

  test("Algorithm sorts up, left, right down - should return the appropriate number of nodes once an end node as been found", () => {
    const grid = setInitialGrid();
    const startNode = grid[1][1];
    const endNode = grid[2][1];

    const search = dijkstra(grid, startNode, endNode);
    expect(search.length).toBe(4)
  })

});