import React from 'react';
import PropTypes from 'prop-types';

import './BasicTable.scss';

const LeaderboardTable = ({ leaderboardsData }) => {
    return (
        <div>
          <h1>{}</h1>
          <table className="basic-table">
            <tbody>
              <tr>
                { .map(
                  headerName => <th key={headerName}>{headerName}</th>
                  )}
                  <th>scores</th>
              </tr>
              <tr>
                  <td></td>
                  <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    }

export default LeaderboardTable;

/**
 * Much more substantial example of typing properties. If the data does not align to the type, an error will occur.
 */
LeaderboardTable.propTypes = {
data: PropTypes.arrayOf(
    PropTypes.shape({
    teacher: PropTypes.string,
    score: PropTypes.number,
    })
)
};

LeaderboardTable.defaultProps = {
data: []
};