import React, { useReducer } from 'react';
import WorksheetContext from '../WorksheetContext';
import Input from '../Input';
import AppContext from '../AppContext';

export default function Fieldset({ instance, sectionKey, componentKey }) {
  /*
  const initialState = instance.fields;
  console.log(initialState);

  function reducer(state, { value, index }) {
    const updatedItem = { ...state[index] };
    updatedItem.value = value;
    return { ...state, [index]: updatedItem };
  }

  const [state, dispatch] = useReducer(reducer, initialState);
*/
  const fieldKeys = Object.keys(instance.fields);

  return (
    <WorksheetContext.Consumer>
      {({ worksheetData, dispatch }) => (
        <fieldset className="worksheet-fieldset" form="worksheet">
          {instance.name && <legend><h3>{instance.name}</h3></legend>}
          {fieldKeys.map((fieldKey) => (
            <Input
              handleChange={({ target: { value } }) => dispatch({
                value, sectionKey, componentKey, fieldKey,
              })}
              key={fieldKey}
              id={instance.fields[fieldKey].label}
              value={instance.fields[fieldKey].value}
              label={instance.fields[fieldKey].label}
            />
          ))}
        </fieldset>
      )}
    </WorksheetContext.Consumer>
  );
}
