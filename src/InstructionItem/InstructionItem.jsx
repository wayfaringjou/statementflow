import React from 'react';
import PropTypes from 'prop-types';
import './InstructionItem.css';

export default function InstructionItem({ componentInstance }) {
  return (
    <article className="worksheet-instruction col span4 span8 span6-lg card">

      {componentInstance.componentName && (
      <header className="card-header">
        <h4>{componentInstance.componentName}</h4>
      </header>
      )}

      {componentInstance.componentDescription && (
      <section className="card-subtitle">
        <p>{componentInstance.componentDescription}</p>
      </section>
      )}

      <section className="card-rich-content instruction-block">
        <p className="instruction-text">
          {componentInstance.instruction}
        </p>
      </section>
    </article>
  );
}

InstructionItem.propTypes = {
  componentInstance: PropTypes.shape({
    instruction: PropTypes.string,
    componentName: PropTypes.string,
    componentDescription: PropTypes.string,
  }),
};

InstructionItem.defaultProps = {
  componentInstance: { intruction: '' },
};
