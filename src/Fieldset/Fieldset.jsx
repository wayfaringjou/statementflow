import React, { useReducer } from 'react';
import WorksheetContext from '../WorksheetContext';
import Input from '../Input';
import { ACTIONS } from '../Worksheet';
import AppContext from '../AppContext';

export default function Fieldset({ instance, sectionKey, componentKey }) {
  /*
  const initialState = instance.fields;

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
        <fieldset className="worksheet-fieldset" form="worksheet" key={componentKey}>
          {instance.name && <legend><h3>{instance.name}</h3></legend>}
          {(instance.description) && <p>{instance.description}</p>}
          {fieldKeys.map((fieldKey) => (
            <div className="input-field" key={`${componentKey}-${fieldKey}`}>
              <Input
                handleChange={({ target: { value } }) => dispatch({
                  value, sectionKey, componentKey, fieldKey, type: ACTIONS.CHANGE_DATA,
                })}
                key={fieldKey}
                id={instance.fields[fieldKey].label}
                value={instance.fields[fieldKey].value}
                label={instance.fields[fieldKey].label}
              />
              <button
                type="button"
                onClick={() => dispatch({
                  type: ACTIONS.SET_ITEM_TOTAL,
                  sectionKey,
                  componentKey,
                  componentTotal: {
                    sectionKey,
                    componentKey,
                    fieldKey,
                    value: instance.fields[fieldKey].value,
                  },
                })}
              >
                Set field as item total
              </button>
            </div>
          ))}
          {instance.componentTotal && (
            <>
              <h4>
                Item total:
                {' '}
                {worksheetData[instance.componentTotal.sectionKey]
                  .components[instance.componentTotal.componentKey]
                  .fields[instance.componentTotal.fieldKey].value}
              </h4>
              <button
                type="button"
                onClick={() => dispatch({
                  type: ACTIONS.UNSET_ITEM_TOTAL,
                  sectionKey,
                  componentKey,
                })}
              >
                Unset item total
              </button>
            </>
          )}
        </fieldset>
      )}
    </WorksheetContext.Consumer>
  );
}
