/* eslint-disable react/prop-types */
import React from 'react';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

// eslint-disable-next-line react/prop-types
export default function Form({ instance }) {
  const { value } = instance;

  return (
    <div className="worksheet-table">
      {console.log('loaded table')}
      {console.log(instance)}
      <ReactDataSheet
        data={value}
        valueRenderer={(cell) => cell.value}
        dataRenderer={(cell) => cell.expr}
      />
    </div>
  );
}
