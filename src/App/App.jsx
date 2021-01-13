import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import AppContext from '../AppContext';
import WorksheetsList from '../WorksheetList';
import Worksheets from '../Worksheets';
import Header from '../Header';
import Banner from '../Banner';
import Modal from '../Modal/Modal';
// TODO implement API
import TESTDATA from '../TESTDATA';

export default function App() {
  // Hooks to hold state
  // Tests
  const [testForm, setTestForm] = useState(TESTDATA.testForm);
  const [statementHistory, setStatementHistory] = useState(TESTDATA.worksheetHistory);
  // Actual
  const [worksheetTemplate, setWorkSheetTemplate] = useState(TESTDATA.testForm);
  const [worksheetHistory, setWorksheetHistory] = useState([]);
  const [worksheetData, setWorksheetData] = useState([]);
  const [modifiedWorksheet, setModifiedWorksheet] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const routes = () => (
    <>
      <Route exact path="/" component={Banner} />
      <Route exact path="/worksheets" component={WorksheetsList} />
      <Route path="/worksheets/:worksheetId" component={Worksheets} />
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
