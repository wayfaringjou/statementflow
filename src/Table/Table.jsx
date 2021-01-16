/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import './Table.css';
import WorksheetContext from '../WorksheetContext';
import { ACTIONS } from '../Worksheet';

// eslint-disable-next-line react/prop-types
export default function Table({ instance, sectionKey, componentKey }) {
  // const { value } = instance;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function onCellsChanged(grid, changes) {
    const updateGrid = grid;
    changes.forEach(({
      cell, row, col, value,
    }) => {
      updateGrid[row][col] = { ...updateGrid[row][col], value };
    });
    return updateGrid;
  }

  function addRow(grid) {
    const newRow = grid[0].map(() => ({ value: '' }));
    grid.push(newRow);
    return grid;
  }

  function delRow(grid) {
    if (grid.length > 1) {
      grid.pop();
    }
    return grid;
  }

  function addCol(grid) {
    grid.forEach((row) => row.push({ value: '' }));
    return grid;
  }

  function delCol(grid) {
    if (grid[0].length > 1) {
      grid.forEach((row) => row.pop());
    }
    return grid;
  }

  return (
    <WorksheetContext.Consumer>
      {({ worksheetData, dispatch }) => (
        <div className="worksheet-table">
          {instance.name && <h3>{instance.name}</h3>}
          <div className="table-menu">
            <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>table menu</button>
            {isMenuOpen && (
              <ul>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      const value = addRow(instance.value);
                      return dispatch({
                        value, sectionKey, componentKey, type: ACTIONS.CHANGE_DATA,
                      });
                    }}
                  >
                    Add row
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const value = delRow(instance.value);
                      return dispatch({
                        value, sectionKey, componentKey, type: ACTIONS.CHANGE_DATA,
                      });
                    }}
                  >
                    Delete row
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      const value = addCol(instance.value);
                      return dispatch({
                        value, sectionKey, componentKey, type: ACTIONS.CHANGE_DATA,
                      });
                    }}
                  >
                    Add column
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const value = delCol(instance.value);
                      return dispatch({
                        value, sectionKey, componentKey, type: ACTIONS.CHANGE_DATA,
                      });
                    }}
                  >
                    Delete column
                  </button>
                </li>
              </ul>

            )}
          </div>
          <ReactDataSheet
            data={instance.value}
            valueRenderer={(cell) => cell.value}
          // dataRenderer={(cell) => cell.expr}
            onCellsChanged={(changes) => {
              const value = onCellsChanged(instance.value, changes);
              return dispatch({
                value, sectionKey, componentKey, type: ACTIONS.CHANGE_DATA,
              });
            }}
          />
        </div>
      )}
    </WorksheetContext.Consumer>
  );
}
