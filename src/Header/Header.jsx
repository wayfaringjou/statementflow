import React from 'react';
import { Link } from 'react-router-dom';
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
  return (
    <AppContext.Consumer>
      {({
        onModalClose, onModalOpen, setModalContent,
      }) => (
        <header id="main-header" className="primary-bg">
          <section className="flex-row-parent backdrop">
            <Link to="/">
              <h2 className="logo-text sm-visually-hidden">
                StatementFlow
              </h2>
              <Icon
                path={mdiHomeOutline}
                title="Home"
                color="currentColor"
              />
            </Link>
            <nav id="main-nav">
              <ul>
                <li>
                  <Link to="/worksheets">
                    <span className="sm-visually-hidden">
                      Worksheet History
                    </span>

                    <Icon
                      path={mdiFolderClockOutline}
                      title="Worksheet History"
                      color="currentColor"
                    />
                  </Link>
                </li>
                <li>
                  <button
                    className="shade-bg"
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
                    <span className="sm-visually-hidden">
                      New Worksheet
                    </span>
                  </button>
                </li>
              </ul>
            </nav>
          </section>
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
