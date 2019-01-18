import React from 'react';

import { UserConsumer as Consumer } from '../Context/UserContext';

const withUser = (Component) => props => (
  <Consumer>
    {user => <Component {...props} user={user}/>}
  </Consumer>
)

export default withUser;