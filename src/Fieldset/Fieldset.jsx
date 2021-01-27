import React from 'react';
import PropTypes from 'prop-types';
import WorksheetContext from '../WorksheetContext';
import Input from '../Input';
import { ACTIONS } from '../Worksheet';

export default function Fieldset({
  componentInstance, sectionKey, itemKey, componentKey,
}) {
  const fieldKeys = Object.keys(componentInstance.fields);

  return (
    <WorksheetContext.Consumer>
      {({ worksheetData, dispatch }) => (
        <article className="worksheet-fieldset col span4 span8">
          <fieldset form="worksheet" key={componentKey}>
            {componentInstance.name && <legend><h4>{componentInstance.name}</h4></legend>}
            {(componentInstance.description) && <p>{componentInstance.description}</p>}
            {fieldKeys.map((fieldKey) => (
              <div className="input-field" key={`${componentKey}-${fieldKey}`}>
                <Input
                  handleChange={({ target: { value } }) => dispatch({
                    value, sectionKey, itemKey, componentKey, fieldKey, type: ACTIONS.CHANGE_DATA,
                  })}
                  key={fieldKey}
                  id={componentInstance.fields[fieldKey].label}
                  value={componentInstance.fields[fieldKey].value}
                  label={componentInstance.fields[fieldKey].label}
                />
                <button
                  type="button"
                  onClick={() => dispatch({
                    type: ACTIONS.SET_ITEM_TOTAL,
                    sectionKey,
                    itemKey,
                    componentKey,
                    itemTotal: {
                      sectionKey,
                      itemKey,
                      componentKey,
                      fieldKey,
                      value: componentInstance.fields[fieldKey].value,
                    },
                  })}
                >
                  Set field as item total
                </button>
              </div>
            ))}
            {/* componentInstance.componentTotal && (
            <>
              <h4>
                Item total:
                {' '}
                {worksheetData[componentInstance.componentTotal.sectionKey]
                  .components[componentInstance.componentTotal.componentKey]
                  .fields[componentInstance.componentTotal.fieldKey].value}
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
            ) */}
          </fieldset>
        </article>
      )}
    </WorksheetContext.Consumer>
  );
}

Fieldset.propTypes = {
  componentInstance: PropTypes.oneOfType([
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
