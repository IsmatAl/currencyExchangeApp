import FlowChart from '../components/FlowChart';
import { connect } from 'react-redux';
import { getDiagramAsJson, postDiagramAsJson } from '../middlewares';
import { State } from '../customtypes';

const mapStateToProps = (state: State) => ({
    nodeDataArray: state.diagram.nodeDataArray,
    linkDataArray: state.diagram.linkDataArray,
    message: state.diagram.message,
});
const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
    // React.Dispatch<Action>
    save: (json: string) => dispatch(postDiagramAsJson(json)),
    get: () => dispatch(getDiagramAsJson()),
});
export default connect(mapStateToProps, mapDispatchToProps)(FlowChart);
