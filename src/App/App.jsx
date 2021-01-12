import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import Statement from '../Statements/Statements';
import TESTDATA from '../TESTDATA';

export default function App() {
  const [testForm, setTestForm] = useState(TESTDATA.testForm);
  return (
    <div className="App">
      <Route
        path="/statements"
        render={() => (
          <Statement
            customForm={testForm}
          />
        )}
      />
    </div>
  );
}
