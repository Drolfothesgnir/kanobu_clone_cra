import React from 'react';
import { CSSTransition } from 'react-transition-group';

import { UIConsumer } from '../../../Context/UIContext';
import LoginButton from '../../UI/UserLink/LoginButton';
import Logo from '../../UI/Logo/Logo';
import ToolbarItems from '../Toolbar/NavItems/NavItems';
import NavbarItems from '../NavBar/NavBar';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './Sidenav.module.css';

const Sidenav = () => {
    return (
      <UIConsumer>
        {({sidenavActive, onDisable}) => (
            <>
              <CSSTransition
                  mountOnEnter
                  unmountOnExit
                  timeout = {500}
                  classNames = {{
                    enterActive:classes.Open,
                    exitActive:classes.Close
                  }}
                  in = {sidenavActive}>
                  <div className = {classes.Sidenav}>
                      <div className = {classes.Head}>
                          <Logo/>
                          <button 
                              onClick = {()=>onDisable('sidenavActive')}>
                              &times;
                          </button>
                      </div>
                      <LoginButton className={classes.Login}/>
                      <ToolbarItems
                          close={()=>onDisable('sidenavActive')}/>
                      <NavbarItems 
                          close={()=>onDisable('sidenavActive')}/>
                  </div>
              </CSSTransition>
              <Backdrop 
                  backdropClicked = {()=>onDisable('sidenavActive')}
                  show = {sidenavActive}/>
          </>
        )}
      </UIConsumer>
    );
};

export default Sidenav;