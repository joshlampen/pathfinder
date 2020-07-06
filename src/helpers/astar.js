const manhattanDistance = (currentNode, endNode) => {
  //Used for heuristics
  differenceInCol = Math.abs(currentNode.col - endNode.col);
  differenceInRow = Math.abs(currentNode.row - endNode.row);
  return differenceInCol + differenceInRow;
}

export const astar = (grid, start, end) => {
  let unVisitedNodes = [];
  let visitedNodes = [];

  unVisitedNodes.push(start);

  while (unVisitedNodes.length) {
    const currentNode = unVisitedNodes[0];
    const currentIdx = 0;
    
    unVisitedNodes.forEach((node, idx) => {
      if (node.cost < currentNode.cost) {
        currentNode = node;
        currentIdx = idx;
      }
    })

    unVisitedNodes = unVisitedNodes.splice(idx, 1);
    visitedNodes.push(currentNode);

    //found goal

  }
}