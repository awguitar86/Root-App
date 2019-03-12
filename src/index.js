import React from 'react';
import ReactDOM from 'react-dom';
import { Router }from 'react-router-dom';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { createBrowserHistory } from 'history';
import {store, persistor} from './Redux/configureStore';
import Amplify from 'aws-amplify';
import config from './config';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import Loading from './Components/LoadingPage/Loading';

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: config.REGION,
        userPoolId: config.USER_POOL_ID,
        identityPoolId: config.IDENTITY_POOL_ID,
        userPoolWebClientId: config.APP_CLIENT_ID
    }
});

ReactDOM.render(
<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <Router onUpdate={() => window.scrollTo(0, 0)} history={createBrowserHistory()}>
            <App />
        </Router>
    </PersistGate>
</Provider>
, document.getElementById('root'), );
registerServiceWorker();
