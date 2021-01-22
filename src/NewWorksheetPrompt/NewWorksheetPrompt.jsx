import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function NewWorksheetPrompt({
  onModalClose,
  clients,
  addNewClient,
  addNewWorksheet,
  worksheetTemplates,
  addNewStatement,
}) {
  const [newClientObj, setNewClientObj] = useState({ name: '' });
  const [templateInstance, setTemplateInstance] = useState({});

  const [renderNameForm, setRenderNameForm] = useState(false);
  const [renderClientList, setRenderClientList] = useState(false);
  const [promptState, setPromptState] = useState(undefined);

  const clientListPrompt = (
    <>
      <h3>Select client for new worksheet</h3>
    </>
  );

  const newClientPrompt = (
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
              setPromptState(clientListPrompt);
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
              setPromptState(newClientPrompt);
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

  return (
    <div id="new-worksheet-prompt">
      <h2>New worksheet</h2>
      {(promptState === undefined) && (
        <article id="select-template-prompt">
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
        </article>
      )}
      {promptState}
      {(renderNameForm) && (
        <>
          <form
            id="nameForm"
            onSubmit={async (e) => {
              e.preventDefault();

              const newClient = await addNewClient(newClientObj);
              const newStatement = await addNewStatement({
                clientId: newClient.id,
                values: templateInstance.template,
              });
              const newWorksheet = await addNewWorksheet({
                clientId: newClient.id,
                templateId: templateInstance.id,
                statementDataId: newStatement.id,
              });
              onModalClose();
              history.push(`/worksheets/${newWorksheet.id}`);
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
              // Posting new worksheet for existing client
              onClick={async () => {
                // Post new statement and get id
                const newStatement = await addNewStatement({
                  clientId: client.id,
                  values: templateInstance.template,
                });
                const newWorksheet = await addNewWorksheet({
                  clientId: client.id,
                  templateId: templateInstance.id,
                  statementDataId: newStatement.id,
                });
                onModalClose();
                history.push(`/worksheets/${newWorksheet.id}`);
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

NewWorksheetPrompt.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  clients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
  worksheetTemplates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      template: PropTypes.objectOf(PropTypes.object),
    }),
  ),
  addNewClient: PropTypes.func.isRequired,
  addNewWorksheet: PropTypes.func.isRequired,
  addNewStatement: PropTypes.func.isRequired,
};

NewWorksheetPrompt.defaultProps = {
  clients: [],
  worksheetTemplates: [],
};
