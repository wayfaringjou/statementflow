import React from 'react';
import Fieldset from '../Fieldset';
import InstructionItem from '../InstructionItem';
import Table from '../Table';

const Components = {
  fieldset: Fieldset,
  table: Table,
  instructionitem: InstructionItem,
};

export default function componentHelper(itemInstance,
  sectionKey, itemKey, componentKey, reloadSectionTotal) {
  // Set component instance from item instance and key
  const componentInstance = itemInstance.components[componentKey];
  // Check for component type in 'Components'
  if (typeof Components[componentInstance.componentType] !== 'undefined') {
    // Pass instance data and info about the component's location as props
    return React.createElement(Components[componentInstance.componentType], {
      key: componentKey,
      componentKey,
      itemKey,
      sectionKey,
      itemInstance,
      componentInstance,
      reloadSectionTotal,
    });
  }
  // Return this prompt if component type isn't found
  return React.createElement(
    () => (
      <div>
        {`The component ${componentInstance.componentType} has not been created yet.`}
      </div>
    ),
    { key: componentInstance.componentPosition },
  );
}
