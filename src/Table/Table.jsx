/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import './Table.css';
import Icon from '@mdi/react';
import {
  mdiDotsHorizontal, mdiKeyboardReturn, mdiTableRowPlusAfter, mdiTableRowRemove,
} from '@mdi/js';
import AppContext from '../AppContext';
import useClientRect from '../customHooks/useClientRect';
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
      if (itemInstance.itemTotal.cell) {
        if ((grid.length - 1) > itemInstance.itemTotal.cell.row) {
          grid.pop();
        }
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
  const [rect, ref] = useClientRect();
  const handleRenderDialog = (closeDialogFunc, dispatchFunc) => (
    <ul
      id="table-menu-dialog"
      onMouseOut={() => {
        closeDialogFunc();
      }}
      onBlur={closeDialogFunc()}
    >
      <li>
        <button
          type="button"
          onClick={() => {
            const value = addRow(componentInstance.value);
            closeDialogFunc();
            return dispatchFunc({
              value, sectionKey, itemKey, componentKey, type: ACTIONS.CHANGE_DATA,
            });
          }}
        >
          <Icon
            path={mdiTableRowPlusAfter}
            title="Add row to table"
            color="currentColor"
          />
          <span className="menu-option">
            Add row to table
          </span>
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => {
            const value = delRow(componentInstance.value);
            closeDialogFunc();
            return dispatchFunc({
              value, sectionKey, itemKey, componentKey, type: ACTIONS.CHANGE_DATA,
            });
          }}
        >
          <Icon
            path={mdiTableRowRemove}
            title="Remove row from table"
            color="currentColor"
          />
          <span className="menu-option">
            Delete row from table
          </span>
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => {
            if (selected.end) {
              dispatchFunc({
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
            closeDialogFunc();
          }}
        >
          <Icon
            path={mdiKeyboardReturn}
            title="Set last selected cell as item total"
            color="currentColor"
          />
          Set last selected cell as item total
        </button>
      </li>
    </ul>
  );

  return (
    <AppContext.Consumer>
      {({
        isDialogOpen,
        onDialogToggle,
        onDialogClose,
        setDialogContent,
        setDialogOriginPosition,
      }) => (
        <WorksheetContext.Consumer>
          {({ worksheetData, dispatch }) => (
            <article className="worksheet-table col span4 span8">
              <header className="table-header flex-row-parent">
                {componentInstance.componentName && <h4>{componentInstance.componentName}</h4>}
                <button
                  type="button"
                  ref={ref}
                  onClick={() => {
                    setDialogOriginPosition(rect);
                    setDialogContent(
                      handleRenderDialog(onDialogClose, dispatch),
                    );
                    onDialogToggle();
                  }}
                >
                  <Icon
                    path={mdiDotsHorizontal}
                    title="Item menu"
                    size={1}
                  />
                </button>

              </header>
              <section className="component-description">
                {(componentInstance.componentDescription) && (
                <p>{componentInstance.componentDescription}</p>)}
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
      )}
    </AppContext.Consumer>
  );
}
