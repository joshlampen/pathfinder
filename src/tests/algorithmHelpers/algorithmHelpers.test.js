import { getNeighborsQueue, getNeighborsStack } from "../../algorithms/algorithmHelpers";

const setInitialGrid = () => {
  const grid = [];
  
  for (let row = 0; row < 15; row++) {
    const currentRow = [];
    for (let col = 0; col < 45; col++) {
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

describe("getNeighborsQueue should search the neighboring nodes", () => {
  
  it("Returns an array with a length of 4 on the first search when all neighbors are valid nodes", () => {
    const grid = setInitialGrid()
    const node = grid[1][1];
    const neighbors = getNeighborsQueue(node, grid);

    expect(neighbors.length).toBe(4);
  })

  it("Returns an array with a length corresponding to the number of valid neighboring nodes", () => {
    const grid = setInitialGrid()
    const node = grid[0][0];
    const node2 = grid[0][1];
    const node3 = grid[14][1];
    const neighbors = getNeighborsQueue(node, grid);
    const neighbors2 = getNeighborsQueue(node2, grid);
    const neighbors3 = getNeighborsQueue(node3, grid);

    expect(neighbors.length).toBe(2);
    expect(neighbors2.length).toBe(3);
    expect(neighbors3.length).toBe(3);
  })

  it("Returns an array with the right neighboring node coordinates in the order of bottom, right, up and left", () => {
    const grid = setInitialGrid()
    const node = grid[1][1];
    const neighbors = getNeighborsQueue(node, grid);

    const up = neighbors[0];
    const right = neighbors[1];
    const down = neighbors[2];
    const left = neighbors[3];

    expect(up).toBe(grid[0][1]);
    expect(right).toBe(grid[1][2]);
    expect(down).toBe(grid[2][1]);
    expect(left).toBe(grid[1][0]);
  })
});

describe("getNeighborsStack should search the neighboring nodes and return a stack", () => {
  it("Returns an array with a length of 4 on the first search when all neighbors are valid nodes", () => {
    const grid = setInitialGrid()
    const node = grid[1][1];
    const neighbors = getNeighborsStack(node, grid);

    expect(neighbors.length).toBe(4);
  })

  it("Returns an array with a length corresponding to the number of valid neighboring nodes", () => {
    const grid = setInitialGrid()
    const node = grid[0][0];
    const node2 = grid[0][1];
    const node3 = grid[14][1];

    const neighbors = getNeighborsStack(node, grid);
    const neighbors2 = getNeighborsStack(node2, grid);
    const neighbors3 = getNeighborsStack(node3, grid);

    expect(neighbors.length).toBe(2);
    expect(neighbors2.length).toBe(3);
    expect(neighbors3.length).toBe(3);
  })

  it("Searches the top, right, bottom and left node and returns them in reverse order", () => {
    const grid = setInitialGrid()
    const node = grid[1][1];
    const neighbors = getNeighborsStack(node, grid);

    const left = neighbors[0];
    const down = neighbors[1];
    const right = neighbors[2];
    const up = neighbors[3];

    expect(up).toBe(grid[0][1]);
    expect(right).toBe(grid[1][2]);
    expect(down).toBe(grid[2][1]);
    expect(left).toBe(grid[1][0]);
  })
})