import ExchangeRateList from '../components/ExchaneRateList';
import { connect } from 'react-redux';
import { deleteRateRequested, getRatesRequested } from '../actions';
import { push } from 'connected-react-router';
import { State } from '../customtypes';

const mapStateToProps = (state: State) => ({
    exchangeRates: state.exchangeRates,
    message: state.exchangeRates.message,
});
const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
    // React.Dispatch<Action>
    update: (id: number) => dispatch(push(`/update/${id}`)),
    delete: (id: number) => dispatch(deleteRateRequested(id)),
    onRatesUpdate: () => dispatch(getRatesRequested()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ExchangeRateList);
