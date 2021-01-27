import React from 'react';

const WorksheetContext = React.createContext({
  worksheetData: [],
  // worksheetTemplate: {},
  dispatch: () => {},
});

export default WorksheetContext;
