import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from './Context/UserContext';
import { UIProvider } from './Context/UIContext';
import App from './App';

const app = (
    <BrowserRouter>
        <UserProvider>
            <UIProvider>
                <App/>
            </UIProvider>
        </UserProvider>
    </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
