import React, { useState, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { saveAs } from 'file-saver';
import { Packer } from 'docx';
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
  let modifiedState = { ...state };
  switch (action.type) {
    case ACTIONS.LOAD_WORKSHEET_DATA: {
      modifiedState = action.fetchResponse;
      return modifiedState;
    }
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

      if (modifiedState[action.sectionKey]
        .components[action.componentKey]
        .componentTotal) {
        if (modifiedState[action.sectionKey]
          .components[action.componentKey]
          .type === 'table') {
          modifiedState[action.sectionKey]
            .components[action.componentKey]
            .componentTotal.value = action
              .value[modifiedState[action.sectionKey]
                .components[action.componentKey]
                .componentTotal.cell.row][modifiedState[action.sectionKey]
                .components[action.componentKey]
                .componentTotal.cell.col].value;
        } else {
          modifiedState[action.sectionKey]
            .components[action.componentKey]
            .componentTotal.value = action.value;
        }
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
    case ACTIONS.SET_ITEM_TOTAL:
      modifiedState[action.sectionKey]
        .components[action.componentKey]
        .componentTotal = action.componentTotal;
      return modifiedState;
    case ACTIONS.UNSET_ITEM_TOTAL:
      delete modifiedState[action.sectionKey]
        .components[action.componentKey].componentTotal;
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

  const [reload, setReload] = useState(false);
  const { worksheetId } = useParams();
  useEffect(async () => {
    const fetchedWorksheet = await getThisWorksheet(worksheetId);
    setThisWorksheet({ ...fetchedWorksheet });
    dispatch({
      type: ACTIONS.LOAD_WORKSHEET_DATA,
      fetchResponse: fetchedWorksheet.statement.values,
    });
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
          <div id="worksheet" className="rounded-top s400-h-pad light-bg">
            <header className="worksheet-header s400-v-pad s400-h-pad">
              <h2>Worksheet</h2>
              {thisWorksheet.client && (
              <h3>
                Client:
                <span className="client-header s400-v-pad s400-h-pad dark-bg rounded">
                  {thisWorksheet.client.name}
                </span>
              </h3>
              )}
            </header>
            <form
              id="worksheet"
              className="grid-wrapper"
              onSubmit={(e) => {
                e.preventDefault();
                const update = {
                  values: worksheetData,
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
                    instance={worksheetData[key]}
                    worksheetData={worksheetData}
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
