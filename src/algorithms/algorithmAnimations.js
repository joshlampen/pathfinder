import { getShortestPathNodes } from './algorithmHelpers';

export const animateAlgorithm = (firstVisitedNodesInOrder, firstShortestPathNodes, secondVisitedNodesInOrder, secondShortestPathNodes, setState, count) => {
  for (let i = 0; i <= firstVisitedNodesInOrder.length; i++) { // once all nodes are animated, animate the shortest path
		const node = firstVisitedNodesInOrder[i];

		if (i === firstVisitedNodesInOrder.length) {
			setTimeout(() => {
        if (secondVisitedNodesInOrder.length) {
          animateAlgorithm(secondVisitedNodesInOrder, secondShortestPathNodes, [], firstShortestPathNodes, setState, 1);
        } else {
          animateShortestPath(firstShortestPathNodes, secondShortestPathNodes, setState, count);
        }
			}, 10 * i)
		} else {
			setTimeout(() => {
        if (count > 0) {
          if (node.lastRow) {
            node.isWeight
              ? document.getElementById(`node-${node.row}-${node.col}`).className += ' node-weight-second-visited-last-row'
              : document.getElementById(`node-${node.row}-${node.col}`).className += ' node-second-visited-last-row';
          } 
          
          if (node.lastCol) {
            node.isWeight
              ? document.getElementById(`node-${node.row}-${node.col}`).className += ' node-weight-second-visited-last-col'
              : document.getElementById(`node-${node.row}-${node.col}`).className += ' node-second-visited-last-col';
          }

          node.isWeight
            ? document.getElementById(`node-${node.row}-${node.col}`).className += ' node-weight-second-visited'
            : document.getElementById(`node-${node.row}-${node.col}`).className += ' node-second-visited';
        } else {
          if (node.lastRow) {
            node.isWeight
              ? document.getElementById(`node-${node.row}-${node.col}`).className += ' node-weight-first-visited-last-row'
              : document.getElementById(`node-${node.row}-${node.col}`).className += ' node-first-visited-last-row';
          } 
          
          if (node.lastCol) {
            node.isWeight
              ? document.getElementById(`node-${node.row}-${node.col}`).className += ' node-weight-first-visited-last-col'
              : document.getElementById(`node-${node.row}-${node.col}`).className += ' node-first-visited-last-col';
          }

          node.isWeight
            ? document.getElementById(`node-${node.row}-${node.col}`).className += ' node-weight-first-visited'
            : document.getElementById(`node-${node.row}-${node.col}`).className += ' node-first-visited';
        }
			}, 10 * i)
		}
  }
}

export const animateShortestPath = (firstShortestPathNodes, secondShortestPathNodes, setState, count) => {
  let shortestPathNodes = [];

  if (secondShortestPathNodes) {
    for (const node of secondShortestPathNodes) {
      shortestPathNodes.push(node);
    }
  }

  for (const node of firstShortestPathNodes) {
    shortestPathNodes.push(node);
  }

  if (!secondShortestPathNodes.length && count > 0) {
    shortestPathNodes = [];
    setState(prev => ({ ...prev, inProgress: 'DONE' }));
  }

  if (!shortestPathNodes.length) setState(prev => ({ ...prev, inProgress: 'DONE' }));

  for (let i = 0; i < shortestPathNodes.length; i++) {
    setTimeout(() => {
      const node = shortestPathNodes[i];

      if (!node) return;

      if (node.isWeight) {
        document.getElementById(`node-${node.row}-${node.col}`).getElementsByTagName('div')[0].className += ' node-weight-shortest-path';
      }

      if (node.lastRow) {
        document.getElementById(`node-${node.row}-${node.col}`).className += ' node-shortest-path-last-row';
      } 
      
      if (node.lastCol) {
        document.getElementById(`node-${node.row}-${node.col}`).className += ' node-shortest-path-last-col';
      }

			document.getElementById(`node-${node.row}-${node.col}`).className += ' node-shortest-path';
			
    }, 50 * i);
		if (i === shortestPathNodes.length - 1) {
			setTimeout(() => {
				setState(prev => ({ ...prev, inProgress: 'DONE' }));
			}, 50 * i)
		}
  }
}

export default async function visualizeAlgorithm(algorithm, grid, startNode, finishNode, interNode, setState) {
  const firstGrid = grid.map(row => {
    return row.map(node => {
      const newNode = {
        ...node,
        isVisited: false,
      }

      return newNode
    })
  })

  const secondGrid = grid.map(row => {
    return row.map(node => {
      const newNode = {
        ...node,
        isVisited: false,
      }

      return newNode
    })
  })

  const startNodeObj = firstGrid[startNode.row][startNode.col];
  const firstInterNodeObj = interNode ? firstGrid[interNode.row][interNode.col] : null;
  const secondInterNodeObj = interNode ? secondGrid[interNode.row][interNode.col] : null;
  const finishNodeObj = interNode ? secondGrid[finishNode.row][finishNode.col] : firstGrid[finishNode.row][finishNode.col];

  const firstVisitedNodesInOrder = interNode ? algorithm(firstGrid, startNodeObj, firstInterNodeObj) : algorithm(firstGrid, startNodeObj, finishNodeObj);
  let secondVisitedNodesInOrder = interNode ? algorithm(secondGrid, secondInterNodeObj, finishNodeObj) : [];

  const firstShortestPathNodes = interNode ? getShortestPathNodes(startNodeObj, firstInterNodeObj) : getShortestPathNodes(startNodeObj, finishNodeObj);
  let secondShortestPathNodes = interNode ? getShortestPathNodes(secondInterNodeObj, finishNodeObj) : [];

  if (secondVisitedNodesInOrder.length && !firstVisitedNodesInOrder.includes(firstInterNodeObj)) {
    secondVisitedNodesInOrder = [];
    secondShortestPathNodes = [];
  }

  animateAlgorithm(firstVisitedNodesInOrder, firstShortestPathNodes, secondVisitedNodesInOrder, secondShortestPathNodes, setState, 0);
}