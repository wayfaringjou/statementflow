import React from 'react';
import PropTypes from 'prop-types';

export default function NoteField({
  id, handleChange, value, label,
}) {
  <label htmlFor={id}>
    <span className="note-field-label">{label}</span>
    <textarea id={id} onChange={handleChange} value={value} />
  </label>;
}

NoteField.propTypes = {
  id: PropTypes.number,
  handleChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
};

NoteField.defaultProps = {
  id: 0,
  handleChange: () => {},
  value: '',
  label: '',
};
