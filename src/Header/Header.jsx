import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiFilePlusOutline, mdiFolderClockOutline, mdiHomeOutline } from '@mdi/js';

import AppContext from '../AppContext';
import NewWorksheetPrompt from '../NewWorksheetPrompt';
import './Header.css';

export default function Header({
  clients,
  addNewClient,
  worksheetHistory,
  addNewWorksheet,
  worksheetTemplates,
  addNewStatement,
}) {
  const history = useHistory();

  return (
    <AppContext.Consumer>
      {({
        onModalClose, onModalOpen, setModalContent,
      }) => (
        <header id="main-header" className="primary-bg">
          <button
            type="button"
            id="logotype"
            className="text"
            onClick={() => history.push('/')}
          >
            <span
              className="btn-label"
            >
              StatementFlow
            </span>
          </button>
          <nav id="main-nav">
            <ul>
              <li>
                <button
                  type="button"
                  className="text"
                  onClick={() => history.push('/worksheets')}
                >
                  <Icon
                    path={mdiFolderClockOutline}
                    title="Worksheet History"
                    color="currentColor"
                  />
                  <span className="btn-label">
                    Worksheet History
                  </span>
                </button>
              </li>
              <li>
                <button
                  className="text"
                  type="button"
                  onClick={() => {
                    setModalContent(
                      <NewWorksheetPrompt
                        setModalContent={setModalContent}
                        onModalClose={onModalClose}
                        clients={clients}
                        addNewClient={addNewClient}
                        worksheetHistory={worksheetHistory}
                        addNewWorksheet={addNewWorksheet}
                        worksheetTemplates={worksheetTemplates}
                        addNewStatement={addNewStatement}
                      />,
                    );
                    onModalOpen();
                  }}
                >
                  <Icon
                    path={mdiFilePlusOutline}
                    title="New Worksheet"
                    color="currentColor"
                  />
                  <span className="btn-label">
                    New Worksheet
                  </span>
                </button>
              </li>
            </ul>
          </nav>
        </header>
      )}
    </AppContext.Consumer>
  );
}

Header.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })),
  addNewClient: PropTypes.func,
  worksheetHistory: PropTypes.arrayOf(PropTypes.shape({
    clientId: PropTypes.number,
    id: PropTypes.number,
    modified: PropTypes.string,
    statementDataId: PropTypes.number,
    templateId: PropTypes.number,
  })),
  addNewWorksheet: PropTypes.func,
  worksheetTemplates: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    template: PropTypes.objectOf(PropTypes.object),
  })),
  addNewStatement: PropTypes.func,
};

Header.defaultProps = {
  clients: [],
  addNewClient: () => {},
  worksheetHistory: [],
  addNewWorksheet: () => {},
  worksheetTemplates: [],
  addNewStatement: () => {},
};
