import { Link } from 'react-router-dom';
import React from 'react';

import classes from './Logo.module.css';
import logo from '../../../assets/images/kanobu_logo.png';

const Logo = () => {
    return (
        <Link to = '/' className = {classes.Logo}>
            <div>
                <img src = {logo} alt = 'kanobu_logo'/>
                <span>КАНОБУ</span>
            </div>
        </Link>
    );
};

export default Logo;