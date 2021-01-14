import React from 'react';
import Fieldset from '../Fieldset';
import Table from '../Table';
import Section from '../Section';

const Components = {
  section: Section,
  fieldset: Fieldset,
  table: Table,
};

export default function componentHelper(instance) {
  if (typeof Components[instance.component] !== 'undefined') {
    return React.createElement(Components[instance.component], {
      key: instance.id,
      instance,
    });
  }
  return React.createElement(
    () => (
      <div>
        The component
        {instance.component}
        has not been created yet.
      </div>
    ),
    { key: instance.id },
  );
}
