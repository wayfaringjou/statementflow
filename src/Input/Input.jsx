import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

export default function Input({
  id, handleChange, value, label, type,
}) {
  return (
    <label htmlFor={id}>
      <span className="input-label">{label}</span>
      {(type === 'textarea')
        ? (
          <textarea
            id={id}
            onChange={handleChange}
            value={value}
          />
        )
        : (
          <input
            id={id}
            onChange={handleChange}
            value={value}
            type={type}
          />
        )}
    </label>
  );
}

Input.propTypes = {
  id: PropTypes.string,
  handleChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  type: PropTypes.string,
};

Input.defaultProps = {
  id: '',
  handleChange: () => {},
  value: '',
  label: '',
  type: '',
};
