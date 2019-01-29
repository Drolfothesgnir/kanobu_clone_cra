import React, { Component } from 'react';

import { auth } from '../firebase';

const { Provider, Consumer } = React.createContext({user:null});

class UserProvider extends Component {

  state = {user:null}

  authHandler = (user = null) => {
    console.log(user);
    this.setState({user})
  };

  componentDidMount() {
    auth.onAuthStateChanged(async user => {
      if(user){
        let displayName = user.displayName;
        if(!displayName){
          const splitName = user.email.split('@')[0]; 
          await user.updateProfile({displayName:splitName})
          .then(() => displayName = splitName);
        }
        const data = {
          id:user.uid,
          displayName,
          email:user.email,
          image:user.photoURL
        }
        this.authHandler(data);
      } else this.authHandler()
    });
  }
  

  render() {
    return (
      <Provider value={{
        data:this.state.user,
        onUserDataChanged:this.authHandler
      }}>
        {this.props.children}
      </Provider>
    );
  }
}

export {UserProvider, Consumer as UserConsumer};