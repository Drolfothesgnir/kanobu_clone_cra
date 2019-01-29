import React from 'react';

import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../Spinners/Additional/Spinner';
import withUser from '../../../hoc/withUser';
import { UIConsumer } from '../../../Context/UIContext';

const UserLink = React.lazy(() => import('./UserLink'))

const LoginButton = (props) => {
  return (
        props.user.data ? (
          <React.Suspense fallback={<Spinner/>}>
            <UserLink user={props.user}/>
          </React.Suspense>
        ) : (
          <UIConsumer>
            {({onEnable, onDisable}) => (
              <button
              className = {props.className}
              onClick = {()=>{
                onDisable('sidenavActive')
                onEnable('authActive')
                }}>
              <FontAwesomeIcon icon = {faSignInAlt}/>
              LOGIN
            </button>
            )}
          </UIConsumer>
        )
  );
};

export default withUser(LoginButton);