import React from 'react';
import PropTypes from 'prop-types';
import WorksheetContext from '../WorksheetContext';
import Input from '../Input';
import { ACTIONS } from '../Worksheet';

export default function Fieldset({
  instance, sectionKey, itemKey, componentKey,
}) {
  const fieldKeys = Object.keys(instance.fields);

  return (
    <WorksheetContext.Consumer>
      {({ worksheetData, dispatch }) => (
        <article className="worksheet-fieldset col span4 span8">
          <fieldset form="worksheet" key={componentKey}>
            {instance.name && <legend><h3>{instance.name}</h3></legend>}
            {(instance.description) && <p>{instance.description}</p>}
            {fieldKeys.map((fieldKey) => (
              <div className="input-field" key={`${componentKey}-${fieldKey}`}>
                <Input
                  handleChange={({ target: { value } }) => dispatch({
                    value, sectionKey, itemKey, componentKey, fieldKey, type: ACTIONS.CHANGE_DATA,
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
                    itemKey,
                    componentKey,
                    componentTotal: {
                      sectionKey,
                      itemKey,
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
                  itemKey,
                  componentKey,
                })}
              >
                Unset item total
              </button>
            </>
            )}
          </fieldset>
        </article>
      )}
    </WorksheetContext.Consumer>
  );
}

Fieldset.propTypes = {
  instance: PropTypes.oneOfType([
    PropTypes.shape({
      fields: PropTypes.objectOf(PropTypes.object),
      description: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
    }),
    PropTypes.shape({
      fields: PropTypes.objectOf(PropTypes.object),
      descriptions: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      componentTotal: PropTypes.objectOf(PropTypes.object),
    }),
  ]).isRequired,
  sectionKey: PropTypes.string.isRequired,
  itemKey: PropTypes.string.isRequired,
  componentKey: PropTypes.string.isRequired,
};
