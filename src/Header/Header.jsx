import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext';
import Modal from '../Modal';
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
        isModalOpen, onModalClose, onModalOpen, setModalContent,
      }) => (
        <header id="main-header" className="flex-row-parent">
          <h2>
            <Link to="/">
              StatementFlow
            </Link>
          </h2>
          <nav id="main-nav">
            <ul>
              <li>
                <Link to="/worksheets">
                  Worksheet History
                </Link>
              </li>
              <li>
                <button
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
                  New Worksheet
                </button>
              </li>
            </ul>
          </nav>
        </header>
      )}
    </AppContext.Consumer>
  );
}
