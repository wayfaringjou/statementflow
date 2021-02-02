import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiKeyboardReturn } from '@mdi/js';
import WorksheetContext from '../WorksheetContext';
import Input from '../Input';
import { ACTIONS } from '../Worksheet';
import './Fieldset.css';

export default function Fieldset({
  componentInstance, sectionKey, itemKey, componentKey, reloadSectionTotal,
}) {
  const fieldKeys = Object.keys(componentInstance.fields);

  return (
    <WorksheetContext.Consumer>
      {({ dispatch }) => (
        <article className="worksheet-fieldset col span4 span8 span12 card">

          <fieldset form="worksheet" key={componentKey}>

            {componentInstance.componentName && (
              <legend className="card-header">
                <h4>{componentInstance.componentName}</h4>
              </legend>
            )}

            <section className="card-subtitle">
              {(componentInstance.componentDescription) && (
                <p>{componentInstance.componentDescription}</p>)}
            </section>

            <section className="card-rich-content fieldset-content">

              {fieldKeys.map((fieldKey) => (
                <div className="input-field" key={`${componentKey}-${fieldKey}`}>
                  <Input
                    handleChange={({ target: { value } }) => {
                      dispatch({
                        value,
                        sectionKey,
                        itemKey,
                        componentKey,
                        fieldKey,
                        type: ACTIONS.CHANGE_DATA,
                      });
                      reloadSectionTotal();
                    }}
                    key={fieldKey}
                    id={componentInstance.fields[fieldKey].label}
                    value={componentInstance.fields[fieldKey].value}
                    label={componentInstance.fields[fieldKey].label}
                    type={componentInstance.fields[fieldKey].type}
                  />
                  {componentInstance.fields[fieldKey].type === 'number' && (

                  <section className="card-actions fieldset-actions">
                    <button
                      className="set-total-button text"
                      type="button"
                      onClick={() => {
                        dispatch({
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
                        });
                        reloadSectionTotal();
                      }}
                    >
                      <Icon
                        path={mdiKeyboardReturn}
                        title="Set field as item total"
                        size={1}
                        color="currentColor"
                      />
                      <span className="btn-label">
                        Set field as total
                      </span>
                    </button>
                  </section>
                  )}
                </div>
              ))}
            </section>
          </fieldset>
        </article>
      )}
    </WorksheetContext.Consumer>
  );
}

Fieldset.propTypes = {
  componentInstance: PropTypes.shape({
    fields: PropTypes.objectOf(
      PropTypes.shape({
        label: PropTypes.string,
        type: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    ),
    componentDescription: PropTypes.string,
    componentName: PropTypes.string,
    componentType: PropTypes.string,
  }).isRequired,
  sectionKey: PropTypes.string.isRequired,
  itemKey: PropTypes.string.isRequired,
  componentKey: PropTypes.string.isRequired,
  reloadSectionTotal: PropTypes.func.isRequired,
};
