/* eslint-disable react/prop-types */
import React from 'react';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';
import Form from '../Form/Form';
import Table from '../Table/Table';
import Components from './components';

export default function Statement({ customForm }) {
  return (
    <div className="statement">
      {console.log(customForm)}
      {customForm.map((componentInstance) => Components(componentInstance))}
    </div>
  );
}
