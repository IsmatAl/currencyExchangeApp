import {
  POST_EXCHANGE_RATE_REQUESTED,
  postRateSucceeded,
  postRateFailed,

  GET_EXCHANGE_RATES_REQUESTED,
  getRatesSucceeded,
  getRatesFailed,
  updateRateSucceeded,
  updateRateFailed,
  UPDATE_EXCHANGE_RATE_REQUESTED,
  DELETE_EXCHANGE_RATE_REQUESTED,
  deleteRateSucceeded,
  deleteRateFailed, POST_DIAGRAM_REQUESTED, GET_DIAGRAM_REQUESTED, getDiagramSucceeded, getDiagramFailed, postDiagramSucceeded, postDiagramFailed
} from "../actions";
import { push } from 'connected-react-router';

const SERVER_ADDRESS_RATES = 'http://localhost:4000/api/v1/excangerates/';
const SERVER_ADDRESS_DIAGRAM = 'http://localhost:4000/api/v1/diagram/';

export const postExchangeRate = ({ currency, code, rate, localId }, fetch = window.fetch) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        SERVER_ADDRESS_RATES,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({ currency, code, rate })
        }
      );

      const json = await response.json();
      if (response.ok) {
        let { data: { _id: id }, message } = json;
        dispatch(postRateSucceeded({ id, localId, message }));
        dispatch(push('/exchange-rates'));
      } else {
        dispatch(postRateFailed(json));
      }

    } catch (error) {
      console.log(error);
    }
  }
};


export const postDiagramAsJson = (jsonStr, fetch = window.fetch) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        SERVER_ADDRESS_DIAGRAM,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: jsonStr
        }
      );

      const json = await response.json();
      if (response.ok) {
        let { _, message } = json;
        dispatch(postDiagramSucceeded({ message }));
      } else {
        dispatch(postDiagramFailed(json));
      }

    } catch (error) {
      postDiagramFailed(error);
    }
  }
};


export const getExchangeRates = (fetch = window.fetch) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        SERVER_ADDRESS_RATES,
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json'
          }
        }
      );

      const json = await response.json();

      if (response.ok) {
        let { message, data } = json;
        const rates = data.map(x => {
          let { _id: id, currency, code, rate } = x;
          return { id, currency, code, rate };
        });
        dispatch(getRatesSucceeded({ rates, message }));
      } else {
        dispatch(getRatesFailed(json));
      }
    } catch (error) {
      dispatch(getRatesFailed(error));
    }
  }
};


export const getDiagramAsJson = (fetch = window.fetch) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        SERVER_ADDRESS_DIAGRAM,
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json'
          }
        }
      );
      const json = await response.json();

      if (response.ok) {
        let { message, data } = json;
        let { _, jsonString } = data.pop();
        const diagram = JSON.parse(jsonString);
        dispatch(getDiagramSucceeded({ diagram, message }));
      } else {
        dispatch(getDiagramFailed(json));
      }
    } catch (error) {
      console.log(error)
      dispatch(getDiagramFailed(error));
    }
  }
};

export const updateExchangeRate = ({ currency, code, rate, id }, fetch = window.fetch) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        SERVER_ADDRESS_RATES + id,
        {
          method: 'PUT',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({ currency, code, rate })
        }
      );

      const json = await response.json();
      if (response.ok) {
        const { data: { _id: id, currency, code, rate }, message } = json;
        dispatch(updateRateSucceeded({ exchange: { id, currency, code, rate }, message }));
        dispatch(push('/exchange-rates'));
      } else {
        console.log('else')
        dispatch(updateRateFailed(json));
      }


    } catch (error) {
      dispatch(updateRateFailed(error));
    }
  }
}

export const deleteExchageRate = (id, fetch = window.fetch) => {
  return async (dispatch) => {
    try {

      const response = await fetch(
        SERVER_ADDRESS_RATES + id,
        {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          },
        }
      );

      let text = await response.text();
      if (response.ok) {
        text = text || `currency exchange rate deleted successfully`
        dispatch(deleteRateSucceeded({ id, message: text }));
      } else {
        dispatch(deleteRateFailed(text));
      }
    } catch (error) {
      dispatch(deleteRateFailed(error));
    }
  }
}

const exchangeRateServerMiddleware = (store) => (next) => {
  return (action) => {
    if (action.type === POST_EXCHANGE_RATE_REQUESTED) {
      store.dispatch(postExchangeRate(action.payload));
    } else if (action.type === GET_EXCHANGE_RATES_REQUESTED) {
      store.dispatch(getExchangeRates());
    } else if (action.type === UPDATE_EXCHANGE_RATE_REQUESTED) {
      store.dispatch(updateExchangeRate(action.payload));
    } else if (action.type === DELETE_EXCHANGE_RATE_REQUESTED) {
      store.dispatch(deleteExchageRate(action.payload));
    } else if (action.type === POST_DIAGRAM_REQUESTED) {
      store.dispatch(postDiagramAsJson(action.payload));
    } else if (action.type === GET_DIAGRAM_REQUESTED) {
      store.dispatch(getDiagramAsJson(action.payload));
    }
    return next(action);
  };
};


export default exchangeRateServerMiddleware;
