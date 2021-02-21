import ExchangeRateForm from '../components/ExchangeRateForm';
import { updateRateRequested } from '../actions'
import { connect } from 'react-redux';


const mapStateToProps = (state, ownProps) => {
  const rateId = ownProps.match.params.rateId;
  return {
    message: state.exchangeRates.message,
    error: state.exchangeRates.error,
    rate: state.exchangeRates.rates.find(x => x.id === rateId)
  }
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (rate) => dispatch(updateRateRequested(rate))
});
export default connect(mapStateToProps, mapDispatchToProps)(ExchangeRateForm);
