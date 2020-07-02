import React, {Component} from 'react';
import './Node.css';

class Node extends Component{
    constructor(props){
        super(props);

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.hanldeMouseEnter = this.hanldeMouseEnter.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleMouseDown(evt){
        this.props.onMouseDown(this.props.row, this.props.col);
    }

    hanldeMouseEnter(evt){
        this.props.onMouseEnter(this.props.row, this.props.col);
    }

    handleMouseUp(evt){
        this.props.onMouseUp(this.props.row, this.props.col);
    }

    handleMouseLeave(){
        this.props.onMouseLeave(this.props.row, this.props.col);
    }

    render(){
        const{
            col,
            row,
            isWall,
            isStart,
            isTarget,
        } = this.props;

        let classNames = 'Node ' + (isTarget ? "Node-isTarget" : 
        (isStart ? "Node-isStart" : 
        (isWall ? "Node-isWall" : "")));

        return(
            <td className={classNames}
            id={`${row}-${col}`}
            onMouseDown={this.handleMouseDown}
            onMouseEnter={this.hanldeMouseEnter}
            onMouseUp={this.handleMouseUp}
            onMouseLeave={this.handleMouseLeave}
            />
        )
    }
}

export default Node;