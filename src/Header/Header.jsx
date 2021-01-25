import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
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
              <span className="logo-icon">
                <FontAwesomeIcon icon={faBook} />
              </span>
              <span className="logo-text">StatementFlow</span>
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
                  <FontAwesomeIcon icon={faPlusSquare} />
                  <span className="sm-visually-hidden">
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
