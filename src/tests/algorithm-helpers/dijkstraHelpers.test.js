import { setInitialGrid } from "../../helpers/gridHelpers";
import dijkstra from "../../helpers/dijkstraHelpers";
import getShortestPath from "../../helpers/dijkstraHelpers";

describe("Dijkstra hould return the visited nodes", () => {

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

describe("getShortestPath should return an array of nodes from origin to end", () => {

  test("Return distance between start node and end node when possible on x-plane", () => {
    const grid = setInitialGrid();
    const startNode = grid[1][1];
    const finishNode = grid[2][1];
    const dijkstraArray = dijkstra(grid, startNode, finishNode)

    expect(getShortestPath(finishNode).length).toBe(1)
  })

  test("return distance between start and end node on y-plane", () => {
    const grid = setInitialGrid();
    const startNode = grid[1][1];
    const finishNode = grid[1][2];
    const dijkstraArray = dijkstra(grid, startNode, finishNode)

    expect(getShortestPath(finishNode).length).toBe(1)
  })

  test("return distance between start and end node when diagonal", () => {
    const grid = setInitialGrid();
    const startNode = grid[1][1];
    const finishNode = grid[2][2];
    const dijkstraArray = dijkstra(grid, startNode, finishNode)

    expect(getShortestPath(finishNode).length).toBe(3)
  })
  
})