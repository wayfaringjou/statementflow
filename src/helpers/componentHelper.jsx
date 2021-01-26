import React from 'react';
import Fieldset from '../Fieldset';
import InstructionItem from '../InstructionItem';
import Table from '../Table';

const Components = {
  fieldset: Fieldset,
  table: Table,
  instructionitem: InstructionItem,
};

export default function componentHelper(instance, sectionKey, itemKey, componentKey) {
  // Check for component type in 'Components'
  if (typeof Components[instance.componentType] !== 'undefined') {
    // Pass instance data and info about the component's location as props
    return React.createElement(Components[instance.componentType], {
      key: componentKey,
      componentKey,
      itemKey,
      sectionKey,
      instance,
    });
  }
  // Return this prompt if component type isn't found
  return React.createElement(
    () => (
      <div>
        {`The component ${instance.componentType} has not been created yet.`}
      </div>
    ),
    { key: instance.componentPosition },
  );
}
