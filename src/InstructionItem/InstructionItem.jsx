import React from 'react';
import PropTypes from 'prop-types';

export default function InstructionItem({ instance }) {
  return (
    <ul className="instruction-block">
      <li className="instruction-item">
        {instance.instruction}
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
