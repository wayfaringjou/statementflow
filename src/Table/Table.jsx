/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import WorksheetContext from '../WorksheetContext';

// eslint-disable-next-line react/prop-types
export default function Table({ instance, sectionKey, componentKey }) {
  // const { value } = instance;

  const [gridData, setGridData] = useState(instance.value);

  function onCellsChanged(grid, changes) {
    const updateGrid = grid;
    changes.forEach(({
      cell, row, col, value,
    }) => {
      updateGrid[row][col] = { ...updateGrid[row][col], value };
    });
    console.log(updateGrid);
    return updateGrid;
  }

  return (
    <WorksheetContext.Consumer>
      {({ worksheetData, dispatch }) => (

        <div className="worksheet-table">
          <h2>Table</h2>
          {console.log('loaded table')}
          {console.log(instance)}
          <ReactDataSheet
            data={instance.value}
            valueRenderer={(cell) => cell.value}
        // dataRenderer={(cell) => cell.expr}
            onCellsChanged={(changes) => {
              const value = onCellsChanged(instance.value, changes);
              return dispatch({ value, sectionKey, componentKey });
            }}
          />
        </div>
      )}
    </WorksheetContext.Consumer>
  );
}
