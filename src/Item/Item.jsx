import React from 'react';
import PropTypes from 'prop-types';
import { mdiDotsHorizontal, mdiNotePlusOutline, mdiNoteRemoveOutline } from '@mdi/js';
import Icon from '@mdi/react';
import AppContext from '../AppContext';
import componentHelper from '../helpers/componentHelper';
import useClientRect from '../customHooks/useClientRect';
import Note from '../Note';
import './Item.css';

export default function Item({
  itemInstance,
  sectionKey,
  itemKey,
  // worksheetTemplate,
  // dispatch,
  // setModalContent,
  // onModalOpen,
  // onModalClose,
}) {
  const componentKeys = Object.keys(itemInstance.components);
  const [rect, ref] = useClientRect();

  const handleRenderDialog = (closeDialogFunc) => (
    <ul
      id="item-menu-dialog"
      onMouseOut={() => {
        closeDialogFunc();
      }}
      onBlur={closeDialogFunc()}
    >
      {itemInstance.itemNote && (
        <li>
          <button
            type="button"
            onClick={() => {
              console.log('remove note');
              closeDialogFunc();
            }}
          >
            <Icon
              path={mdiNoteRemoveOutline}
              title="Remove note for this item"
              color="currentColor"
            />
            <span className="menu-option">
              Remove note from this item
            </span>
          </button>
        </li>
      )}
      {(itemInstance.itemNote === undefined) && (
        <li>
          <button
            type="button"
            onClick={() => {
              console.log('add note');
              closeDialogFunc();
            }}
          >
            <Icon
              path={mdiNotePlusOutline}
              title="Add note for this item"
              color="currentColor"
            />
            <span className="menu-option">
              Remove note from this item
            </span>
          </button>
        </li>
      )}
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
        <article className="worksheet-item col span4 span8 span12">
          <header className="item-header flex-row-parent">
            <h3>{itemInstance.itemName}</h3>
            <button
              type="button"
              ref={ref}
              className="dialog-parent"
              aria-expanded={isDialogOpen}
              aria-controls="item-menu-dialog"
              onClick={() => {
                setDialogOriginPosition(rect);
                setDialogContent(
                  handleRenderDialog(onDialogClose),
                );
                onDialogToggle();
              }}
            >
              <Icon
                path={mdiDotsHorizontal}
                title="New Worksheet"
                size={1}
                color="currentColor"
              />
            </button>
          </header>
          <section className="item-components">
            {/* This function takes item's instance and keys */}
            {componentKeys
              .map((key) => componentHelper(itemInstance, sectionKey, itemKey, key))}
          </section>
          {itemInstance.itemTotal && (
          <section className="item-total shade-bg s400-v-pad s400-h-pad rounded">
            <h4>{`${itemInstance.itemName}: ${itemInstance.itemTotal.value}`}</h4>
          </section>
          )}
          {itemInstance.itemNote && (
          <Note
            noteContents={itemInstance.itemNote}
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
      tableReference: PropTypes.shape({
        cols: PropTypes.arrayOf(PropTypes.number),
      }),
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
};

Item.defaultProps = {
  itemInstance: {},
  sectionKey: '',
  itemKey: '',
};
