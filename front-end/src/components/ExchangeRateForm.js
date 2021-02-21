import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


const ExchangeRateForm = (props) => {

  let rate = props.rate;
  const [state, setState] = useState({ currency: '', code: '', rate: 0 });

  useEffect(() => {
    if (rate) {
      let exchangeRate = rate;
      setState({
        id: exchangeRate.id,
        currency: exchangeRate.currency,
        code: exchangeRate.code,
        rate: exchangeRate.rate
      });
    }
  }, [rate]);

  const handleInputChange = (event) => {
    const name = event.target.name;
    let value = event.target.value;
    value = name === 'rate' ? +value : value

    setState({ ...state, [name]: value })
  };

  const onSubmit = () => {
    props.onSubmit(state);
    setState({ ...state, currency: '', code: '', rate: 0 });
  }

  return (
    <div className='exchange-rate-form  align-items-center container-fluid'>
      {props.error && <div className='text-danger'>{props.error.description}</div>}
      <div className='mx-sm-3 mb-2'>
        <h2>Currency Exchange Rate Form</h2>
        <label>Currency name</label>
        <input
          className='form-control'
          name="currency"
          type="text"
          value={state.currency}
          onChange={handleInputChange} />
      </div>

      <div className='mx-sm-3 mb-2'>
        <label>Currency code</label>
        <input
          className='form-control'
          name="code"
          type="text"
          value={state.code}
          onChange={handleInputChange} />
      </div>
      <div className='mx-sm-3 mb-2'>
        <label>Exchange rate</label>
        <input
          className='form-control'
          name="rate"
          type="number"
          step="0.01"
          value={state.rate}
          onChange={handleInputChange} />
      </div>
      <button
        className='btn btn-primary mx-sm-3 mb-2'
        onClick={onSubmit}>
        Submit
        </button>
    </div>
  );
}

ExchangeRateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ExchangeRateForm;
