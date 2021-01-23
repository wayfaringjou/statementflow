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
      console.log('data changed');
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
    console.log(selectedWorksheet);
    return { client, template, statement };
  }

  const [worksheetData, dispatch] = useReducer(reducer, {});
  const [thisWorksheet, setThisWorksheet] = useState({});

  const [reload, setReload] = useState(false);
  const { worksheetId } = useParams();
  useEffect(async () => {
    const fetchedWorksheet = await getThisWorksheet(worksheetId);
    console.log(fetchedWorksheet);
    setThisWorksheet({ ...fetchedWorksheet });
    dispatch({
      type: ACTIONS.LOAD_WORKSHEET_DATA,
      fetchResponse: fetchedWorksheet.statement.values,
    });
  }, [reload]);

  async function handleStatementUpdate(updatedStatement, statementId, callback) {
    console.log('updating to');
    console.log(statementId);
    const res = await fetchData(
      fetchUrl(`statements/${statementId}`),
      fetchOptions('PATCH', updatedStatement),
    );
    console.log(res);
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
          <div id="worksheet">
            <h2>Worksheet</h2>
            {console.log(thisWorksheet)}
            {thisWorksheet.client && (<h3>{`Client: ${thisWorksheet.client.name}`}</h3>)}
            <form
              id="worksheet"
              onSubmit={(e) => {
                e.preventDefault();
                const update = {
                  values: worksheetData,
                  // TODO: index: currentClientIndex,
                };
                // onSaveStatement(update);

                handleStatementUpdate(update, thisWorksheet.statement.id, setReload);
                setModalContent(<h2>Data stored.</h2>);
                onModalOpen();
              }}
            >
              {/* <i className="material-icons">face</i> */}
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
              <section className="save-prompt">
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
