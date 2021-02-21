import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import reducer from './reducer';
// import { composeWithDevTools } from 'redux-devtools-extension';
import exchangeRateServerMiddleware from './middlewares';
import './index.css';
import '../node_modules/uikit/dist/css/uikit.css';
import App from './App';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeStoreEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const history = createBrowserHistory();

const store = createStore(
    reducer(history),
    composeStoreEnhancer(applyMiddleware(routerMiddleware(history), thunk, exchangeRateServerMiddleware)),
);

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App history={history} />
        </React.StrictMode>
    </Provider>,
    document.getElementById('root'),
);
