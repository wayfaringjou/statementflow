/* eslint-disable react/prop-types */
import React from 'react';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

// eslint-disable-next-line react/prop-types
export default function Form({ instance }) {
  const { grid } = instance;

  const cells = grid;

  const getCols = (cellsObj) => [
    ...new Set(Object.keys(cellsObj).map((cell) => cell.charAt(0))),
  ];

  const getRows = (cellsObj) => Object.entries(cellsObj)
    .filter(([key], idx) => +key.match(/.(\d+)/)[1] === idx)
    .map(([_, filtredCell]) => filtredCell);

  const generateGrid = () => getRows(cells).map((row, i) => getCols(cells).map((col, j) => {
    if (i === 0 && j === 0) {
      return { readOnly: true, value: row.value };
    }
    if (j === 0) {
      return { readOnly: true, value: row.value };
    }

    return cells[col + row.key];
  }));

  return (
    <div className="form">
      {console.log('loaded table')}
      {console.log(instance)}
      <ReactDataSheet
        data={generateGrid()}
        valueRenderer={(cell) => cell.value}
        dataRenderer={(cell) => cell.expr}
      />
    </div>
  );
}
