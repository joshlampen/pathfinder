import { getNeighborsQueue, getNeighborsStack, updateUnvisitedNeighbors, sortNodesByCost, sortNodesByDistance, removeNestedNodes, heuristic, getShortestPathNodes, checkOpenList } from "../../algorithms/algorithmHelpers";

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
  const grid = setInitialGrid()

  it("Returns an array with a length of 4 on the first search when all neighbors are valid nodes", () => {
    const node = grid[1][1];
    const neighbors = getNeighborsQueue(node, grid);

    expect(neighbors.length).toBe(4);
  })

  it("Returns an array with a length corresponding to the number of valid neighboring nodes", () => {
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
  const grid = setInitialGrid()

  it("Returns an array with a length of 4 on the first search when all neighbors are valid nodes", () => {
    const node = grid[1][1];
    const neighbors = getNeighborsStack(node, grid);

    expect(neighbors.length).toBe(4);
  })

  it("Returns an array with a length corresponding to the number of valid neighboring nodes", () => {
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
  const grid = setInitialGrid();
  const node = grid[1][1];

  it("Should update empty nodes with a new distance of 1", () => {
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
  const grid = setInitialGrid();
  const node1 = grid[0][0];
  const node2 = grid[1][1];

  it("Should put nodes with lowest cost at the front of the queue", () => {
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
    let nodes = [];

    node1.cost = 4;
    node2.cost = 4;

    node1.distanceToStart = 1;
    node2.distanceToStart = 3;

    node1.heuristic = 3;
    node2.heuristic = 1;

    nodes.push(node1);
    nodes.push(node2);

    nodes = sortNodesByCost(nodes);
    
    expect(nodes[0]).toBe(node2);
    expect(nodes[1]).toBe(node1);
  })
})

describe("removeNestedNodes", () => {
  it("Given a grid, return a length which represents the count of all the nodes", () => {
    const nodes = removeNestedNodes(setInitialGrid());
    expect(nodes.length).toBe(15 * 45);
  })
})

describe("Get heuristic", () => {
  const grid = setInitialGrid();

  it("Should return the hypotenuse given two x,y vectors calculated from a start and end node", () => {
    const h = heuristic(grid[0][0], grid[3][3]);
    expect(h).toBe(Math.sqrt(18));
  })
})

describe("getShortestPathNodes", () => {
  const grid = setInitialGrid();
  const node1 = grid[0][0];

  it("Return the path of nodes used to get from start to end", () => {
    const node2 = grid[1][0];
    const node3 = grid[2][0];

    node2.previousNode = node1;
    node3.previousNode = node2;

    const path = getShortestPathNodes(node1, node3);

    expect(path.length).toBe(3);
  })

  it("Return a path with length of 0 if a path cannot be constructed", () => {
    const node1 = grid[0][0];
    const node2 = grid[6][6];

    const path = getShortestPathNodes(node1, node2);

    expect(path.length).toBe(0);
  })
})

describe("checkOpenList", () => {
  const grid = setInitialGrid();
  const node1 = grid[0][0];
  const node2 = grid[1][1];

  it("should return true if the newNode is in the openList and has a better cost", () => {
    const openList = [node1, node2];
    const newNode = {...grid[0][0]};

    node1.cost = 6;
    newNode.cost = 5;

    const result = checkOpenList(openList, newNode);

    expect(result).toBe(true);
  })

  it("should return false if the newNode is in the openList and has a worse cost", () => {
    const openList = [node1, node2];
    const newNode = {...grid[0][0]};

    node1.cost = 5;
    newNode.cost = 6;

    const result = checkOpenList(openList, newNode);

    expect(result).toBe(false);
  })

  it("should return true if the newNode is not in the openList", () => {
    const openList = [node1, node2];
    const newNode = grid[6][0];

    newNode.cost = 5;

    const result = checkOpenList(openList, newNode);

    expect(result).toBe(true);
  })
})