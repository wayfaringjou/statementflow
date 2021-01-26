import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

export default function Input({
  id, handleChange, value, label,
}) {
  return (
    <label htmlFor={id}>
      <span className="input-label">{label}</span>
      <input id={id} onChange={handleChange} value={value} />
    </label>
  );
}

Input.propTypes = {
  id: PropTypes.string,
  handleChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
};

Input.defaultProps = {
  id: '',
  handleChange: () => {},
  value: '',
  label: '',
};
