import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import AppContext from '../AppContext';
import WorksheetsList from '../WorksheetList';
import Worksheet from '../Worksheet';
import Header from '../Header';
import Banner from '../Banner';
import Modal from '../Modal';
import NewWorksheetPrompt from '../NewWorksheetPrompt';

// TODO implement API
import {
  dummyWorksheetTemplates,
  dummyClients,
  dummyWorksheetHistory,
  dummyStatementData,
} from '../TESTDATA';

export default function App() {
  // Hooks to hold state
  const [worksheetTemplates, setWorkSheetTemplates] = useState(dummyWorksheetTemplates);
  const [worksheetHistory, setWorksheetHistory] = useState(dummyWorksheetHistory);
  const [clients, setClients] = useState(dummyClients);
  const [clientsStatementData, setClientsStatementData] = useState(dummyStatementData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const routes = () => (
    <>
      <Route exact path="/" component={Banner} />
      <Route
        exact
        path="/worksheets"
        render={() => (
          <WorksheetsList
            worksheetHistory={worksheetHistory}
            clients={clients}
          />
        )}
      />
      <Route
        path="/worksheets/:worksheetId"
        render={() => (
          <Worksheet
            worksheetTemplates={worksheetTemplates}
            worksheetHistory={worksheetHistory}
            clients={clients}
            clientsStatementData={clientsStatementData}
          />
        )}
      />
    </>
  );

  function handleNewWorksheet(historyData, newWorksheetData, callback) {
    const updatedHistory = historyData;
    updatedHistory.unshift(newWorksheetData);
    callback(updatedHistory);
  }

  function handleNewClient(clientsData, newClientData, callback) {
    const updatedClients = clientsData;
    updatedClients.push(newClientData);
    callback(updatedClients);
  }

  function handleNewStatement(statementsData, newStatementData, callback) {
    const updatedStatements = statementsData;
    updatedStatements.unshift(newStatementData);
    callback(updatedStatements);
  }

  function handleStatementUpdate(statementsData, updatedStatement, statementIndex, callback) {
    const updatedStatements = statementsData;
    updatedStatements[statementIndex] = updatedStatement;
    callback(updatedStatements);
  }

  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        onModalOpen: handleModalOpen,
        onModalClose: handleModalClose,
        setModalContent,
      }}
    >
      <div className="App">
        <Modal
          modalOpen={isModalOpen}
          onModalClose={handleModalClose}
          modalContent={modalContent}
        />
        <Header />
        <main>
          <button
            type="button"
            onClick={() => {
              setModalContent(
                <NewWorksheetPrompt
                  setModalContent={setModalContent}
                  onModalClose={handleModalClose}
                  clients={clients}
                  addNewClient={(c) => handleNewClient(clients, c, setClients)}
                  worksheetHistory={worksheetHistory}
                  addNewWorksheet={(w) => handleNewWorksheet(
                    worksheetHistory, w, setWorksheetHistory,
                  )}
                  worksheetTemplates={worksheetTemplates}
                  addNewStatement={(s) => handleNewStatement(
                    clientsStatementData, s, setClientsStatementData,
                  )}
                />,
              );
              handleModalOpen();
            }}
          >
            New Worksheet
          </button>
          {routes()}
        </main>

      </div>
    </AppContext.Provider>
  );
}
