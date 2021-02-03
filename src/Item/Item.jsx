import React from 'react';
import PropTypes from 'prop-types';
import {
  mdiNotebookEditOutline,
} from '@mdi/js';
import Icon from '@mdi/react';
import AppContext from '../AppContext';
import componentHelper from '../helpers/componentHelper';
import Note from '../Note';
import './Item.css';
import { ACTIONS } from '../Worksheet';

export default function Item({
  itemInstance,
  sectionKey,
  itemKey,
  // worksheetTemplate,
  dispatch,
  // setModalContent,
  // onModalOpen,
  // onModalClose,
  reloadSectionTotal,
}) {
  const componentKeys = Object.keys(itemInstance.components);

  return (
    <AppContext.Consumer>
      {() => (
        <article className="worksheet-item col span4 span8 span12 grid-ele-wrapper">
          <header className="item-header grid-ele-header col span4 span8 span12">
            <h3>{itemInstance.itemName}</h3>
          </header>

          {(itemInstance.itemDescription) && (
          <section className="grid-ele-desc col span4 span8 span12">
            <p>{itemInstance.itemDescription}</p>
          </section>
          )}

          <section className="item-components grid-ele-content col span4 span8 span12 grid-ele-wrapper">
            {/* componentHelper takes item's
             instance and keys as argumnets */}
            {componentKeys
              .map((key) => componentHelper(itemInstance,
                sectionKey, itemKey, key, reloadSectionTotal))}
          </section>

          {itemInstance.itemTotal && (
          <section className="item-total col span4 span8 span12">
            <p className="total-caption">
              Total value for:
            </p>
            <h4>{`${itemInstance.itemName}: ${itemInstance.itemTotal.value}`}</h4>

            <button
              type="button"
              className="add-note"
              onClick={() => {
                dispatch({
                  type: ACTIONS.ADD_NOTE,
                  sectionKey,
                  itemKey,
                  itemNote: {
                    name: itemInstance.itemName,
                    description: itemInstance.itemDescription,
                  },
                });
              }}
            >
              <Icon
                path={mdiNotebookEditOutline}
                title="Add note reference for this total"
                color="currentColor"
              />
              <span className="btn-label">
                Add note for total
              </span>
            </button>

          </section>
          )}

          {itemInstance.itemNote && (
          <Note
            noteContents={itemInstance.itemNote}
            itemTotal={itemInstance.itemTotal}
            sectionKey={sectionKey}
            itemKey={itemKey}
          />
          )}
        </article>
      )}
    </AppContext.Consumer>
  );
}

Item.propTypes = {
  itemInstance: PropTypes.shape({
    components: PropTypes.objectOf(PropTypes.object),
    itemDescription: PropTypes.string,
    itemName: PropTypes.string,
    itemNote: PropTypes.shape({
      description: PropTypes.string,
      name: PropTypes.string,
      tableReference: PropTypes.arrayOf(PropTypes.array),
    }),
    itemPosition: PropTypes.number,
    itemTotal: PropTypes.shape({
      componentKey: PropTypes.string,
      fieldKey: PropTypes.string,
      itemKey: PropTypes.string,
      sectionKey: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    }),
  }),
  sectionKey: PropTypes.string,
  itemKey: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  reloadSectionTotal: PropTypes.func.isRequired,
};

Item.defaultProps = {
  itemInstance: {},
  sectionKey: '',
  itemKey: '',
};
