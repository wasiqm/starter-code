import React from 'react';
import PropTypes from 'prop-types';

import './BasicTable.scss';

/**
 * "Get" specifies a generic return
 * @param {*} object data element; see typing in the PropTypes
 */
const getTableHeaders = (object = {}) => {
  return Object.keys(object);
}

const getLeader = (scoreData) => {
  const teachers = Object.keys(scoreData);
  let currentLeader = {
    teacher: '',
    score: 0,
  };
  teachers.forEach((teacher) => {
    if (scoreData[teacher] > currentLeader.score) {
      currentLeader = {
        teacher,
        score: scoreData[teacher],
      };
    }
  });

  return currentLeader.teacher;
}

/**
 * "render" specifies JSX in the return 
 * @param {*} row data element
 */
const renderRows = (scoreData) => (row = {}) => {
  return (
    <tr key={row.id}>
      {Object.values(row).map(
        (value, i) => <td key={i}>{value}</td>
      )}
      <td>{scoreData[row.teacher]}</td>
    </tr>
  )
}

const BasicTable = ({ data, scoreData }) => {
  return (
    <div>
      <h1>{`Current Leader: ${getLeader(scoreData)}`}</h1>
      <table className="basic-table">
        <tbody>
          <tr>
            {getTableHeaders(data[0]).map(
              headerName => <th key={headerName}>{headerName}</th>
              )}
              <th>scores</th>
          </tr>
          {data.map(renderRows(scoreData))}
        </tbody>
      </table>
    </div>
  )
}

export default BasicTable;

/**
 * Much more substantial example of typing properties. If the data does not align to the type, an error will occur.
 */
BasicTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      aluminum: PropTypes.number,
      batteries: PropTypes.number,
      bottles: PropTypes.number,
      cans: PropTypes.number,
      cardboard: PropTypes.number,
      computer_parts: PropTypes.number,
      glass: PropTypes.number,
      id: PropTypes.number,
      paper: PropTypes.number,
      teacher: PropTypes.string,
      wood: PropTypes.number
    })
  )
};

BasicTable.defaultProps = {
  data: []
};
