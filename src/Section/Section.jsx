import React from 'react';
import AppContext from '../AppContext';
import componentHelper from '../helpers/componentHelper';
import Modal from '../Modal';

export default function Section({
  instance, sectionKey, worksheetData, worksheetTemplate,
}) {
  const componentKeys = Object.keys(instance.components);
  const activeComponentKeys = [...componentKeys];
  const inactiveComponentKeys = [];
  const addItemModal = (
    <>
      <h3>Choose item to add to this section.</h3>
      <ul>
        {inactiveComponentKeys.map((key) => (
          <li>
            {worksheetTemplate[sectionKey].components[key].name}
          </li>
        ))}
      </ul>
    </>
  );
  const removeItemModal = (
    <>
      <h3>Choose item to remove from this section.</h3>
      <ul>
        {activeComponentKeys.map((key) => (
          <li key={key}>
            {console.log(worksheetTemplate)}
            {instance.components[key].name}
          </li>
        ))}
      </ul>
    </>
  );
  return (
    <AppContext.Consumer>
      {({
        isModalOpen, onModalClose, onModalOpen, setModalContent,
      }) => (
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
          <Modal>
            <h3>Test</h3>
          </Modal>
        </section>
      )}
    </AppContext.Consumer>
  );
}
