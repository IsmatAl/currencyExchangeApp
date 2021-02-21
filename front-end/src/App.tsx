import React from 'react';
import ExchangeRateListContainer from './containers/ExchangeRateListContainer';
import CreateExchangeRate from './containers/CreateExchangeRateContainer';
import { ConnectedRouter } from 'connected-react-router';
import { Route /**, Redirect */ } from 'react-router-dom';
import { History } from 'history';
import UpdateExchangeRate from './containers/UpdateExchangeRateContainer';
import AppHeaderContainer from './containers/AppHeaderContainer';
import FlowChartContainer from './containers/FlowChartContainer';

import './App.css';

const App = ({ history }: { history: History }) => {
    return (
        <ConnectedRouter history={history}>
            <div className="App jumbotron vertical-center">
                {/* <Route exact path="/" render={() => (
        <Redirect to="/add" />
      )} /> */}
                <AppHeaderContainer />
                <Route path="/exchange-rates" component={ExchangeRateListContainer} />
                <Route path="/add" component={CreateExchangeRate} />
                <Route path="/update/:rateId" component={UpdateExchangeRate} />
                <Route path="/flowChart" component={FlowChartContainer} />
            </div>
        </ConnectedRouter>
    );
};

export default App;
