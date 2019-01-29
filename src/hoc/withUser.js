import React from 'react';

import { UserConsumer as Consumer } from '../Context/UserContext';

const withUser = (Component) => props => (
  <Consumer>
    {data => <Component {...props} user={data}/>}
  </Consumer>
)

export default withUser;