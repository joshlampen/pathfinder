import { dijkstra, getShortestPathNodes } from "../../helpers/dijkstraHelpers";

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
    isWeighted: false,
    previousNode: null,
    mousedown: false,
    onMouseEnter: false,
    onMouseUp: false,
  };
  
  return node;
}

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
    expect(search.length).toBe(5)
  })
});

describe("getShortestPath should return an array of nodes from origin to end", () => {

  test("Return distance between start node and end node when possible on x-plane", () => {
    const grid = setInitialGrid();
    const startNode = grid[1][1];
    const finishNode = grid[2][1];
    dijkstra(grid, startNode, finishNode)

    expect(getShortestPathNodes(finishNode).length).toBe(2)
  })

  test("return distance between start and end node on y-plane", () => {
    const grid = setInitialGrid();
    const startNode = grid[1][1];
    const finishNode = grid[1][2];
    const dijkstraArray = dijkstra(grid, startNode, finishNode)

    expect(getShortestPathNodes(finishNode).length).toBe(2)
  })

  test("return distance between start and end node when diagonal", () => {
    const grid = setInitialGrid();
    const startNode = grid[1][1];
    const finishNode = grid[2][2];
    const dijkstraArray = dijkstra(grid, startNode, finishNode)

    expect(getShortestPathNodes(finishNode).length).toBe(3)
  })
  
})