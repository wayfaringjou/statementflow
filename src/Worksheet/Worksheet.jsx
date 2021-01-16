import React, { useState, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import WorksheetContext from '../WorksheetContext';
import componentHelper from '../helpers/componentHelper';
import AppContext from '../AppContext';
import Section from '../Section';

export const ACTIONS = {
  CHANGE_DATA: 'change-data',
  DEL_ITEM: 'del-item',
  ADD_ITEM: 'add-item',
};

function reducer(state, action) {
  const modifiedState = { ...state };
  switch (action.type) {
    case ACTIONS.CHANGE_DATA:
      if (action.fieldKey) {
        modifiedState[action.sectionKey]
          .components[action.componentKey]
          .fields[action.fieldKey]
          .value = action.value;
      } else {
        modifiedState[action.sectionKey]
          .components[action.componentKey]
          .value = action.value;
      }
      return modifiedState;
    case ACTIONS.DEL_ITEM:
      delete modifiedState[action.sectionKey]
        .components[action.componentKey];
      return modifiedState;
    case ACTIONS.ADD_ITEM:
      modifiedState[action.sectionKey]
        .components[action.componentKey] = action.template[action.sectionKey]
          .components[action.componentKey];
      return modifiedState;
    default:
      return state;
  }
}

export default function Worksheet({
  worksheetTemplates,
  worksheetHistory,
  clientsStatementData,
}) {
  let { worksheetId } = useParams();

  worksheetId = parseInt(worksheetId, 10);
  // Identify current worksheet details
  const currentWorksheet = worksheetHistory
    .find((worksheet) => worksheet.id === worksheetId);
  // Identify current client
  const currentClient = clientsStatementData
    .find((statement) => statement.clientId === currentWorksheet.clientId);
  // Identify current worksheet template
  const currentTemplate = worksheetTemplates
    .find((template) => template.id === currentWorksheet.templateId);

  const initialState = { ...currentClient.values };

  const [worksheetData, dispatch] = useReducer(reducer, initialState);
  const sectionKeys = Object.keys(worksheetData);

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <AppContext.Consumer>
      {({
        isModalOpen, onModalClose, onModalOpen, setModalContent,
      }) => (
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
                    worksheetData={worksheetData}
                    worksheetTemplate={currentTemplate.template}
                    dispatch={dispatch}
                    setModalContent={setModalContent}
                    onModalOpen={onModalOpen}
                    onModalClose={onModalClose}
                  />
                ))}
              <section>
                <button type="submit">Save</button>
                <button type="button">Generate Docx</button>
              </section>
            </form>
          </div>
        </WorksheetContext.Provider>
      )}
    </AppContext.Consumer>
  );
}
