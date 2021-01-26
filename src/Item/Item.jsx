import React from 'react';
import componentHelper from '../helpers/componentHelper';

export default function Item({
  instance,
  sectionKey,
  itemKey,
  worksheetTemplate,
  dispatch,
  setModalContent,
  onModalOpen,
  onModalClose,
}) {
  const componentKeys = Object.keys(instance.components);
  return (
    <article className="worksheet-item">
      <h3>{instance.itemName}</h3>
      {componentKeys
        .map((key) => componentHelper(instance.components[key], sectionKey, itemKey, key))}
    </article>
  );
}
