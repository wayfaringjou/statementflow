import React from 'react';

// eslint-disable-next-line react/prop-types
export default function Form({ instance }) {
  return (
    <div className="form">
      {console.log('loaded form')}
      {console.log(instance)}
      <form>
        <fieldset>
          {instance.fields.map((field) => (
            <label htmlFor={field.label} key={field.id}>
              <p>{field.label}</p>
              <input id={field.label} type={field.type} />
            </label>
          ))}
        </fieldset>
      </form>
    </div>
  );
}
