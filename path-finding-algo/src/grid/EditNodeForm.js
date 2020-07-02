import React, {Component} from 'react';

class EditNodeForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            startNodeRow:6,
            startNodeCol:5,
            targetNodeRow:6,
            targetNodeCol:25
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleSubmit(evt){
        evt.preventDefault();
        let {startRow, startCol, targetRow, targetCol} = this.state; 
        this.props.editStartOrTarget(startRow, startCol, targetRow, targetCol);
        this.setState({
            [evt.target.name]: ""
        });
    }

    render(){
        return(
            <form className="EditNodeForm" onSubmit={this.handleSubmit}>
                <label htmlFor='startNodeRow'>Start Node's Row: </label>
                <input
                    type='text'
                    id='startNodeRow'
                    name='startNodeRow'
                    value={this.state.startNodeRow}
                    onChange={this.handleChange}
                />
                <label htmlFor='startNodeCol'>Start Node's Column: </label>
                <input
                    type='text'
                    id='startNodeCol'
                    name='startNodeCol'
                    value={this.state.startNodeCol}
                    onChange={this.handleChange}
                />
                <label htmlFor='targetNodeRow'>Target Node's Row: </label>
                <input
                    type='text'
                    id='targetNodeRow'
                    name='targetNodeRow'
                    value={this.state.targetNodeRow}
                    onChange={this.handleChange}
                />
                <label htmlFor='targetNodeCol'>Target Node's Column: </label>
                <input
                    type='text'
                    id='targetNodeCol'
                    name='targetNodeCol'
                    value={this.state.targetNodeCol}
                    onChange={this.handleChange}
                />
                <button>Set positions</button>
            </form>
        );
    }
}

export default EditNodeForm;