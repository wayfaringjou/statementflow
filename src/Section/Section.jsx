/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import AppContext from '../AppContext';
import componentHelper from '../helpers/componentHelper';
import Modal from '../Modal';
import { ACTIONS } from '../Worksheet';

export default function Section({
  instance,
  sectionKey,
  worksheetData,
  worksheetTemplate,
  dispatch,
  setModalContent,
  onModalOpen,
  onModalClose,
}) {
  const componentKeys = Object.keys(instance.components);
  const templateKeys = Object.keys(worksheetTemplate[sectionKey].components);
  const activeKeys = () => {
    return templateKeys
      .filter((key) => componentKeys.includes(key));
  };
  const inactiveKeys = () => {
    return templateKeys
      .filter((key) => !componentKeys.includes(key));
  };
  // const [activeKeys, setActiveKeys] = useState(getActiveKeys(componentKeys, templateKeys));
  // const [inactiveKeys, setInactiveKeys] = useState(getInactiveKeys(componentKeys, templateKeys));
  // const difference = arr1.filter((x) => !arr2.includes(x));

  const addItemModal = (
    <>
      <h3>Choose item to add to this section.</h3>
      <ul>
        {(inactiveKeys().length > 0) && inactiveKeys().map((componentKey) => (
          <li key={componentKey}>
            <button
              type="button"
              onClick={() => {
                dispatch({
                  sectionKey, componentKey, type: ACTIONS.ADD_ITEM, template: worksheetTemplate,
                });
                // setInactiveKeys(getInactiveKeys());
                // setActiveKeys(getActiveKeys());
                // setModalContent(removeItemModal);
                onModalClose();
              }}
            >
              {worksheetTemplate[sectionKey].components[componentKey].name}
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
        {(activeKeys().length > 0) && activeKeys().map((componentKey) => (
          <li key={componentKey}>
            <button
              type="button"
              onClick={() => {
                dispatch({ sectionKey, componentKey, type: ACTIONS.DEL_ITEM });
                // setInactiveKeys(getInactiveKeys());
                // setActiveKeys(getActiveKeys());
                // setModalContent(removeItemModal);
                onModalClose();
              }}
            >
              {instance.components[componentKey].name}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
  return (

    <section className="worksheet-section stack">
      <h2>{instance.sectionTitle}</h2>
      {(instance.description) && <p>{instance.description}</p>}
      {(inactiveKeys().length > 0) && (
      <button
        type="button"
        onClick={() => {
          setModalContent(addItemModal);
          onModalOpen();
        }}
      >
        Add item inside this section
      </button>
      )}
      {(activeKeys().length > 0) && (
      <button
        type="button"
        onClick={() => {
          setModalContent(removeItemModal);
          onModalOpen();
        }}
      >
        Remove item from this section
      </button>
      )}
      {componentKeys
        .map((key) => componentHelper(instance.components[key], sectionKey, key))}
    </section>

  );
}
