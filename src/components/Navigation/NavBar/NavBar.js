import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavBar.module.css';

const NavBar = (props) => {

    const items = [
        {
            name:'ALL',
            url:'/',
            className:classes.all
        },
        {
            name:'GAMES',
            url:'/videogames',
            className:classes.games
        },
        {
            name:'FILMS AND SERIES',
            url:'/films',
            className:classes.films
        },
        {
            name:'BOOKS AND COMICS',
            url:'/books',
            className:classes.books
        },
        {
            name:'INTERNET',
            url:'/internet',
            className:classes.internet
        },
        {
            name:'TECHNOLOGIES',
            url:'/tech',
            className:classes.tech
        },
        {
            name:'CYBERSPORT',
            url:'/cybersport',
            className:classes.cybersport
        },
        {
            name:'MUSIC',
            url:'/music',
            className:classes.music
        }
    ].map(item => {
        return (
            <NavLink 
                exact
                className = {item.className}
                activeClassName = {classes.active}
                key = {item.name}
                to = {item.url}>
                {item.name}
            </NavLink>
        )
    })

    return (
        <div className = {classes.NavBar}>
            <nav onClick = {props.close}>
                {items}
            </nav>
        </div>
    );
};

export default NavBar;