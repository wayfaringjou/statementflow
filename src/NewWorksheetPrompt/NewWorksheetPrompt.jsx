import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function NewWorksheetPrompt({
  setModalContent,
  onModalClose,
  clients,
  addNewClient,
  worksheetHistory,
  addNewWorksheet,
  worksheetTemplates,
  addNewStatement,
}) {
  const [newClientObj, setNewClientObj] = useState({ name: '', id: uuidv4() });
  const [templateInstance, setTemplateInstance] = useState({});
  const [newWorksheetObj, setNewWorksheetObj] = useState({
    id: uuidv4(),
    statementDataId: uuidv4(),
  });

  const [renderNameForm, setRenderNameForm] = useState(false);
  const [renderClientList, setRenderClientList] = useState(false);
  const [promptState, setPromptState] = useState(undefined);

  const clientList = (
    <>
      <h3>Select client for new worksheet</h3>
    </>
  );

  const newClient = (
    <>
      <h3>Enter client&apos;s name</h3>
    </>
  );

  const clientPrompt = (
    <>
      <h3>Create new client or select a past client?</h3>
      <ul>
        <li>
          <button
            type="button"
            onClick={() => {
              setPromptState(clientList);
              setRenderClientList(true);
            }}
          >
            Select Client
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              setPromptState(newClient);
              setRenderNameForm(true);
            }}
          >
            Add new client
          </button>
        </li>
      </ul>
    </>
  );

  const history = useHistory();
  /*
  function handleChangeRoute(id) {
    useHistory()
  }
  */

  return (
    <div className="new-worksheet-prompt">
      <h2>New worksheet</h2>
      {(promptState === undefined) && (
        <>
          <h3>Select a template for the new Worksheet:</h3>
          <ul>
            {worksheetTemplates.map((template) => (
              <li key={template.id}>
                <button
                  type="button"
                  onClick={() => {
                    setTemplateInstance({ id: template.id, template: template.template });
                    setPromptState(clientPrompt);
                  }}
                >
                  {template.name}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      {promptState}
      {(renderNameForm) && (
        <>
          <form
            id="nameForm"
            onSubmit={(e) => {
              e.preventDefault();
              // setNewClientObj({ ...newClientObj });
              addNewClient(newClientObj);
              const updatedWorksheetObj = ({
                ...newWorksheetObj,
                modified: new Date().toISOString(),
                clientId: newClientObj.id,
                templateId: templateInstance.id,
              });
              setNewWorksheetObj(updatedWorksheetObj);

              addNewWorksheet(updatedWorksheetObj);
              addNewStatement({
                clientId: newClientObj.id,
                values: templateInstance.template,
                id: newWorksheetObj.statementDataId,
              });
              onModalClose();
              history.push(`/worksheets/${newWorksheetObj.id}`);
            }}
          >
            <input
              type="text"
              onChange={({ target: { value } }) => setNewClientObj({
                ...newClientObj,
                name: value,
              })}
              value={newClientObj.name}
            />
            <button
              type="submit"
            >
              Add Client
            </button>
          </form>
        </>
      )}
      {(renderClientList) && (
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <button
              type="button"
              onClick={() => {
                const updatedWorksheetObj = ({
                  ...newWorksheetObj,
                  modified: new Date().toISOString(),
                  clientId: client.id,
                  templateId: templateInstance.id,
                });
                setNewWorksheetObj(updatedWorksheetObj);

                addNewWorksheet(updatedWorksheetObj);
                addNewStatement({
                  clientId: client.id,
                  values: templateInstance.template,
                  id: newWorksheetObj.statementDataId,
                });
                onModalClose();
                history.push(`/worksheets/${newWorksheetObj.id}`);
              }}
            >
              {client.name}
            </button>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}
