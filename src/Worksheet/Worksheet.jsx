import React, { useState, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { saveAs } from 'file-saver';
import { Packer } from 'docx';
// Access deep properties using a path
import objectPath from 'object-path';
import Icon from '@mdi/react';
import { mdiPencilOutline } from '@mdi/js';
import useFetch from '../customHooks/useFetch';
import config from '../config';
import WorksheetContext from '../WorksheetContext';
import CreateDocument from '../helpers/generateDocHelper';
import AppContext from '../AppContext';
import Section from '../Section';
import './Worksheet.css';

export const ACTIONS = {
  LOAD_WORKSHEET_DATA: 'load-worksheet-data',
  CHANGE_DATA: 'change-data',
  DEL_ITEM: 'del-item',
  ADD_ITEM: 'add-item',
  SET_ITEM_TOTAL: 'set-item-total',
  UNSET_ITEM_TOTAL: 'unset-item-total',
};

function reducer(state, action) {
  // Create a new mutable object to hold changes.
  let modifiedState = { ...state };
  // Destructure key-path related values
  const {
    sectionKey, itemKey, componentKey, fieldKey,
  } = action;
  // Set key-path string for item
  const itemPath = `${sectionKey}.items.${itemKey}`;
  // Set key-path string for component
  const componentPath = `${itemPath}.components.${componentKey}`;
  console.log(action);
  console.log(sectionKey, itemKey, componentKey, fieldKey);
  console.log(componentPath);
  switch (action.type) {
    case ACTIONS.LOAD_WORKSHEET_DATA: {
      modifiedState = action.fetchResponse;
      return modifiedState;
    }
    case ACTIONS.CHANGE_DATA:
      // Take into account the extra nesting for fieldset components, check if payload has fieldKey
      if (fieldKey) {
        // Pass obj, path and value to objectPath to set the new value
        objectPath.set(modifiedState, `${componentPath}.fields.${fieldKey}.value`, action.value);
      } else {
        // Set new value inside component to the value passed by the payload
        objectPath.set(modifiedState, `${componentPath}.value`, action.value);
      }
      console.log(objectPath.get(modifiedState, `${itemPath}.itemTotal`));
      // Update values for components set as item total, check if state has total key for item
      if (objectPath.has(modifiedState, `${itemPath}.itemTotal`)) {
        // For tables, change value inside cell
        if (objectPath.get(modifiedState, `${componentPath}.type`) === 'table') {
          const { row, col } = objectPath.get(modifiedState, `${itemPath}.itemTotal.cell`);
          objectPath.set(modifiedState, `${itemPath}.itemTotal.value`, action.value[row][col].value);
        } else {
          // For fields, change flat value
          objectPath.set(modifiedState, `${itemPath}.itemTotal.value`, action.value);
        }
      }
      // return mutated state
      return modifiedState;
    case ACTIONS.DEL_ITEM:
      // Remove key-path from client's statement data
      objectPath.del(modifiedState, `${sectionKey}.items.${itemKey}`);
      return modifiedState;
    case ACTIONS.ADD_ITEM:
      // Add removed item using original template as reference
      objectPath.set(
        modifiedState,
        `${sectionKey}.items.${itemKey}`,
        action.template[action.sectionKey].items[action.itemKey],
      );
      return modifiedState;
    case ACTIONS.SET_ITEM_TOTAL:
      objectPath.set(modifiedState, `${sectionKey}.items.${itemKey}.itemTotal`, action.itemTotal);
      return modifiedState;
    case ACTIONS.UNSET_ITEM_TOTAL:
      objectPath.del(modifiedState, `${sectionKey}.items${itemKey}.itemTotal`);
      return modifiedState;
    case ACTIONS.SET_AS_NOTE:
      return modifiedState;
    case ACTIONS.UNSET_AS_NOTE:
      return modifiedState;
    default:
      return state;
  }
}

function generateDoc(data, filename) {
  const newDoc = CreateDocument(data);

  Packer.toBlob(newDoc).then((blob) => {
    saveAs(blob, `${filename}.docx`);
    console.log('Document created successfully');
  });
}

export default function Worksheet() {
  const [errorMsg, setErrorMsg] = useState('');

  const fetchUrl = (endpoint) => `${config.API_BASE_URL}/${endpoint}`;
  const fetchOptions = (method, body) => (
    body
      ? {
        method,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${config.API_KEY}`,
        },
        body: JSON.stringify(body),
      }
      : {
        method,
        headers: {
          Authorization: `Bearer ${config.API_KEY}`,
        },
      });

  const fetchData = async (url, options) => {
    let resData;
    try {
      const res = await fetch(url, options);
      resData = await res.json();
    } catch (error) {
      setErrorMsg(error.message);
    }
    return resData;
  };

  async function getThisWorksheet(worksheetId) {
    const selectedWorksheet = await fetchData(
      fetchUrl(`worksheets/${worksheetId}`),
      fetchOptions('GET'),
    );
    const client = await fetchData(
      fetchUrl(`clients/${selectedWorksheet.clientId}`),
      fetchOptions('GET'),
    );
    const template = await fetchData(
      fetchUrl(`templates/${selectedWorksheet.templateId}`),
      fetchOptions('GET'),
    );
    const statement = await fetchData(
      fetchUrl(`statements/${selectedWorksheet.statementDataId}`),
      fetchOptions('GET'),
    );
    return { client, template, statement };
  }

  const [worksheetData, dispatch] = useReducer(reducer, {});
  const [thisWorksheet, setThisWorksheet] = useState({});
  const [statementDate, setStatementDate] = useState('');

  const [reload, setReload] = useState(false);
  const { worksheetId } = useParams();
  useEffect(async () => {
    const fetchedWorksheet = await getThisWorksheet(worksheetId);
    setThisWorksheet({ ...fetchedWorksheet });
    dispatch({
      type: ACTIONS.LOAD_WORKSHEET_DATA,
      fetchResponse: fetchedWorksheet.statement.values,
    });
    if (fetchedWorksheet.statement) {
      console.log(fetchedWorksheet.statement.statementDate);
      const formatedDate = new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(fetchedWorksheet.statement.statementDate));
      setStatementDate(formatedDate);
    }
  }, [reload]);

  async function handleStatementUpdate(updatedStatement, statementId, callback) {
    const res = await fetchData(
      fetchUrl(`statements/${statementId}`),
      fetchOptions('PATCH', updatedStatement),
    );
    callback(!reload);
    return res;
  }

  const sectionKeys = Object.keys(worksheetData);
  console.log(thisWorksheet.template);
  return (
    <AppContext.Consumer>
      {({
        isModalOpen,
        onModalClose,
        onModalOpen,
        setModalContent,
        onDialogClose,
      }) => (
        <WorksheetContext.Provider
          value={{
            worksheetData,
            // worksheetTemplate: thisWorksheet.template,
            dispatch,
          }}
        >
          <div id="worksheet" className="rounded-top s400-v-pad light-bg">
            <header className="worksheet-header s400-v-pad s400-h-pad">
              {thisWorksheet.template && (
                <h2 className="template-name">
                  {thisWorksheet.template.name}
                </h2>
              )}
              {thisWorksheet.client && (
                <div className="client-header">
                  <h3 className="client-header-label">Client:</h3>
                  <h3 className="client-header-name">
                    {thisWorksheet.client.name}
                  </h3>
                </div>
              )}
              {thisWorksheet.statement && (
                <div className="statement-date">
                  <h3 className="statement-date-label">
                    Statement Date:
                  </h3>
                  <input
                    type="date"
                    value={statementDate}
                    onChange={({ target: { value } }) => setStatementDate(value)}
                  />
                </div>
              )}
            </header>
            <form
              id="worksheet"
              className="grid-wrapper"
              onSubmit={(e) => {
                e.preventDefault();
                const update = {
                  values: worksheetData,
                  statementDate: new Date(statementDate),
                };
                handleStatementUpdate(update, thisWorksheet.statement.id, setReload);
                setModalContent(<h2>Data stored.</h2>);
                onModalOpen();
              }}
            >
              {sectionKeys
                .map((key) => (
                  <Section
                    key={key}
                    sectionKey={key}
                    sectionInstance={worksheetData[key]}
                    // worksheetData={worksheetData}
                    onDialogClose={onDialogClose}
                    worksheetTemplate={thisWorksheet.template.template}
                    dispatch={dispatch}
                    setModalContent={setModalContent}
                    onModalOpen={onModalOpen}
                    onModalClose={onModalClose}
                  />
                ))}
              <section id="save-prompt" className="col span4 span8 span12">
                <h2>Save and export</h2>
                <p>
                  Click &apos;Save&apos; to store data or
                  &apos;Generate Docx&apos;
                  to download a statement in &apos;.docx&apos; format.
                </p>
                <button type="submit">Save</button>
                <button
                  type="button"
                  onClick={() => generateDoc(worksheetData, 'statement')}
                >
                  Generate Docx
                </button>
              </section>
            </form>
          </div>
        </WorksheetContext.Provider>
      )}
    </AppContext.Consumer>
  );
}
