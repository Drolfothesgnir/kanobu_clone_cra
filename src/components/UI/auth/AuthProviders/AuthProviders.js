import React from 'react';

import { auth, fbProvider, twProvider } from '../../../../firebase';
import classes from './AuthProviders.module.css';

const AuthProviders = (props) => {
  const providerAuthHandler = type => {
    const provider = type === 'fb' ? fbProvider : twProvider;
    auth.signInWithPopup(provider)
      .then(props.success)
      .catch(error => props.fail(error));
  }
  return (
    <div className={classes.Providers}>
      <button 
        type='button'
        onClick={()=>providerAuthHandler('tw')}
        className={[classes.Provider,classes.Tw].join(' ')}>
        Twitter
      </button>
      <button
        type='button'
        onClick={()=>providerAuthHandler('fb')}
        className={[classes.Provider,classes.Fb].join(' ')}>
        Facebook
      </button>
    </div>
  );
};

export default AuthProviders;