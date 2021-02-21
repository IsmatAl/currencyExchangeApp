import ExchangeRateForm from '../components/ExchangeRateForm';
import { postRateRequested } from '../actions'
import { connect } from 'react-redux';


const mapStateToProps = (state) => ({
  message: state.exchangeRates.message,
  error: state.exchangeRates.error
});
const mapDispatchToProps = (dispatch) => ({
  onSubmit: (rate) => dispatch(postRateRequested(rate))
});
export default connect(mapStateToProps, mapDispatchToProps)(ExchangeRateForm);
