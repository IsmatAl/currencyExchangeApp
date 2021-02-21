import ExchangeRateReducer from './ExchangeRateReducer';
import DiagramReducer from './DiagramReducer';

import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

// `combineReducers` is used to create different _slices_ of application state
// which are managed by different reducers.
export default (history) => combineReducers({
  router: connectRouter(history),
  exchangeRates: ExchangeRateReducer,
  diagram: DiagramReducer,
});
