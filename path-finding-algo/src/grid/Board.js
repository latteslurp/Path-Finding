import React, {Component} from 'react';
import Node from './Node';
import {dijkstra, shortestPath} from '../algorithm/dijkstra';
import './Board.css';

let default_start_row = 6;
let default_start_col = 5;
let default_target_row = 6;
let default_target_col = 25;


class Board extends Component{
    static defaultProps = {
        nrows: 15,
        ncols: 30
    }

    constructor(props){
        super(props);
        this.state={
            board: this.initialNodes(),
            isMouseDown: false,
            currentNodeStatus: "",
            previousNodeStatus: ""
        }
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleVisualizer = this.handleVisualizer.bind(this);
    }

    handleMouseDown(row, col){
        if(row===default_start_row && col===default_start_col){
            console.log('handle mouse start node clicked');
            let newBoard = this.updateStartNode(this.state.board, row, col);
            this.setState({
                board: newBoard,
                isMouseDown: true,
                currentNodeStatus: newBoard[row][col].isStart 
                                    ? "startNode" 
                                    : newBoard[row][col].isTarget 
                                    ? "targetNode" 
                                    : newBoard[row][col].isWall
                                    ? "wallNode" 
                                    : "",
                previousNodeStatus: "isStart"
            });
        }
        else if(row===default_target_row && col===default_target_col){
            let newBoard = this.updateTargetNode(this.state.board, row, col);
            this.setState({
                board: newBoard,
                isMouseDown: true,
                currentNodeStatus: newBoard[row][col].isStart 
                                    ? "startNode" 
                                    : newBoard[row][col].isTarget 
                                    ? "targetNode" 
                                    : newBoard[row][col].isWall
                                    ? "wallNode" 
                                    : "",
                previousNodeStatus : "isTarget" 
            });
        }
        else{
            let newBoard = this.wallToggle(this.state.board, row, col);
            this.setState({
                board: newBoard,
                isMouseDown: true,
                currentNodeStatus: newBoard[row][col].isStart 
                                    ? "startNode" 
                                    : newBoard[row][col].isTarget 
                                    ? "targetNode" 
                                    : newBoard[row][col].isWall
                                    ? "wallNode" 
                                    : "",
                previousNodeStatus : "isWall"
            });
        }
    }

    setBoard(){
        this.setState({
            board: this.initialNodes()
        });
    }

    handleMouseEnter(row, col){
        if(!this.state.isMouseDown){
            return;
        }
        let previousNodeStatus = this.state.previousNodeStatus;
        if(previousNodeStatus === "isStart"){
            console.log('handle mouse start node clicked');
            let newBoard = this.updateStartNode(this.state.board, row, col);
            default_start_row = row;
            default_start_col = col;
            this.setState({
                board: newBoard,
                currentNodeStatus: newBoard.isStart 
                                    ? "startNode" 
                                    : newBoard.isTarget 
                                    ? "targetNode" 
                                    : newBoard.isWall
                                    ? "wallNode" 
                                    : null
            });
        }
        else if(previousNodeStatus === "isTarget"){
            let newBoard = this.updateTargetNode(this.state.board, row, col);
            default_target_row = row;
            default_target_col = col;
            this.setState({
                board: newBoard,
                currentNodeStatus: newBoard.isStart 
                                    ? "startNode" 
                                    : newBoard.isTarget 
                                    ? "targetNode" 
                                    : newBoard.isWall
                                    ? "wallNode" 
                                    : null
            });
        }
        else{
            let newBoard = this.wallToggle(this.state.board, row, col);
            this.setState({
                board: newBoard,
                currentNodeStatus: newBoard.isStart 
                                    ? "startNode" 
                                    : newBoard.isTarget 
                                    ? "targetNode" 
                                    : newBoard.isWall
                                    ? "wallNode" 
                                    : null
            });
        }
    }

    handleMouseLeave(row, col){
        if(!this.state.isMouseDown){
            return;
        }
        let newBoard = this.state.board;
        let node = newBoard[row][col];
        let newNode = {...node};
        if(node.isStart){
            newNode = {isStart: !node.isStart, isTarget:false, isWall:false, isPrevious: !node.isStart};
        }
        else if(node.isTarget){
            newNode = {isTarget: !node.isTarget, isStart:false, isWall:false, previousNode: !node.isStart};
        }
        // else if(node.isWall){
        //     newNode = {isWall: node.isWall, isStart: false, isTarget: false, previousNode: node.isWall}
        // }
        newBoard[row][col] = newNode;
        this.setState({
            board: newBoard,
            previousNodeStatus: node.isStart ? "isStart" : node.isTarget ? "isTarget" : node.isWall ? "isWall" : ""
        });
    }

    handleMouseUp(){
        this.setState({
            isMouseDown: false,
            previousNodeStatus: ""
        });
    }

    createNode(row, col){
        let isStart = default_start_row===row && col===default_start_col;
        let isTarget = default_target_row===row && col===default_target_col;
        let isWall = false;
        return {
            row, 
            col,
            isStart: isStart,
            isTarget: isTarget,
            isWall: false,
            status: isStart ? "isStart" : isTarget ? "isTarget" : isWall ? "isWall" : "",
            previousNode: null,
            isVisited: false,
            distance: Infinity
        }
    }

    initialNodes(){
        let initialBoard = [];
        for(let row = 0; row<this.props.nrows; row++){
            let nestedArray = [];
            for(let col = 0; col<this.props.ncols; col++){
                nestedArray.push(
                    this.createNode(row, col)
                );
            }
            initialBoard.push(
            nestedArray);
        }
        return initialBoard;
    }

    wallToggle(board, row, col){
        const newBoard = board.slice();
        const node = newBoard[row][col];
        let newNode = {...node, isWall: !node.isWall}
        newBoard[row][col] = newNode;
        return newBoard;
    }

    updateStartNode(board, row, col){
        const newBoard = board.slice();
        const node = newBoard[row][col];
        let newNode = {...node, isStart: node.isStart ? node.isStart : !node.isStart}
        newBoard[row][col] = newNode;
        return newBoard;
    }

    updateTargetNode(board, row, col){
        const newBoard = board.slice();
        const node = newBoard[row][col];
        let newNode = {...node, isTarget: node.isTarget ? node.isTarget : !node.isTarget}
        newBoard[row][col] = newNode;
        return newBoard;
    }

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
          if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
              this.animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i);
            return;
          }
          setTimeout(() => {
            let node = visitedNodesInOrder[i];
            document.getElementById(`${node.row}-${node.col}`).className =
              'Node Node-visited';
          }, 10 * i);
        }
      }
    
    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`${node.row}-${node.col}`).className =
                'Node Node-shortest-path';
            }, 50 * i);
        }
    }
    
    visualizeDijkstra(board) {
        let newBoard = board.slice();
        let startNode = newBoard[default_start_row][default_start_col];
        let targetNode = newBoard[default_target_row][default_target_col];
        let visitedNodesInOrder = dijkstra(newBoard, startNode, targetNode);
        let nodesInShortestPathOrder = shortestPath(targetNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
        this.clearBoard(visitedNodesInOrder);
    }

    handleVisualizer(){
        this.visualizeDijkstra(this.state.board);
    }

    clearBoard(visitedNodesInOrder){
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            const node = visitedNodesInOrder[i];
            if(document.getElementById(`${node.row}-${node.col}`).className === 'Node Node-visited'){
                document.getElementById(`${node.row}-${node.col}`).className = 'Node';
            }
            if(document.getElementById(`${node.row}-${node.col}`).className ==='Node Node-shortest-path'){
                document.getElementById(`${node.row}-${node.col}`).className = 'Node';
            }
        }
    }

    renderNodes(){
        let visualizerBoard = [];
        for(let row=0; row<this.props.nrows; row++){
            let nestedArray = [];
            for(let col=0; col<this.props.ncols; col++){
                let coord = `${row}-${col}`;
                let isStart = this.state.board[row][col].isStart;
                let isTarget = this.state.board[row][col].isTarget;
                let isWall = this.state.board[row][col].isWall;
                let status = isStart ? "isStart" : isTarget ? "isTarget" : isWall ? "isWall" : "";
                nestedArray.push(
                    <Node 
                        key={coord}
                        row={row}
                        col={col}
                        id={`${row}-${col}`}
                        isWall={isWall}
                        isStart={isStart}
                        isTarget={isTarget}
                        status={status}
                        onMouseDown={this.handleMouseDown}
                        onMouseEnter={this.handleMouseEnter}
                        onMouseUp={this.handleMouseUp}
                        onMouseLeave={this.handleMouseLeave}
                    />
                );
            }
            visualizerBoard.push(<tr key={row}>{nestedArray}</tr>);
        }
        return visualizerBoard;
    }

    render(){
        
        return(
            <div>
                <div className="Board-navs">
                    <div className="nodes-description">
                        <div className="description">
                            <div className="node-type startNode"></div>
                            <p>Start Node</p>
                        </div>
                        <div className="description">
                            <div className="node-type targetNode"></div>
                            <p>Target Node</p>
                        </div>
                        <div className="description">
                            <div className="node-type wallNode"></div>
                            <p>Walls Node</p>
                        </div>
                        <div className="description">
                            <div className="node-type shortestPathNode"></div>
                            <p>Shortest paths Node</p>
                        </div>
                        <div className="description">
                            <div className="node-type visitedNode"></div>
                            <p>Visited Node</p>
                        </div>
                    </div>
                    <button onClick={this.handleVisualizer}>
                        Visualize Algorithm!
                    </button>
                </div>
                <table className='Board'>
                    <tbody>
                        {this.renderNodes()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Board;