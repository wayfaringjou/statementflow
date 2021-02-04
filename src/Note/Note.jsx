/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import objectPath from 'object-path';
import Icon from '@mdi/react';
import { mdiClose, mdiTablePlus, mdiTableRemove } from '@mdi/js';
import WorksheetContext from '../WorksheetContext';
import './Note.css';
import { ACTIONS } from '../Worksheet';

const constructRefTable = (wsData, totalObj) => {
  const {
    sectionKey, itemKey, componentKey, cell,
  } = totalObj;
  const tableData = [...objectPath.get(wsData,
    `${sectionKey}.items.${itemKey}.components.${componentKey}.value`)];
  const refTable = tableData.map((row) => {
    const refRow = [];
    refRow.push(row[0]);
    refRow.push(row[cell.col]);
    return refRow;
  });
  return refTable;
};

export default function Note({
  noteContents,
  itemTotal,
  sectionKey,
  itemKey,
}) {
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

                {(noteContents.tableReference) && (
                  <table>
                    <thead>
                      <tr>
                        <td>Description</td>
                        <td>Amount</td>
                      </tr>
                    </thead>
                    <tbody>
                      {noteContents.tableReference.map((row, rowI) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <tr key={`row-${rowI}`}>
                          {row.map((cell, cellI) => (
                            <td
                              // eslint-disable-next-line react/no-array-index-key
                              key={`${rowI}-${cellI}`}
                            >
                              {cell.value}
                            </td>
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

Note.propTypes = {
  noteContents: PropTypes.oneOfType(
    [
      PropTypes.shape({
        description: PropTypes.string,
        name: PropTypes.string,
      }),
      PropTypes.shape({
        description: PropTypes.string,
        name: PropTypes.string,
        tableReference: PropTypes.arrayOf(PropTypes.array),
      }),
    ],
  ).isRequired,
  itemTotal: PropTypes.shape({
    componentKey: PropTypes.string,
    fieldKey: PropTypes.string,
    itemKey: PropTypes.string,
    sectionKey: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }).isRequired,
  sectionKey: PropTypes.string.isRequired,
  itemKey: PropTypes.string.isRequired,
};
