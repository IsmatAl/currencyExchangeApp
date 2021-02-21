import {
  POST_EXCHANGE_RATE_REQUESTED,
  POST_EXCHANGE_RATE_SUCCEEDED,
  GET_EXCHANGE_RATES_SUCCEEDED,
  DELETE_EXCHANGE_RATE_REQUESTED,
  DELETE_EXCHANGE_RATE_SUCCEEDED,
  UPDATE_EXCHANGE_RATE_REQUESTED,
  UPDATE_EXCHANGE_RATE_SUCCEEDED,
  UPDATE_EXCHANGE_RATE_FAILED,
  GET_EXCHANGE_RATES_REQUESTED,
  POST_EXCHANGE_RATE_FAILED,
  GET_EXCHANGE_RATES_FAILED,
  DELETE_EXCHANGE_RATE_FAILED
} from '../actions';

const initialState = {
  // rates: [{ localId: 0, id: '34503-4ifm3049r', inFlight: false, currency: 'United States Dollar', code: 'USD', rate: 0.92 }],
  rates: [],
  fetchState: { inFlight: false }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_EXCHANGE_RATE_REQUESTED: {
      const rate = action.payload;
      // console.log(rate);
      return { ...state, rates: [...state.rates, { ...rate, inFlight: true }], message: null, error: null };
    }
    case POST_EXCHANGE_RATE_SUCCEEDED: {
      const { id, localId, message } = action.payload;
      const exchangeRate = state.rates.find(x => x.localId === localId),
        newRates = state.rates.filter(x => x.localId !== localId);

      return { ...state, message: message, rates: [...newRates, { ...exchangeRate, id: id, inFlight: false }] };
    }
    case POST_EXCHANGE_RATE_FAILED: {
      const error = action.payload;
      return { ...state, error: error };
    }
    case GET_EXCHANGE_RATES_REQUESTED: {
      return { ...state, fetchState: { inFlight: true }, message: null, error: null }
    }
    case GET_EXCHANGE_RATES_SUCCEEDED: {
      const { rates, message } = action.payload;
      return { fetchState: { inFlight: false }, rates, message };
    }
    case GET_EXCHANGE_RATES_FAILED: {
      const error = action.payload;
      return { ...state, fetchState: { inFlight: false }, error: error };
    }
    case DELETE_EXCHANGE_RATE_REQUESTED: {
      const id = action.payload,
        rate = state.rates.find(x => x.id === id),
        newRates = state.rates.filter(x => x.id !== id);

      return { ...state, rates: [...newRates, { ...rate, inFlight: true }], message: null, error: null };
    }
    case DELETE_EXCHANGE_RATE_SUCCEEDED: {
      const { id, message } = action.payload;
      const newRates = state.rates.filter(x => x.id !== id);
      return { ...state, rates: newRates, message: message };
    }
    case DELETE_EXCHANGE_RATE_FAILED: {
      const error = action.payload;
      return { ...state, error: error };
    }
    case UPDATE_EXCHANGE_RATE_REQUESTED: {
      const newRate = action.payload,
        prevRate = state.rates.find(x => x.id === newRate.id),
        interimRates = state.rates.filter(x => x.id !== newRate.id);

      return { ...state, rates: [...interimRates, { ...prevRate, status: 'updating' }], message: null, error: null };
    }
    case UPDATE_EXCHANGE_RATE_SUCCEEDED: {
      const { exchange, message } = action.payload,
        newRates = state.rates.filter(x => x.id !== exchange.id);

      return {
        ...state, message, rates: [...newRates, exchange]
      };
    }
    case UPDATE_EXCHANGE_RATE_FAILED: {
      const error = action.payload;
      const rates = state.rates.map(x => {
        if (x.status === 'updating') {
          let { status, ...x_ } = x;
          return x_;
        }
        return x;
      });
      return { ...state, rates, error: error };
    }
    default: {
      return state;
    }
  }
}