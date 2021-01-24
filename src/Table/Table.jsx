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
  const [selected, setSelected] = useState({});

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
    if (instance.componentTotal) {
      if ((grid.length - 1) > instance.componentTotal.cell.row) {
        grid.pop();
      }
    } else if (grid.length > 1) {
      grid.pop();
    }
    return grid;
  }

  function addCol(grid) {
    grid.forEach((row) => row.push({ value: '' }));
    return grid;
  }

  function delCol(grid) {
    if (instance.componentTotal) {
      if ((grid[0].length - 1) > instance.componentTotal.cell.col) {
        grid.forEach((row) => row.pop());
      }
    } else if (grid[0].length > 1) {
      grid.forEach((row) => row.pop());
    }
    return grid;
  }

  return (
    <WorksheetContext.Consumer>
      {({ worksheetData, dispatch }) => (
        <article className="worksheet-table col span4 span8">
          <header>
            {instance.name && <h3>{instance.name}</h3>}
            {(instance.description) && <p>{instance.description}</p>}
          </header>
          <section className="table-menu">
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
          </section>
          <section className="table-content">

            <ReactDataSheet
              data={instance.value}
              valueRenderer={(cell) => cell.value}
              onSelect={(selection) => setSelected(selection)}
              onCellsChanged={(changes) => {
                const value = onCellsChanged(instance.value, changes);
                return dispatch({
                  value, sectionKey, componentKey, type: ACTIONS.CHANGE_DATA,
                });
              }}
            />
          </section>
          <button
            type="button"
            onClick={() => {
              if (selected.end) {
                dispatch({
                  type: ACTIONS.SET_ITEM_TOTAL,
                  sectionKey,
                  componentKey,
                  componentTotal: {
                    sectionKey,
                    componentKey,
                    cell: {
                      row: selected.end.i,
                      col: selected.end.j,
                    },
                    value: instance.value[selected.end.i][selected.end.j].value,
                  },
                });
              }
            }}
          >
            Set selected cell as item total
          </button>
          {instance.componentTotal && (
            <>
              <h4>
                Item total:
                {' '}
                {worksheetData[instance.componentTotal.sectionKey]
                  .components[instance.componentTotal.componentKey]
                  .value[instance.componentTotal.cell.row][instance.componentTotal.cell.col].value}
              </h4>
              <button
                type="button"
                onClick={() => dispatch({
                  type: ACTIONS.UNSET_ITEM_TOTAL,
                  sectionKey,
                  componentKey,
                })}
              >
                Unset item total
              </button>
            </>
          )}
        </article>
      )}
    </WorksheetContext.Consumer>
  );
}
