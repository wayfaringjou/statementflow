import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';
import Item from '../Item';
import { ACTIONS } from '../Worksheet';
import './Section.css';

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
  const itemKeys = Object.keys(instance.items);
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
              {instance.items[itemKey].itemName}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
  return (

    <section className="worksheet-section flow col span4 span8 span12 grid-wrapper">
      <header className="section-header col span4 span8 span12 shade flex-row-parent s400-v-pad">
        <h2>{instance.sectionName}</h2>
        {(instance.description) && <p>{instance.description}</p>}
        <nav className="section-menu">
          <button type="button" className="primary">
            <FontAwesomeIcon icon={faEllipsisH} />
          </button>
        </nav>
      </header>

      <aside className="col span4 span8 span12">
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
      </aside>
      {itemKeys
        .map((key) => (
          <Item
            key={key}
            itemKey={key}
            sectionKey={sectionKey}
            instance={instance.items[key]}
            worksheetData={worksheetData}
            worksheetTemplate={worksheetTemplate}
            dispatch={dispatch}
            setModalContent={setModalContent}
            onModalOpen={onModalOpen}
            onModalClose={onModalClose}
          />
        ))}
    </section>

  );
}

Section.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  instance: PropTypes.shape({
    sectionName: PropTypes.string,
    description: PropTypes.string,
    items: PropTypes.objectOf(PropTypes.object),
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
