let rateId = 1;

export const POST_EXCHANGE_RATE_REQUESTED = 'POST_EXCHANGE_RATE_REQUESTED',
    POST_EXCHANGE_RATE_SUCCEEDED = 'POST_EXCHANGE_RATE_SUCCEEDED',
    POST_EXCHANGE_RATE_FAILED = 'POST_EXCHANGE_RATE_FAILED',

    GET_EXCHANGE_RATES_REQUESTED = 'GET_EXCHANGE_RATES_REQUESTED',
    GET_EXCHANGE_RATES_SUCCEEDED = 'GET_EXCHANGE_RATES_SUCCEEDED',
    GET_EXCHANGE_RATES_FAILED = 'GET_EXCHANGE_RATES_FAILED',


    POST_DIAGRAM_REQUESTED = 'POST_DIAGRAM_REQUESTED',
    POST_DIAGRAM_SUCCEEDED = 'POST_DIAGRAM_SUCCEEDED',
    POST_DIAGRAM_FAILED = 'POST_DIAGRAM_FAILED',

    GET_DIAGRAM_REQUESTED = 'GET_DIAGRAM_REQUESTED',
    GET_DIAGRAM_SUCCEEDED = 'GET_DIAGRAM_SUCCEEDED',
    GET_DIAGRAM_FAILED = 'GET_DIAGRAM_FAILED',

    DELETE_EXCHANGE_RATE_REQUESTED = 'DELETE_EXCHANGE_RATE_REQUESTED',
    DELETE_EXCHANGE_RATE_SUCCEEDED = 'DELETE_EXCHANGE_RATE_SUCCEEDED',
    DELETE_EXCHANGE_RATE_FAILED = 'DELETE_EXCHANGE_RATE_FAILED',

    UPDATE_EXCHANGE_RATE_REQUESTED = 'UPDATE_EXCHANGE_RATE_REQUESTED',
    UPDATE_EXCHANGE_RATE_SUCCEEDED = 'UPDATE_EXCHANGE_RATE_SUCCEEDED',
    UPDATE_EXCHANGE_RATE_FAILED = 'UPDATE_EXCHANGE_RATE_FAILED';


export const postRateRequested = (rate) => {
    return {
        type: POST_EXCHANGE_RATE_REQUESTED,
        payload: {
            ...rate,
            localId: rateId++
        }
    };
};

export const postRateSucceeded = (response) => {
    return {
        type: POST_EXCHANGE_RATE_SUCCEEDED,
        payload: response
    };
};

export const postRateFailed = (reason) => ({
    type: POST_EXCHANGE_RATE_FAILED,
    payload: reason
});



export const postDiagramRequested = (jsonStr) => {
    console.log(jsonStr);
    return {
        type: POST_DIAGRAM_REQUESTED,
        payload: JSON.stringify(jsonStr)
    };
};

export const postDiagramSucceeded = (response) => {
    return {
        type: POST_DIAGRAM_SUCCEEDED,
        payload: response
    };
};

export const postDiagramFailed = (reason) => ({
    type: POST_DIAGRAM_FAILED,
    payload: reason
});

export const getRatesRequested = () => ({ type: GET_EXCHANGE_RATES_REQUESTED });

export const getRatesSucceeded = (rates) => ({
    type: GET_EXCHANGE_RATES_SUCCEEDED,
    payload: rates
});

export const getRatesFailed = (reason) => ({
    type: GET_EXCHANGE_RATES_FAILED,
    payload: reason
});

export const getDiagramRequested = () => ({ type: GET_DIAGRAM_REQUESTED });

export const getDiagramSucceeded = (rates) => ({
    type: GET_DIAGRAM_SUCCEEDED,
    payload: rates
});

export const getDiagramFailed = (reason) => ({
    type: GET_DIAGRAM_FAILED,
    payload: reason
});

export const updateRateRequested = (rate) => ({
    type: UPDATE_EXCHANGE_RATE_REQUESTED,
    payload: rate
});

export const updateRateSucceeded = (rate) => ({
    type: UPDATE_EXCHANGE_RATE_SUCCEEDED,
    payload: rate
});

export const updateRateFailed = (reason) => ({
    type: UPDATE_EXCHANGE_RATE_FAILED,
    payload: reason
});


export const deleteRateRequested = (id) => ({
    type: DELETE_EXCHANGE_RATE_REQUESTED,
    payload: id
});

export const deleteRateSucceeded = (response) => ({
    type: DELETE_EXCHANGE_RATE_SUCCEEDED,
    payload: response
});

export const deleteRateFailed = (reason) => ({
    type: DELETE_EXCHANGE_RATE_FAILED,
    payload: reason
});