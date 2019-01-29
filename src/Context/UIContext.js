import React, { Component } from 'react';

const {Provider, Consumer} = React.createContext();

class UIProvider extends Component {

  state = {
    searchActive:false,
    sidenavActive:false,
    authActive:false,
    shoutsActive:false,
    profileEditorActive:false,
    Shouts:null,
    error:null
  }

  enableHandler = type => this.setState({[type]:true})

  disableHandler = (...types) => {
    const config = {};
    types.forEach(type => config[type] = false);
    this.setState(config);
  }

  fetchShouts = () => import('../containers/Shouts/Shouts')
    .then(cmp => this.setState({Shouts:cmp.default, shoutsActive:true}))
    .catch(error => this.setState({error}))

  render() {
    return (
      <Provider value={{
        ...this.state,
        onEnable:this.enableHandler,
        onDisable:this.disableHandler,
        onFetchShouts:this.fetchShouts
      }}>
        {this.props.children}
      </Provider>
    );
  }
}

export {UIProvider, Consumer as UIConsumer};