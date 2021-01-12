const testGrid = [
  [
    { value: 'Bank Name', readOnly: true },
    { value: 'Account Title', readOnly: true },
    { value: 'Reconciled Balance', readOnly: true },
  ],
  [{ value: 'Your Bank', expr: '' },
    { value: 'Your Account', expr: '' },
    { value: 100.0 }],
];

const fetchCells = {
  '00': {
    key: '0', value: 'name', readOnly: true, expr: '',
  },
  '01': {
    key: '1', value: 'one', readOnly: true, expr: '',
  },
  '02': {
    key: '2', value: 'two', readOnly: true, expr: '',
  },
  '03': {
    key: '3', value: 'three', readOnly: true, expr: '',
  },
  '04': {
    key: '4', value: 'four', readOnly: true, expr: '',
  },
  A0: {
    key: 'A0', value: 'January', readOnly: true, expr: '',
  },
  A1: { key: 'A1', value: '200', expr: '' },
  A2: {
    key: 'A2',
    value: '200',
    expr: '=A1',
    readOnly: true,
  },
  A3: { key: 'A3', value: '', expr: '' },
  A4: { key: 'A4', value: '', expr: '' },
  B0: {
    key: 'B0', value: 'February', readOnly: true, expr: '',
  },
  B1: { key: 'B1', value: '', expr: '' },
  B2: { key: 'B2', value: '', expr: '' },
  B3: { key: 'B3', value: '', expr: '' },
  B4: { key: 'B4', value: '', expr: '' },
  C0: {
    key: 'C0', value: 'March', readOnly: true, expr: '',
  },
  C1: { key: 'C1', value: '', expr: '' },
  C2: { key: 'C2', value: '', expr: '' },
  C3: { key: 'C3', value: '', expr: '' },
  C4: { key: 'C4', value: '', expr: '' },
  D0: {
    key: 'D0', value: 'April', readOnly: true, expr: '',
  },
  D1: { key: 'D1', value: '', expr: '' },
  D2: { key: 'D2', value: '', expr: '' },
  D3: { key: 'D3', value: '', expr: '' },
  D4: { key: 'D4', value: '', expr: '' },
};
const TESTDATA = {
  testForm: [
    {
      id: 1,
      component: 'form',
      fields: [
        {
          id: 1,
          label: 'Test',
          type: 'text',
        },
        {
          id: 2,
          label: 'password',
          type: 'password',
        },
      ],
    },
    {
      id: 2,
      component: 'table',
      grid: fetchCells,
    },
  ],
};

export default TESTDATA;
