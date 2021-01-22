import React from 'react';
import PropTypes from 'prop-types';
import componentHelper from '../helpers/componentHelper';
import { ACTIONS } from '../Worksheet';

export default function Section({
  instance,
  sectionKey,
  worksheetTemplate,
  dispatch,
  setModalContent,
  onModalOpen,
  onModalClose,
}) {
  const componentKeys = Object.keys(instance.components);
  const templateKeys = Object.keys(worksheetTemplate[sectionKey].components);
  const activeKeys = () => templateKeys
    .filter((key) => componentKeys.includes(key));
  const inactiveKeys = () => templateKeys
    .filter((key) => !componentKeys.includes(key));

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

Section.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  instance: PropTypes.shape({
    sectionTitle: PropTypes.string,
    description: PropTypes.string,
    components: PropTypes.objectOf(PropTypes.object),
  }),
  sectionKey: PropTypes.string,
  worksheetTemplate: PropTypes.objectOf(PropTypes.object),
  dispatch: PropTypes.func.isRequired,
  setModalContent: PropTypes.func.isRequired,
  onModalOpen: PropTypes.func.isRequired,
};

Section.defaultProps = {
  instance: {},
  sectionKey: '',
  worksheetTemplate: {},
};
