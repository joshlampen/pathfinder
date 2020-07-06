import { bfs } from '../../helpers/breadthFirst';
import { getShortestPathNodes } from '../../helpers/dijkstraHelpers'

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

const createNode = (row, col) => {
  const node = {
    row,
    col,
    // isStart: row === startNode.row && col === startNode.col,
    // isFinish: row === finishNode.row && col === finishNode.col,
    // isStart and isFinish are not needed for these tests
    distance: Infinity,
    isVisited: false,
    isWall: false,
    isWeighted: false,
    previousNode: null,
    mousedown: false,
    onMouseEnter: false,
    onMouseUp: false,
  };
  
  return node;
}

describe("Bfs should return the visited nodes", () => {

  test("When start node is surrounded by walls, length of visited nodes should be 1", () => {
    const grid = setInitialGrid();
    const startNode = grid[1][1];
    const finishNode = grid[4][4];
    grid[0][1].isWall = true;
    grid[2][1].isWall = true;
    grid[1][2].isWall = true;
    grid[1][0].isWall = true;

    const search = bfs(startNode, finishNode, grid);
    expect(search.length).toBe(1)
  })

  test("algorithm should check the top, bottom, left then right", () => {
    const grid = setInitialGrid();
    const startNode = grid[1][1];
    const finishNode = grid[1][2];

    let gridLength = 0;
    for (let row of grid) {
      for (let col of row) {
        gridLength ++
      }
    }

    const search = bfs(startNode, finishNode, grid);
    expect(search.length).toBe(5)
  })
})

describe("getShortestPath should return an array of nodes from origin to end", () => {

  test("Return distance between start node and end node when possible on x-plane", () => {
    const grid = setInitialGrid();
    const startNode = grid[1][1];
    const finishNode = grid[2][1];
    bfs(startNode, finishNode, grid)

    expect(getShortestPathNodes(finishNode).length).toBe(3)
  })

  test("return distance between start and end node on y-plane", () => {
    const grid = setInitialGrid();
    const startNode = grid[1][1];
    const finishNode = grid[1][2];
    bfs(startNode, finishNode, grid)

    expect(getShortestPathNodes(finishNode).length).toBe(3)
  })

  test("return distance between start and end node when diagonal", () => {
    const grid = setInitialGrid();
    const startNode = grid[1][1];
    const finishNode = grid[2][2];
    bfs(startNode, finishNode, grid)

    expect(getShortestPathNodes(finishNode).length).toBe(4)
  })
  
})