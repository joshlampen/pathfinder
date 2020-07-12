import { updateUnvisitedNeighbors, sortNodesByDistance, removeNestedNodes } from "./algorithmHelpers";

// core dijkstra algorithm
export default function dijkstra(grid, startNode, finishNode) {
	const visitedNodesInOrder = [];
	startNode.distance = 0;
	const unvisitedNodes = removeNestedNodes(grid);
	// const unvisitedNodes = grid;

	while (unvisitedNodes.length > 0) { // while there are still unvisited nodes...
		sortNodesByDistance(unvisitedNodes);
		const closestNode = unvisitedNodes.shift() // remove the first node in the array (i.e. one of the neighbors)

		if (closestNode.isWall) continue;

		if (closestNode.distance === Infinity) return visitedNodesInOrder;
		// if the start node is completely surrounded by walls, we can't find any more neighbors (where distance isn't infinity) and are therefore stuck

		closestNode.isVisited = true;
		visitedNodesInOrder.push(closestNode);

		if (closestNode.row === finishNode.row && closestNode.col === finishNode.col) return visitedNodesInOrder; // algorithm complete, finished node has been found
		
		updateUnvisitedNeighbors(closestNode, grid);
	}
}