import React, { useReducer } from 'react';
import Input from '../Input';

export default function Fieldset({ instance }) {
  const initialState = instance.fields;
  console.log(initialState);

  function reducer(state, { value, index }) {
    const updatedItem = { ...state[index] };
    updatedItem.value = value;
    return { ...state, [index]: updatedItem };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <fieldset className="worksheet-fieldset" form="worksheet">
      {instance.fields.map((field, index) => (
        <Input
          handleChange={({ target: { value } }) => dispatch({ value, index })}
          key={field.id}
          id={field.label}
          value={state[index].value}
          label={state[index].label}
        />
      ))}
    </fieldset>
  );
}
