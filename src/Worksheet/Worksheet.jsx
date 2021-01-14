import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import componentHelper from '../helpers/componentHelper';
import {
  dummyStatementData,
} from '../TESTDATA';

export default function Worksheet({
  worksheetTemplates,
  worksheetHistory,
}) {
  let { worksheetId } = useParams();
  worksheetId = parseInt(worksheetId, 10);

  const currentWorksheet = worksheetHistory
    .find((worksheet) => worksheet.id === worksheetId);
  const currentClient = dummyStatementData
    .find((statement) => statement.clientId === currentWorksheet.clientId);

  const [worksheetData, setWorksheetData] = useState(currentClient.values);
  const [modifiedWorksheetData, setModifiedWorksheetData] = useState([]);

  return (
    <div id="worksheet">
      <h2>Worksheet</h2>
      {/* <i className="material-icons">face</i> */}
      {worksheetData
        .map((componentInstance) => componentHelper(componentInstance))}
    </div>
  );
}
