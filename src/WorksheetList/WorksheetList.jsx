import React from 'react';
import { Link } from 'react-router-dom';

export default function WorksheetList({ worksheetHistory, clients }) {
  return (
    <div id="worksheet-list">
      <h2>Worksheet History</h2>
      <article>
        {worksheetHistory.map((worksheet) => (
          <ul>
            <li key={worksheet.id}>
              Modified:
              <span className="history-modified">
                {worksheet.modified}
              </span>
            </li>
            <li key={worksheet.clientId}>
              Client:
              <span className="history-client">
                {clients
                  .find((client) => client.id === worksheet.clientId)
                  .name}
              </span>
            </li>
            <li>
              <Link to={`/worksheets/${worksheet.id}`}>
                Modify
              </Link>
            </li>
          </ul>
        ))}
      </article>
    </div>
  );
}
