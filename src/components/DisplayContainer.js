/**
 * This is a Container Component.
 * It is a Higher Order Component that "connects" a React Component with the global Redux Store
 */
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import { loadData, clearData, loadScores, loadLeaderboards} from '../actions';
import Display from './Display';

/**
 * This maps the data stored in the store as props passed into the component
 * @param {*} store the redux store
 */
const mapStateToProps = store => {
  return {
    storeData: store.dataReducer.data,
    scoreData: store.dataReducer.scoreData,
    leaderboardsData: store.dataReducer.scoreLeaderboards
  }
};

/**
 * This wraps all specified actions with dispatch (a special function which dispatches the actions to the store)
 * as props passed into the component
 * @param {*} dispatch func
 */
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { 
      // add other actions here
      loadData,
      clearData,
      loadScores,
      loadLeaderboards
    },
    dispatch
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(Display);
