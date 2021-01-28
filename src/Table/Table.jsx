/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import './Table.css';
import WorksheetContext from '../WorksheetContext';
import { ACTIONS } from '../Worksheet';

// eslint-disable-next-line react/prop-types
export default function Table({
  itemInstance, componentInstance, sectionKey, itemKey, componentKey,
}) {
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
    if (itemInstance.itemTotal) {
      if ((grid.length - 1) > itemInstance.itemTotal.cell.row) {
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
    if (itemInstance.itemTotal) {
      if ((grid[0].length - 1) > itemInstance.itemTotal.cell.col) {
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
          <header className="table-header">
            {componentInstance.componentName && <h3>{componentInstance.componentName}</h3>}
            {(componentInstance.componentDescription) && (
              <p>{componentInstance.componentDescription}</p>)}
          </header>
          <section className="table-menu">
            <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>table menu</button>
            {isMenuOpen && (
              <ul>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      const value = addRow(componentInstance.value);
                      return dispatch({
                        value, sectionKey, itemKey, componentKey, type: ACTIONS.CHANGE_DATA,
                      });
                    }}
                  >
                    Add row
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const value = delRow(componentInstance.value);
                      return dispatch({
                        value, sectionKey, itemKey, componentKey, type: ACTIONS.CHANGE_DATA,
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
                      const value = addCol(componentInstance.value);
                      return dispatch({
                        value, sectionKey, itemKey, componentKey, type: ACTIONS.CHANGE_DATA,
                      });
                    }}
                  >
                    Add column
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const value = delCol(componentInstance.value);
                      return dispatch({
                        value, sectionKey, itemKey, componentKey, type: ACTIONS.CHANGE_DATA,
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
              data={componentInstance.value}
              valueRenderer={(cell) => cell.value}
              onSelect={(selection) => setSelected(selection)}
              onCellsChanged={(changes) => {
                const value = onCellsChanged(componentInstance.value, changes);
                return dispatch({
                  value, sectionKey, itemKey, componentKey, type: ACTIONS.CHANGE_DATA,
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
                  itemKey,
                  componentKey,
                  itemTotal: {
                    sectionKey,
                    itemKey,
                    componentKey,
                    cell: {
                      row: selected.end.i,
                      col: selected.end.j,
                    },
                    value: componentInstance.value[selected.end.i][selected.end.j].value,
                  },
                });
              }
            }}
          >
            Set selected cell as item total
          </button>
          {/* componentInstance.componentTotal && (
            <>
              <h4>
                Item total:
                {' '}
                {worksheetData[componentInstance.componentTotal.sectionKey]
                  .items[componentInstance.componentTotal.itemKey]
                  .components[componentInstance.componentTotal.componentKey]
                  .value[componentInstance.componentTotal.cell.row]
                  [componentInstance.componentTotal.cell.col]
                  .value}
              </h4>
              <button
                type="button"
                onClick={() => dispatch({
                  type: ACTIONS.UNSET_ITEM_TOTAL,
                  sectionKey,
                  itemKey,
                  componentKey,
                })}
              >
                Unset item total
              </button>
            </>
          ) */}
        </article>
      )}
    </WorksheetContext.Consumer>
  );
}
