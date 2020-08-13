function dijkstra(board, startNode, targetNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(board);
    while (!!unvisitedNodes.length) {
        priorityDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        if (closestNode.isWall) {
            continue;
        }
        if (closestNode.distance === Infinity) {
            return visitedNodesInOrder;
        }
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === targetNode) {
            return visitedNodesInOrder;
        }
        updateUnvisitedNeighbors(closestNode, board);
    }
}
  
function priorityDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}
  
function updateUnvisitedNeighbors(node, board) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, board);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}
  
function getUnvisitedNeighbors(node, board) {
    const neighbors = [];
    const {col, row} = node;
    //make sure nodes won't go out of bound
    if (row > 0){
        neighbors.push(board[row - 1][col])
    }
    if (row < board.length - 1){
        neighbors.push(board[row + 1][col])
    }
    if (col > 0){
        neighbors.push(board[row][col - 1])
    }
    if (col < board[0].length - 1){
        neighbors.push(board[row][col + 1])
    }
    return neighbors.filter(neighbor => !neighbor.isVisited);
}
  
function getAllNodes(board) {
    let nodes = [];
    for (const row of board) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}
  
function shortestPath(finishNode) {
    let nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}

export {dijkstra, shortestPath};