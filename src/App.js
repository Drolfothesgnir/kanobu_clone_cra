import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Spinner from './components/UI/Spinners/Main/Spinner';
import Layout from './hoc/Layout/Layout';
import './App.css';

const App = () => {
    return (
            <Layout>
              <React.Suspense fallback={<Spinner/>}>
                <Switch>
                  <Route path='/' render={()=><h1>Hello World!!</h1>}/>
                </Switch> 
              </React.Suspense>
          </Layout>
    );
}

export default App;