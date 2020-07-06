export const getUnvisitedNeighborsBfs = (node, grid) => {
  const neighbors = [];
  const { row, col } = node;

  if (grid[row - 1] && !grid[row - 1][col].isWall) {
    neighbors.push(grid[row - 1][col]);
  }

  if (grid[row + 1] && !grid[row + 1][col].isWall) {
    neighbors.push(grid[row + 1][col]);
  }

  if (grid[row][col - 1] && !grid[row][col - 1].isWall) {
    neighbors.push(grid[row][col - 1]);
  }
  
  if (grid[row][col + 1] && !grid[row][col + 1].isWall) {
    neighbors.push(grid[row][col + 1])
  }
  return neighbors;
}

export const bfs = (start, end, grid) => {
  let queue = [start];
  let visitedNodes = [];

  while (queue.length > 0) {
    const currentNode = queue.shift();
    currentNode.isVisited = true;
    visitedNodes.push(currentNode);
    if (currentNode === end) {
      return visitedNodes;
    }

    const neighbors = getUnvisitedNeighborsBfs(currentNode, grid);
    neighbors.forEach(neighbor => {
      if (!neighbor.isVisited && !neighbor.isWall) {
        neighbor.previousNode = currentNode;
        queue.push(neighbor)
      }
    })
  }
  return visitedNodes;
}

/*next steps: 
- Visualize bfs
- Integrate to the front-end
*/