import React from 'react';
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
