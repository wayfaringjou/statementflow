const table1 = [
  [
    { value: 'Bank Name', readOnly: true },
    { value: 'Account Title', readOnly: true },
    { value: 'Reconciled Balance', readOnly: true },
  ],
  [{ value: '', expr: '' },
    { value: '', expr: '' },
    { value: 0.00 }],
];

const table2 = [
  [
    { value: 'Address', readOnly: true },
    { value: 'Aproximate Square Footage', readOnly: true },
    { value: 'Current Value', readOnly: true },
  ],
  [{ value: '', expr: '' },
    { value: '', expr: '' },
    { value: 100.00 }],
];

const table3 = [
  [
    { value: 'Bank Name' },
    { value: 'Account Title' },
    { value: 'Reconciled Balance' },
  ],
  [{ value: 'Dummy Bank' },
    { value: 'Main Account' },
    { value: 400.00 }],
];

const table4 = [
  [
    { value: 'Address', readOnly: true },
    { value: 'Aproximate Square Footage', readOnly: true },
    { value: 'Current Value', readOnly: true },
  ],
  [{ value: '4509 Asylum Avenue New York, CT 10013', expr: '' },
    { value: '1700', expr: '' },
    { value: 209100 }],
];

const dummyWorksheetHistory = [
  {
    id: 'rd1',
    modified: '2021-01-13T02:32:02.304Z',
    clientId: 'aaad1',
    templateId: 1,
    statementDataId: 'abc1',
  },
];

const dummyClients = [
  {
    id: 'aaad1',
    name: 'Thomas G. Dildy',
  },

];

const personalStatement = {
  a1: {
    sectionTitle: 'Assets',
    components: {
      a2: {
        type: 'fieldset',
        name: 'Test Fieldset',
        fields: {
          a3: {
            label: 'Test',
            value: '',
          },
          a4: {
            label: 'Another Field',
            value: '',
          },
        },
      },
    },
  },
  b1: {
    sectionTitle: 'Liabilities',
    components: {
      b2: {
        type: 'table',
        name: 'Test Table',
        value: table3,
      },
    },
  },
};

const dummyWorksheetTemplates = [
  {
    id: 1,
    name: 'Personal Finance Statement',
    template: personalStatement,
  },
];

const dummyStatementData = [
  {
    clientId: 'aaad1',
    id: 'abc1',
    values: {
      a1: {
        sectionTitle: 'Assets',
        components: {
          a2: {
            type: 'fieldset',
            name: 'Test fieldset',
            fields: {
              a3: {
                label: 'Test',
                value: 'Client text',
              },
              a4: {
                label: 'Another field',
                value: 'More info',
              },
            },
            componentTotal: {
              sectionKey: 'a1',
              componentKey: 'a2',
              fieldKey: 'a4',
              value: 'More info',
            },
          },
        },
      },
      b1: {
        sectionTitle: 'Liabilities & Net Worth',
        components: {
          b2: {
            type: 'table',
            name: 'Test table',
            value: table3,
            componentTotal: {
              sectionKey: 'b1',
              componentKey: 'b2',
              cell: {
                row: 1,
                col: 2,
              },
              value: 400.00,
            },
          },
        },
      },
    },
  },
];

export {
  dummyWorksheetTemplates,
  dummyClients,
  dummyWorksheetHistory,
  dummyStatementData,
};
