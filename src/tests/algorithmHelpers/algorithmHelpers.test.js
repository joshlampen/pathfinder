import { getNeighborsQueue, getNeighborsStack, updateUnvisitedNeighbors, sortNodesByCost, sortNodesByDistance } from "../../algorithms/algorithmHelpers";

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

describe("updateUnvisitedNeighbors should assign appropriate values to neighbors", () => {
  it("Should update empty nodes with a new distance of 1", () => {
    const grid = setInitialGrid();
    const node = grid[1][1];
    const neighbors = getNeighborsQueue(node, grid);

    expect(neighbors[0].distance).toBe(Infinity);
    expect(neighbors[1].distance).toBe(Infinity);
    expect(neighbors[2].distance).toBe(Infinity);
    expect(neighbors[3].distance).toBe(Infinity);

    node.distance = 0;

    updateUnvisitedNeighbors(node, grid);

    expect(grid[0][1].distance).toBe(1);
    expect(grid[1][0].distance).toBe(1);
    expect(grid[2][1].distance).toBe(1);
    expect(grid[1][2].distance).toBe(1);
  })

  it("Should update wall nodes with a new distance of 3", () => {
    const grid = setInitialGrid();
    const node = grid[1][1];

    node.distance = 0;
    node.isWeight = true;

    updateUnvisitedNeighbors(node, grid);

    expect(grid[0][1].distance).toBe(3);
    expect(grid[1][0].distance).toBe(3);
    expect(grid[2][1].distance).toBe(3);
    expect(grid[1][2].distance).toBe(3);
  })

  it("Should not update wall nodes that have been visited", () => {
    const grid = setInitialGrid();
    const node = grid[1][1];
    const neighbors = getNeighborsQueue(node, grid);

    expect(neighbors[0].distance).toBe(Infinity);
    expect(neighbors[1].distance).toBe(Infinity);
    expect(neighbors[2].distance).toBe(Infinity);
    expect(neighbors[3].distance).toBe(Infinity);

    grid[0][1].isVisited = true;
    grid[1][0].isVisited = true;

    node.distance = 0;

    updateUnvisitedNeighbors(node, grid);

    expect(grid[0][1].distance).toBe(Infinity);
    expect(grid[1][0].distance).toBe(Infinity);
    expect(grid[2][1].distance).toBe(1);
    expect(grid[1][2].distance).toBe(1);
  })
});

describe("sortNodesByDistance should prioritize nodes according to distance", () => {
  it("Should put nodes with lowest distance at the front of the queue", () => {
    const grid = setInitialGrid();

    const node1 = grid[0][0];
    const node2 = grid[1][1];
    const node3 = grid[2][2];

    node1.distance = 0;
    node2.distance = 6;
    node3.distance = 2;

    const nodes = [node1, node2, node3]
      
    sortNodesByDistance(nodes);
    
    expect(nodes[0]).toBe(node1);
    expect(nodes[1]).toBe(node3);
    expect(nodes[2]).toBe(node2);
  })
})

describe("sortNodesByCost should prioritize nodes according to cost", () => {
  it("Should put nodes with lowest cost at the front of the queue", () => {
    const grid = setInitialGrid();

    const node1 = grid[0][0];
    const node2 = grid[1][1];
    const node3 = grid[2][2];

    node1.cost = 0;
    node2.cost = 6;
    node3.cost = 2;

    const nodes = sortNodesByCost([node1, node2, node3]);
    
    expect(nodes[0]).toBe(node1);
    expect(nodes[1]).toBe(node3);
    expect(nodes[2]).toBe(node2);
  })

  it("if costs are the same, it should break the tie using the heuristic", () => {
    //Edge case, when the sort function has an odd number of elements
    const grid = setInitialGrid();

    const node1 = grid[0][0];
    const node2 = grid[1][1];
    const node3 = grid[2][2];

    node1.cost = 4;
    node2.cost = 4;
    node3.cost = 4;

    node1.distanceToStart = 1;
    node2.distanceToStart = 3;
    node3.distanceToStart = 0;

    node1.heuristic = 3;
    node2.heuristic = 1;
    node3.heuristic = 4;

    const nodes = sortNodesByCost([node1, node3, node2]);
    
    expect(nodes).toBe(1)
  })
})