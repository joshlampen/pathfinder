export const getNeighborsBreadthFirst = (node, grid) => {
  const neighbors = [];
  
  const { row, col } = node;

  if (grid[row - 1] && !grid[row - 1][col].isWall) {
    neighbors.push(grid[row - 1][col]);
  }

  if (grid[row + 1] && !grid[row + 1][col].isWall) {
    neighbors.push(grid[row + 1][col]);
  }

  if (grid[row][col - 1] && !grid[row][col - 1].isWall) {
    neighbors.push(grid[row][col - 1])
  }

  if (grid[row][col + 1] && !grid[row][col + 1].isWall) {
    neighbors.push(grid[row][col + 1]);
  }

  return neighbors;
}

export default function breadthFirst(grid, start, end) {
  let queue = [start];
  let visitedNodes = [start];

  while (queue.length > 0) {
    const currentNode = queue.shift();
    currentNode.isVisited = true;
    visitedNodes.push(currentNode);

    if (currentNode === end) {
      return visitedNodes;
    }
    
    const neighbors = getNeighborsBreadthFirst(currentNode, grid);
    neighbors.forEach(neighbor => {
      if (!neighbor.isVisited) {
        neighbor.previousNode = currentNode;
        if (queue.indexOf(neighbor) < 0) {
          queue.push(neighbor);
        }
      }
    })
  }

  return visitedNodes;
}