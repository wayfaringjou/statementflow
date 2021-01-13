import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import Statement from '../Statements/Statements';
import Worksheets from '../Worksheets/Worksheets';
import Header from '../Header/Header';
import Modal from '../Modal/Modal';
import TESTDATA from '../TESTDATA';

export default function App() {
  const [testForm, setTestForm] = useState(TESTDATA.testForm);
  const [statementHistory, setStatementHistory] = useState(TESTDATA.worksheetHistory);

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="App">
      <Header />
      <main>
        <Route
          path="/statements"
          render={() => (
            <Statement
              customForm={testForm}
            />
          )}
        />
        <Route
          path="/worksheets"
          render={() => (
            <Worksheets
              statementHistory={statementHistory}
            />
          )}
        />
        <div>
          <button type="button" onClick={() => setIsModalOpen(true)}>
            Open Modal
          </button>
          <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            A modal
          </Modal>
        </div>
      </main>
    </div>
  );
}
