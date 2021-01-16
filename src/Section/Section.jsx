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
  console.log(`Just assigned Component keys ${componentKeys}`);
  console.log(instance);
  console.log(`Just assigned Template keys ${templateKeys}`);
  const activeKeys = () => {
    // console.log(componentKeys, templateKeys);
    return templateKeys
      .filter((key) => componentKeys.includes(key));
  };
  const inactiveKeys = () => {
    // console.log(templateKeys);
    return templateKeys
      .filter((key) => !componentKeys.includes(key));
  };
  console.log(`Active keys returned: ${activeKeys()}`);
  console.log(`Inactive keys returned: ${inactiveKeys()}`);
  // const [activeKeys, setActiveKeys] = useState(getActiveKeys(componentKeys, templateKeys));
  // const [inactiveKeys, setInactiveKeys] = useState(getInactiveKeys(componentKeys, templateKeys));
  // const difference = arr1.filter((x) => !arr2.includes(x));

  const addItemModal = (
    <>
      <h3>Choose item to add to this section.</h3>
      <ul>
        {console.log(`Generating list with inactive: ${inactiveKeys()}`)}
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
                // console.log(inactiveKeys);
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
        {console.log(`Generating list with active ${activeKeys()}`)}
        {(activeKeys().length > 0) && activeKeys().map((componentKey) => (
          <li key={componentKey}>
            <button
              type="button"
              onClick={() => {
                dispatch({ sectionKey, componentKey, type: ACTIONS.DEL_ITEM });
                // setInactiveKeys(getInactiveKeys());
                // setActiveKeys(getActiveKeys());
                // console.log(activeKeys());
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
      <button
        type="button"
        onClick={() => {
          setModalContent(addItemModal);
          onModalOpen();
        }}
      >
        Add item inside this section
      </button>
      <button
        type="button"
        onClick={() => {
          setModalContent(removeItemModal);
          onModalOpen();
        }}
      >
        Remove item from this section
      </button>
      {componentKeys
        .map((key) => componentHelper(instance.components[key], sectionKey, key))}
    </section>

  );
}
