import React from 'react';

import Logo from '../../UI/Logo/Logo';
import classes from './Toolbar.module.css';
import NavItems from './NavItems/NavItems';
import Tools from './Tools/Tools';

const Toolbar = () => {
    return (
        <div className = {classes.Toolbar}>
            <div className = {classes.Container}>
                <Logo/>
                <NavItems/>
                <Tools/>
            </div>
        </div>
    );
};

export default Toolbar;