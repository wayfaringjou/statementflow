import React from 'react';
import Form from '../Form/Form';
import Table from '../Table/Table';

const Components = {
  form: Form,
  table: Table,
};

export default (instance) => {
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
};
