import { connect } from 'react-redux';
import AppHeader from '../components/AppHeader';
import { getRatesRequested } from '../actions';

const mapStateToProps = undefined;
const mapDispatchToProps = (dispatch) => ({
  onRateListing: () => dispatch(getRatesRequested())
});

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
