import React from 'react';
import PropTypes from 'prop-types';

export default function InstructionItem({ componentInstance }) {
  return (
    <ul className="instruction-block">
      <li className="instruction-item">
        {componentInstance.instruction}
      </li>
    </ul>
  );
}

InstructionItem.propTypes = {
  instance: PropTypes.shape({
    instruction: PropTypes.string,
  }),
};

InstructionItem.defaultProps = {
  instance: { intruction: '' },
};
