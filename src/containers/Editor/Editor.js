import React, { Component } from 'react';

class Editor extends Component {

    state={
        value:'',
        bold:false
    }

    submitHandler = e => {
        e.preventDefault();
        console.log(this.state.value);
        
    }

    inputChangeHandler = e => {
        let value = e.target.value;
        if(this.state.bold) value = value.bold();
        this.setState({value})
    }

    render() {
        return (
            <div>
                <button 
                    onClick={() => this.setState({bold:true})}>
                    Bold
                </button>
                <form onSubmit={this.submitHandler}>
                    <textarea
                        value={this.state.value} 
                        onChange={this.inputChangeHandler}/>
                    <button>Done</button>
                </form>
            </div>
        );
    }
}

export default Editor;