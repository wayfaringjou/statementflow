import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiDotsHorizontal, mdiMinusBoxOutline, mdiPlusBoxOutline } from '@mdi/js';
import Item from '../Item';
import useClientRect from '../customHooks/useClientRect';
import { ACTIONS } from '../Worksheet';
import AppContext from '../AppContext';
import './Section.css';

export default function Section({
  sectionInstance,
  sectionKey,
  worksheetTemplate,
  dispatch,
  setModalContent,
  onModalOpen,
  onModalClose,
  onDialogClose,
}) {
  const itemKeys = Object.keys(sectionInstance.items);
  const templateKeys = Object.keys(worksheetTemplate[sectionKey].items);
  const activeKeys = () => templateKeys
    .filter((key) => itemKeys.includes(key));
  const inactiveKeys = () => templateKeys
    .filter((key) => !itemKeys.includes(key));

  const addItemModal = (
    <>
      <h3>Choose item to add to this section.</h3>
      <ul>
        {(inactiveKeys().length > 0) && inactiveKeys().map((itemKey) => (
          <li key={itemKey}>
            <button
              type="button"
              onClick={() => {
                dispatch({
                  sectionKey, itemKey, type: ACTIONS.ADD_ITEM, template: worksheetTemplate,
                });
                onModalClose();
              }}
            >
              {worksheetTemplate[sectionKey].items[itemKey].itemName}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
  const removeItemModal = (
    <>
      <h3>Choose item to remove from this section.</h3>
      <ul>
        {(activeKeys().length > 0) && activeKeys().map((itemKey) => (
          <li key={itemKey}>
            <button
              type="button"
              onClick={() => {
                dispatch({ sectionKey, itemKey, type: ACTIONS.DEL_ITEM });
                onModalClose();
              }}
            >
              {sectionInstance.items[itemKey].itemName}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
  const sectionMenu = (
    <ul
      id="section-menu-dialog"
    >
      {(inactiveKeys().length > 0) && (
        <li>
          <button
            type="button"
            onClick={() => {
              setModalContent(addItemModal);
              onModalOpen();
              onDialogClose();
            }}
          >
            <Icon
              path={mdiPlusBoxOutline}
              title="Add Item"
              color="currentColor"
            />
            Add item inside this section
          </button>
        </li>
      )}
      {(activeKeys().length > 0) && (
        <li>
          <button
            type="button"
            onClick={() => {
              setModalContent(removeItemModal);
              onModalOpen();
              onDialogClose();
            }}
          >
            <Icon
              path={mdiMinusBoxOutline}
              title="Remove Item"
              color="currentColor"
            />
            <span className="menu-option">Remove item from this section</span>
          </button>
        </li>
      )}
    </ul>
  );
  const [rect, ref] = useClientRect();
  return (
    <AppContext.Consumer>
      {({
        isDialogOpen,
        onDialogToggle,
        setDialogContent,
        setDialogOriginPosition,
      }) => (
        <section className="worksheet-section flow col span4 span8 span12 grid-wrapper">
          <header className="section-header col span4 span8 span12 flex-row-parent s400-left-pad dark-bg">
            <h2>{sectionInstance.sectionName}</h2>
            {(sectionInstance.description) && <p>{sectionInstance.description}</p>}
            <button
              type="button"
              ref={ref}
              className="dialog-parent"
              aria-expanded={isDialogOpen}
              aria-controls="section-menu-dialog"
              onClick={() => {
                setDialogOriginPosition(rect);
                setDialogContent(sectionMenu);
                onDialogToggle();
              }}
            >
              <Icon
                path={mdiDotsHorizontal}
                title="New Worksheet"
                size={1.2}
                color="currentColor"
              />
            </button>
          </header>

          {itemKeys
            .map((key) => (
              <Item
                key={key}
                itemKey={key}
                sectionKey={sectionKey}
                itemInstance={sectionInstance.items[key]}
              />
            ))}
        </section>
      )}
    </AppContext.Consumer>
  );
}

Section.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  sectionInstance: PropTypes.shape({
    sectionName: PropTypes.string,
    sectionPosition: PropTypes.number,
    description: PropTypes.string,
    items: PropTypes.objectOf(PropTypes.object),
  }),
  sectionKey: PropTypes.string,
  worksheetTemplate: PropTypes.objectOf(PropTypes.object),
  dispatch: PropTypes.func.isRequired,
  setModalContent: PropTypes.func.isRequired,
  onModalOpen: PropTypes.func.isRequired,
  onDialogClose: PropTypes.func.isRequired,
};

Section.defaultProps = {
  sectionInstance: {},
  sectionKey: '',
  worksheetTemplate: {},
};
