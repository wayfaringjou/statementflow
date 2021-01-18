import React from 'react';
import { Link } from 'react-router-dom';

export default function WorksheetList({ worksheetHistory, clients }) {
  return (
    <div id="worksheet-list">
      <h2>Worksheet History</h2>
      <p>Click on &apos;Modify&apos; below to open a worksheet:</p>
      <article>
        {worksheetHistory.map((worksheet) => (
          <ul key={worksheet.id}>
            <li key={`${worksheet.id}-modified`}>
              Modified:
              <span className="history-modified">
                {new Date(worksheet.modified).toDateString()}
              </span>
            </li>
            <li key={`${worksheet.id}-client`}>
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
