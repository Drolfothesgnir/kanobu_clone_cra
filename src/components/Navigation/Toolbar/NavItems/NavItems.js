import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './NavItems.module.css';

const NavItems = (props) => {

    const items = [
        {
            name:'GAMES',
            url:'/games'
        },
        {
            name:'NEWS',
            url:'/news'
        },
        {
            name:'ARTICLES',
            url:'/articles'
        },
        {
            name:'REVIEWS',
            url:'/reviews'
        },
        {
            name:'PUB',
            url:'/pub'
        },
        {
            name:'SHOUTS',
            url:'/shouts'
        }
    ].map(item => {
        return (
            <NavLink 
                activeClassName = {classes.active}
                key = {item.name}
                to = {item.url}>
                {item.name}
            </NavLink>
        )
    })

    return (
        <nav 
            onClick = {props.close}
            className = {classes.NavItems}>
            {items}
        </nav>
    );
};

export default NavItems;