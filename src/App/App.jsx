import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import AppContext from '../AppContext';
import WorksheetsList from '../WorksheetList';
import Worksheet from '../Worksheet';
import Header from '../Header';
import Banner from '../Banner';

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
  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        onModalOpen: handleModalOpen,
        onModalClose: handleModalClose,
      }}
    >
      <div className="App">
        <Header />
        <main>
          {routes()}
        </main>
      </div>
    </AppContext.Provider>
  );
}
