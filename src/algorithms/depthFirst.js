const getNeighborsDfs = (node, grid) => {
  const neighbors = [];

  const { row, col } = node;

  if (grid[row - 1] && !grid[row - 1][col].isWall) {
    neighbors.unshift(grid[row - 1][col]);
  }

  if (grid[row][col + 1] && !grid[row][col + 1].isWall) {
    neighbors.unshift(grid[row][col + 1]);
  }

  if (grid[row + 1] && !grid[row + 1][col].isWall) {
    neighbors.unshift(grid[row + 1][col]);
  }
  
  if (grid[row][col - 1] && !grid[row][col - 1].isWall) {
    neighbors.unshift(grid[row][col - 1])
  }
  return neighbors;
}

export default function depthFirst(grid, start, end) {
  let stack = [start];
  let visitedNodes = [start];

  while (stack.length > 0) {
    const currentNode = stack.pop();
    visitedNodes.push(currentNode);
    currentNode.isVisited = true;

    if (currentNode === end) {
      return visitedNodes;
    }

    const neighbors = getNeighborsDfs(currentNode, grid);
    neighbors.forEach(neighbor => {
      if (!neighbor.isVisited) {
        neighbor.previousNode = currentNode;
        stack.push(neighbor);
      }
    })
  }
  return visitedNodes;
}