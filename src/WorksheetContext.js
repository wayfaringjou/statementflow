import React from 'react';

const WorksheetContext = React.createContext({
  worksheetData: [],
  dispatch: () => {},
});

export default WorksheetContext;
