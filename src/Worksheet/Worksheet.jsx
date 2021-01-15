import React, { useState, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import WorksheetContext from '../WorksheetContext';
import componentHelper from '../helpers/componentHelper';
import AppContext from '../AppContext';
import Section from '../Section';

function reducer(state, payload) {
  const modifiedState = { ...state };
  if (payload.fieldKey) {
    modifiedState[payload.sectionKey]
      .components[payload.componentKey]
      .fields[payload.fieldKey]
      .value = payload.value;
  } else {
    modifiedState[payload.sectionKey]
      .components[payload.componentKey]
      .value = payload.value;
  }
  return modifiedState;
}

export default function Worksheet({
  worksheetTemplates,
  worksheetHistory,
  clientsStatementData,
}) {
  let { worksheetId } = useParams();
  worksheetId = parseInt(worksheetId, 10);
  const currentWorksheet = worksheetHistory
    .find((worksheet) => worksheet.id === worksheetId);
  const currentClient = clientsStatementData
    .find((statement) => statement.clientId === currentWorksheet.clientId);

  const initialState = { ...currentClient.values };

  const [worksheetData, dispatch] = useReducer(reducer, initialState);
  console.log(worksheetData);
  const sectionKeys = Object.keys(worksheetData);

  sectionKeys.map((k, i) => console.log(worksheetData[k], i));

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event);
  }

  return (
    <WorksheetContext.Provider
      value={{
        worksheetData,
        dispatch,
      }}
    >

      <div id="worksheet">
        <h2>Worksheet</h2>
        <form id="worksheet" onSubmit={handleSubmit}>
          {/* <i className="material-icons">face</i> */}
          {sectionKeys
            .map((key) => (
              <Section
                key={key}
                sectionKey={key}
                instance={worksheetData[key]}
              />
            ))}
          <section>
            <button type="submit">Save</button>
          </section>
        </form>
      </div>
    </WorksheetContext.Provider>
  );
}
