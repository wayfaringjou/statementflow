import React from 'react';
import Fieldset from '../Fieldset';
import Table from '../Table';
import Section from '../Section';

const Components = {
  section: Section,
  fieldset: Fieldset,
  table: Table,
};

export default function componentHelper(instance, sectionKey, componentKey) {
  if (typeof Components[instance.type] !== 'undefined') {
    return React.createElement(Components[instance.type], {
      key: componentKey,
      componentKey,
      sectionKey,
      instance,
    });
  }
  return React.createElement(
    () => (
      <div>
        The component
        {' '}
        {instance.type}
        {' '}
        has not been created yet.
      </div>
    ),
    { key: instance.id },
  );
}
