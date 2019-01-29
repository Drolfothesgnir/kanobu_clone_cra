import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch , faBars } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';

import { UIConsumer } from '../../../../Context/UIContext';
import classes from './Tools.module.css';
import LoginButton from '../../../UI/UserLink/LoginButton';

const Tools = () => {
    return (
        <UIConsumer>
            {({onEnable, Shouts, onFetchShouts}) => (
                <div className = {classes.Tools}>
                    <button 
                        onClick = {()=>onEnable('searchActive')}>
                        <FontAwesomeIcon icon={faSearch}/>
                    </button>
                    <button
                        onClick = {()=>onEnable('sidenavActive')}
                        className = {classes.Sidenav}>
                        <FontAwesomeIcon icon={faBars}/>
                    </button>
                    <LoginButton className={classes.Login}/>
                    <button
                        onClick = {Shouts ? 
                            ()=>onEnable('shoutsActive') : onFetchShouts
                        }>
                        <FontAwesomeIcon icon={faBell}/>
                    </button>
                </div>
            )}
        </UIConsumer>
    );
};

export default Tools;