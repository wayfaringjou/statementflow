/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

// eslint-disable-next-line react/prop-types
export default function Form({ instance }) {
  // const { value } = instance;

  const [gridData, setGridData] = useState(instance.value);

  function onCellsChanged(changes) {
    const grid = gridData;
    changes.forEach(({
      cell, row, col, value,
    }) => {
      grid[row][col] = { ...grid[row][col], value };
    });
    setGridData(grid);
  }

  return (
    <div className="worksheet-table">
      {console.log('loaded table')}
      {console.log(instance)}
      <ReactDataSheet
        data={gridData}
        valueRenderer={(cell) => cell.value}
        // dataRenderer={(cell) => cell.expr}
        onCellsChanged={(changes) => onCellsChanged(changes)}
      />
    </div>
  );
}
