import {
  POST_DIAGRAM_REQUESTED,
  POST_DIAGRAM_SUCCEEDED,
  POST_DIAGRAM_FAILED,
  GET_DIAGRAM_REQUESTED,
  GET_DIAGRAM_SUCCEEDED,
  GET_DIAGRAM_FAILED,
} from '../actions';

const initialState = {
  nodeDataArray: [],
  linkDataArray: [],
  fetchState: { inFlight: false }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_DIAGRAM_REQUESTED: {
      return { ...state, fetchState: { inFlight: true } };
    }
    case POST_DIAGRAM_SUCCEEDED: {
      const { message } = action.payload;

      return { ...state, message: message };
    }
    case POST_DIAGRAM_FAILED: {
      const error = action.payload;
      return { ...state, error: error };
    }
    case GET_DIAGRAM_REQUESTED: {
      return { ...state, fetchState: { inFlight: true }, message: null, error: null }
    }
    case GET_DIAGRAM_SUCCEEDED: {
      const { diagram, message } = action.payload;
      return {
        fetchState: { inFlight: false },
        nodeDataArray: diagram.nodeDataArray,
        linkDataArray: diagram.linkDataArray,
        message
      };
    }
    case GET_DIAGRAM_FAILED: {
      const error = action.payload;
      return { ...state, fetchState: { inFlight: false }, error: error };
    }
    default: {
      return state;
    }
  }
}