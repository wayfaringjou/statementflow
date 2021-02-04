import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './WorksheetList.css';

export default function WorksheetList({ worksheetHistory, clients }) {
  const history = useHistory();
  return (
    <section id="worksheet-history">
      <h2>Worksheet History</h2>
      <p>Click on &apos;Modify&apos; below to open a worksheet:</p>
      <article className="worksheet-list grid-ele-wrapper">
        {worksheetHistory.map((worksheet) => (
          <ul
            key={worksheet.id}
            className="flow col span4"
          >
            <li key={`${worksheet.id}-modified`}>
              <span className="modified-label">
                Modified:
              </span>
              <span className="history-modified">
                {new Date(worksheet.modified).toDateString()}
              </span>
            </li>
            <li key={`${worksheet.id}-client`}>
              <span className="client-label">
                Client:
              </span>
              <span className="history-client">
                {clients
                  .find((client) => client.id === worksheet.clientId)
                  .name}
              </span>
            </li>
            <li className="history-action">
              <button
                type="button"
                onClick={() => history.push(`/worksheets/${worksheet.id}`)}
              >
                <span className="btn-label">
                  Modify
                </span>
              </button>
            </li>
          </ul>
        ))}
      </article>
    </section>
  );
}

WorksheetList.propTypes = {
  worksheetHistory: PropTypes.arrayOf(PropTypes.object),
  clients: PropTypes.arrayOf(PropTypes.object),
};

WorksheetList.defaultProps = {
  worksheetHistory: [],
  clients: [],
};
