import React from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import NavBar from '../../components/Navigation/NavBar/NavBar';
import Sidenav from '../../components/Navigation/Sidenav/Sidenav';

const Header = () => {
    console.log('header')
        return (
            <header>
                <Toolbar/>
                <NavBar/>
                <Sidenav/>
            </header>
        );
}

export default Header;