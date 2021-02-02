/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import ReactDataSheet from 'react-datasheet';
import objectPath from 'object-path';
import Icon from '@mdi/react';
import { mdiClose, mdiTablePlus, mdiTableRemove } from '@mdi/js';
import WorksheetContext from '../WorksheetContext';
import './Note.css';
import { ACTIONS } from '../Worksheet';

const constructRefTable = (wsData, totalObj) => {
  const { sectionKey, itemKey, componentKey } = totalObj;
  const tableData = [...objectPath.get(wsData,
    `${sectionKey}.items.${itemKey}.components.${componentKey}.value`)];
  const refTable = tableData.map((row) => {
    const refRow = [];
    refRow.push(row[0]);
    refRow.push(row[row.length - 1]);
    return refRow;
  });
  refTable.unshift([{ disabledEvents: true, value: 'Description' }, { disabledEvents: true, value: 'Amount' }]);
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
        <section className="item-note col span4 span8 span12 flow">
          <section className="note-action">
            <p className="note-caption">
              Detail note for:
            </p>
            <button
              type="button"
              className="toggle"
              onClick={() => {
                dispatch({
                  type: ACTIONS.DEL_NOTE,
                  sectionKey,
                  itemKey,
                });
              }}
            >
              <Icon
                path={mdiClose}
                title="Remove Note"
                color="currentColor"
              />
            </button>

          </section>
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

                {/* (noteContents.tableReference) && (
                <ReactDataSheet
                  data={noteContents.tableReference}
                  valueRenderer={(cell) => cell.value}
                />
                )
                */}

                {(noteContents.tableReference) && (
                  <table>
                    <tbody>
                      {noteContents.tableReference.map((row) => (
                        <tr>
                          {row.map((cell) => (
                            <td>{cell.value}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                <section className="note-action reference-action">

                  {(!noteContents.tableReference) && (
                  <button
                    type="button"
                    onClick={() => {
                      const tableRef = constructRefTable({ ...worksheetData }, itemTotal);
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
                    <Icon
                      path={mdiTablePlus}
                      title="Add table reference for this note"
                      color="currentColor"
                    />
                    <span className="btn-label">
                      Add table reference
                    </span>
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
                    <Icon
                      path={mdiTableRemove}
                      title="Add table reference for this note"
                      color="currentColor"
                    />
                    Remove table reference
                  </button>
                  )}

                </section>

              </section>
          )}

        </section>
      )}
    </WorksheetContext.Consumer>
  );
}
