import { astar } from "../../helpers/astar"
import { getShortestPathNodes } from "../../helpers/dijkstraHelpers";

const setInitialGrid = () => {   // create the initial array of node objects
  const grid = [];
  
  // for each row in the grid... 
  for (let row = 0; row < 15; row++) {
    const currentRow = [];

    // for each column in the row...
    for (let col = 0; col < 45; col++) {

      // create node and push
      currentRow.push(createNode(row, col));
    }
    
    grid.push(currentRow);
  }

  return grid;
}

// creates the nodes that are pushed into the initial grid array
const createNode = (row, col) => {
  const node = {
    row,
    col,
    isStart: null,
    isFinish: null,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    isWeight: 0,
    previousNode: null,
    mousedown: false,
    onMouseEnter: false,
    onMouseUp: false,
    heuristic: 0,
    cost: 0,
  };
  
  return node;
}

describe("Astar hould return the visited nodes", () => {

  test("When start node is surrounded by walls, length of visited nodes should be 1", () => {
    const grid = setInitialGrid();
    const startNode = grid[1][1];
    const finishNode = grid[6][6];
    grid[0][1].isWall = true;
    grid[2][1].isWall = true;
    grid[1][2].isWall = true;
    grid[1][0].isWall = true;

    const visitedNodes = astar(grid, startNode, finishNode);
    expect(visitedNodes.length).toBe(1);
    expect(getShortestPathNodes(finishNode).length).toBe(1);
    
  })

  test("Algorithm can shoot in a straight line if end node is on the same y plane", () => {
    const grid = setInitialGrid();
    const startNode = grid[1][1];
    const endNode = grid[1][3];

    const search = astar(grid, startNode, endNode);
    expect(search.length).toBe(3)
    expect(getShortestPathNodes(endNode).length).toBe(3);
  })

  test("Algorithm can easily go around a wall", () => {
    const grid = setInitialGrid();
    const startNode = grid[1][1];
    const endNode = grid[1][3];

    grid[1][2].isWall = true;

    const search = astar(grid, startNode, endNode);
    expect(search.length).toBe(5);
    expect(getShortestPathNodes(endNode).length).toBe(5);
  })

  test("When start node has no obstacles, it should go straight for the target", () => {
    const grid = setInitialGrid();
    const startNode = grid[1][1];
    const finishNode = grid[1][15];

    const search = astar(grid, startNode, finishNode);
    expect(search.length).toBe(15);
    expect(getShortestPathNodes(finishNode).length).toBe(15);
  })
});
