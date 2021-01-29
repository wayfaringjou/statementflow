/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import ReactDataSheet from 'react-datasheet';
import objectPath from 'object-path';
import WorksheetContext from '../WorksheetContext';
import './Note.css';
import { ACTIONS } from '../Worksheet';

const constructRefTable = (wsData, totalObj) => {
  const { sectionKey, itemKey, componentKey } = totalObj;
  const tableData = objectPath.get(wsData,
    `${sectionKey}.items.${itemKey}.components.${componentKey}.value`);
  console.log(wsData);
  console.log(tableData);
  const refTable = tableData.map((row) => {
    const refRow = [];
    console.log([...row]);
    row.forEach((cell) => cell.disableEvents = true);
    refRow.push(row[0]);
    refRow.push(row[row.length - 1]);
    return row;
  });
  refTable.unshift([{ disabledEvents: true, value: 'Description' }, { disabledEvents: true, value: 'Amount' }]);
  console.log(refTable);
  return refTable;
};

export default function Note({
  noteContents,
  itemTotal,
  sectionKey,
  itemKey,
}) {
  const [description, setDescription] = useState(noteContents.description);
  const [tableReference, setTableReference] = useState([]);
  return (
    <WorksheetContext.Consumer>
      {({ worksheetData, dispatch }) => (
        <section className="item-note s400-h-pad">
          <label htmlFor="note-description">
            <span className="note-field-label">{noteContents.name}</span>
            <textarea
              id="note-description"
              onChange={({ target: { value } }) => {
                setDescription(value);
                dispatch({
                  type: ACTIONS.ADD_NOTE,
                  sectionKey,
                  itemKey,
                  itemNote: {
                    ...noteContents,
                    description: value,
                  },
                });
              }}
              value={noteContents.description}
            />
          </label>
          {worksheetData[sectionKey]
            .items[itemKey]
            .itemTotal.cell && (
              <section
                className="table-reference"
              >
                {(!noteContents.tableReference) && (
                  <button
                    type="button"
                    onClick={() => {
                      const tableRef = constructRefTable(worksheetData, itemTotal);
                      setTableReference(tableRef);
                      dispatch({
                        type: ACTIONS.ADD_NOTE,
                        sectionKey,
                        itemKey,
                        itemNote: {
                          ...noteContents,
                          tableReference: tableRef,
                        },
                      });
                    }}
                  >
                    Add table reference
                  </button>
                )}
                {(noteContents.tableReference) && (
                <button
                  type="button"
                  onClick={() => {
                    setTableReference([]);
                    dispatch({
                      type: ACTIONS.ADD_NOTE,
                      sectionKey,
                      itemKey,
                      itemNote: {
                        name: noteContents.name,
                        description: noteContents.description,
                      },
                    });
                  }}
                >
                  Remove table reference
                </button>
                )}
                {(noteContents.tableReference) && (
                <ReactDataSheet
                  data={noteContents.tableReference}
                  valueRenderer={(cell) => cell.value}
                />
                )}
              </section>
          )}

          <button
            type="button"
            onClick={() => {
              dispatch({
                type: ACTIONS.DEL_NOTE,
                sectionKey,
                itemKey,
              });
            }}
          >
            Remove Note
          </button>

        </section>
      )}
    </WorksheetContext.Consumer>
  );
}
