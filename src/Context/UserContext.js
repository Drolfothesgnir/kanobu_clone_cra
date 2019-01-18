import React, { Component } from 'react';

import { auth } from '../firebase';

const { Provider, Consumer } = React.createContext({user:null});

class UserProvider extends Component {

  state = {user:null}

  authHandler = user => this.setState({user});

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if(user){
        user = {
          displayName:user.displayName,
          id:user.uid,
          email:user.email,
          image:user.photoURL
        }
        if(!user.displayName){
         return user.updateProfile({displayName:user.email.split('@')[0]})
            .then(user => this.authHandler(user));
        }
        this.authHandler(user);
      }else this.authHandler(user);
    })
  }
  

  render() {
    return (
      <Provider value={this.state.user}>
        {this.props.children}
      </Provider>
    );
  }
}

export {UserProvider, Consumer as UserConsumer};