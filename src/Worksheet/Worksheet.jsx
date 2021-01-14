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
  const [worksheetData, setWorksheetData] = useState(dummyStatementData);
  const [modifiedWorksheetData, setModifiedWorksheetData] = useState([]);

  let { worksheetId } = useParams();
  worksheetId = parseInt(worksheetId, 10);
  const currentWorksheet = worksheetHistory
    .find((worksheet) => worksheet.id === worksheetId);
  const currentTemplate = worksheetTemplates
    .find((template) => template.id === currentWorksheet.templateId);
  return (
    <div id="worksheet">
      <h2>Worksheet</h2>
      {/* <i className="material-icons">face</i> */}
      {currentTemplate.template
        .map((componentInstance) => componentHelper(componentInstance))}
    </div>
  );
}
