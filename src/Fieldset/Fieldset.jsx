import React from 'react';

export default function Fieldset({ instance }) {
  return (
    <fieldset className="worksheet-fieldset" form="worksheet">
      {instance.fields.map((field) => (
        <label htmlFor={field.label} key={field.id}>
          <p>{field.label}</p>
          <input id={field.label} key={field.type} value={field.value} />
        </label>
      ))}
    </fieldset>
  );
}
