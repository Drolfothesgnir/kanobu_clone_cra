import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Backdrop from '../../components/UI/Backdrop/Backdrop';
import classes from './Search.module.css';

class Search extends React.Component{

    state = {value:''}

    inputChangeHandler = e => this.setState({value:e.target.value})

    submitHandler = e => {
        e.preventDefault();
        alert(this.state.value);
    }

    render(){
        return (
                    <>
                        <div className = {classes.Search}>
                                <input 
                                    onChange = {this.inputChangeHandler}
                                    value = {this.state.value}
                                    maxLength='100'
                                    type = 'text' 
                                    placeholder = 'Search . . .'/>
                                <button 
                                    className = {classes.Submit}
                                    onClick = {this.submitHandler}>
                                    <FontAwesomeIcon 
                                        size = '2x'
                                        icon={faSearch}/>
                                </button>
                            <button 
                                className = {classes.Close}
                                onClick = {this.props.close}>
                                &times;
                            </button>
                        </div>
                        <Backdrop 
                            backdropClicked = {this.props.close}
                            show/>
                    </>
        );
    }
}

export default Search;