import React, { useState, useEffect } from 'react';
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
  // Set key arrays for iteration
  const itemKeys = Object.keys(sectionInstance.items);
  const templateKeys = Object.keys(worksheetTemplate[sectionKey].items);
  // Store difference between template and worksheet as inactive, inclusion as active
  const activeKeys = () => templateKeys
    .filter((key) => itemKeys.includes(key));
  const inactiveKeys = () => templateKeys
    .filter((key) => !itemKeys.includes(key));

  // Sum totals for section
  const getSectionTotal = (instanceData) => {
    const iKeys = Object.keys(instanceData.items);
    return iKeys.reduce((sum, current) => {
      const currentItem = instanceData.items[current];
      const iTotal = currentItem.itemTotal
        ? parseFloat(currentItem.itemTotal.value)
        : 0;
      return sum + iTotal;
    }, 0);
  };

  // Modal dialogs to add or remove items from sections
  const addItemModal = (
    <>
      <h3>Choose item to add to this section.</h3>
      <ul className="flow">
        {(inactiveKeys().length > 0) && inactiveKeys().map((itemKey) => (
          <li key={itemKey}>
            <button
              type="button"
              className="outlined"
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
      <ul className="flow">
        {(activeKeys().length > 0) && activeKeys().map((itemKey) => (
          <li key={itemKey}>
            <button
              type="button"
              className="outlined"
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

  // Custom hook to store coordinates of parents for dialogs
  const [rect, ref] = useClientRect();

  const [thisSectionTotal, setThisSectionTotal] = useState(getSectionTotal(sectionInstance));

  const [reload, setReload] = useState(false);

  useEffect(() => {
    setThisSectionTotal(getSectionTotal(sectionInstance));
  }, [reload]);
  // Render component
  return (
    <AppContext.Consumer>
      {() => (
        <section className="worksheet-section col span4 span8 span12 grid-ele-wrapper">

          <header className="section-header grid-ele-header col span4 span8 span12 primary-bg">
            <h2>{sectionInstance.sectionName}</h2>
          </header>

          {(sectionInstance.sectionDescription) && (
          <section className="section-desc grid-ele-desc col span4 span8 span12">
            <p>{sectionInstance.sectionDescription}</p>
          </section>
          )}

          <section className="grid-ele-menu section-actions col span4 span8 span12">
            <p>
              Press below to remove or add items as needed.
            </p>
            <ul
              className="section-add-remove"
            >
              <li>
                <button
                  type="button"
                  className="rm-btn text"
                  disabled={!(activeKeys().length > 0)}
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
                  <span className="btn-label">
                    Remove item
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="add-btn"
                  disabled={!(inactiveKeys().length > 0)}
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
                  <span className="btn-label">
                    Add item
                  </span>
                </button>
              </li>

            </ul>
          </section>

          {/* Iterate through items and add component for each */}
          <section className="grid-ele-content col span4 span8 span12 grid-ele-wrapper">
            {itemKeys
              .map((key) => (
                <Item
                  key={key}
                  itemKey={key}
                  sectionKey={sectionKey}
                  itemInstance={sectionInstance.items[key]}
                  dispatch={dispatch}
                  reloadSectionTotal={() => setReload(!reload)}
                />
              ))}
          </section>
          {(thisSectionTotal > 0) && (
            <section className="section-total secondary-bg col span4 span8 span12 flow">
              <h3>
                {sectionInstance.sectionName}
                {' '}
                total:
              </h3>
              <h3>{`$${parseFloat(thisSectionTotal)}`}</h3>
            </section>
          )}
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
    sectionDescription: PropTypes.string,
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
