import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';



const ExchangeRateList = (props) => {

  const useMemoCompare = (value, compare) => {
    // Ref for storing previous value
    const previousRef = useRef();
    const previous = previousRef.current;
    // Pass previous and new value to compare function
    const isEqual = compare(previous, value);
    // If not equal update previous to new value (for next render)
    // and then return new new value below.
    useEffect(() => {
      if (!isEqual) {
        previousRef.current = value;
      }
    });
    return isEqual ? previous : value;
  };

  let { exchangeRates: { rates, fetchState, error, message }, onRatesUpdate } = props;


  const theRates = useMemoCompare(rates, prevRates => prevRates && _.isEqual(prevRates, rates));

  useEffect(() => {
    onRatesUpdate(); // eslint-disable-next-line
  }, [theRates]);

  const exchageRaterateList = rates.map((exchangeRate, idx) => {
    if (exchangeRate.status) return <tr key={idx}><td>{exchangeRate.status}</td></tr>;
    return <tr key={idx}>
      <th>{idx + 1}</th>
      <td>{exchangeRate.currency}</td>
      <td>{exchangeRate.code}</td>
      <td>{exchangeRate.rate}</td>
      <th><div className='btn-group'>
        <button className='btn btn-primary' onClick={() => props.update(exchangeRate.id)}>Update</button>
        <button className='btn btn-danger' onClick={() => props.delete(exchangeRate.id)}>Delete</button>
      </div></th>
    </tr >
  });
  const lists = fetchState.inFlight ? <div className="container progress center-block" style={{margin: '10% 0'}}>
    <div
      className="container progress-bar progress-bar-striped progress-bar-animated"
      role="progressbar"
      aria-valuenow="75"
      aria-valuemin="0"
      aria-valuemax="100"
      style={{ width: 75 + '%' }}></div>
  </div> : <div className="container">
      {message && <div className='text-success'>{message}</div>}
      {error && <div className='text-danger'>{error.description}</div>}
      <h2>Currency Exchange Rates</h2>
      <p>You can add, delete, and update exchage rates</p>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Currency Name</th>
            <th>Currency code</th>
            <th>Currency rate</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {exchageRaterateList}
        </tbody>
      </table>
    </div>
  return lists;
}

ExchangeRateList.propTypes = {
  exchangeRates: PropTypes.shape({
    rates: PropTypes.arrayOf(
      PropTypes.shape({
        currency: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
        rate: PropTypes.number.isRequired
      })
    ),
    fetchState: PropTypes.shape({ inFlight: PropTypes.bool })
  }),
  update: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
};

export default ExchangeRateList;
