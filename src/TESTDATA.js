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
    { value: 400.00, isTotal: true }],
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
    id: 1,
    modified: '2021-01-13T02:32:02.304Z',
    clientId: 2,
    templateId: 1,
  },
  {
    id: 2,
    modified: '2021-01-12T01:12:02.304Z',
    clientId: 1,
    templateId: 1,
  },
  {
    id: 3,
    modified: '2021-01-11T03:02:02.304Z',
    clientId: 5,
    templateId: 1,
  },
  {
    id: 4,
    modified: '2021-01-10T01:21:02.304Z',
    clientId: 4,
    templateId: 1,
  },
  {
    id: 5,
    modified: '2021-01-09T02:08:02.304Z',
    clientId: 3,
    templateId: 1,
  },
];

const dummyClients = [
  {
    id: 1,
    name: 'Thomas G. Dildy',
  },
  {
    id: 2,
    name: 'Ruby A. Miller',
  },
  {
    id: 3,
    name: 'Arline S. Gillespie',
  },
  {
    id: 4,
    name: 'Thelma S. Moyer',
  },
  {
    id: 5,
    name: 'Francis A. Walker',
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
        name: '',
        value: table1,
      },
    },
  },
};

const oldpersonalStatement = [
  {
    id: 1,
    component: 'section',
    title: 'Assets',
    articles: [
      {
        id: 1,
        component: 'fieldset',
        fields: [
          {
            id: 1,
            label: 'Test',
            type: 'text',
            value: '',
            isTotal: false,
          },
          {
            id: 2,
            label: 'Cash',
            type: 'number',
            value: '',
            isTotal: false,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    component: 'section',
    title: 'Liabilities',
    articles: [
      {
        id: 1,
        component: 'table',
        value: table1,
      },
      {
        id: 3,
        title: 'A table',
        component: 'table',
        value: table2,
      },
    ],
  },

];

const dummyWorksheetTemplates = [
  {
    id: 1,
    name: 'Personal Finance Statement',
    template: personalStatement,
  },
];

const dummyStatementData = [
  {
    clientId: 1,
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
          },
        },
      },
    },
  },
  {
    clientId: 2,
    values: [
      {
        id: 1,
        component: 'section',
        title: 'Assets',
        articles: [
          {
            id: 1,
            component: 'fieldset',
            fields: [
              {
                id: 1,
                label: 'Test',
                type: 'text',
                value: 'This client\'s text',
              },
              {
                id: 2,
                label: 'Cash',
                type: 'number',
                value: 200.00,
              },
            ],
          },
        ],
      },
      {
        id: 2,
        component: 'section',
        title: 'Liabilities',
        articles: [
          {
            id: 1,
            component: 'table',
            value: table3,
          },
          {
            id: 3,
            title: 'A table',
            component: 'table',
            value: table4,
          },
        ],
      },
    ],
  },
  {
    clientId: 3,
    values: [
      {
        id: 1,
        component: 'section',
        title: 'Assets',
        articles: [
          {
            id: 1,
            component: 'fieldset',
            fields: [
              {
                id: 1,
                label: 'Test',
                type: 'text',
                value: 'This client\'s text',
              },
              {
                id: 2,
                label: 'Cash',
                type: 'number',
                value: 300.00,
              },
            ],
          },
        ],
      },
      {
        id: 2,
        component: 'section',
        title: 'Liabilities',
        articles: [
          {
            id: 1,
            component: 'table',
            value: table3,
          },
          {
            id: 3,
            title: 'A table',
            component: 'table',
            value: table4,
          },
        ],
      },
    ],
  },
  {
    clientId: 4,
    values: [
      {
        id: 1,
        component: 'section',
        title: 'Assets',
        articles: [
          {
            id: 1,
            component: 'fieldset',
            fields: [
              {
                id: 1,
                label: 'Test',
                type: 'text',
                value: 'This client\'s text',
              },
              {
                id: 2,
                label: 'Cash',
                type: 'number',
                value: 400.00,
              },
            ],
          },
        ],
      },
      {
        id: 2,
        component: 'section',
        title: 'Liabilities',
        articles: [
          {
            id: 1,
            component: 'table',
            value: table3,
          },
          {
            id: 3,
            title: 'A table',
            component: 'table',
            value: table4,
          },
        ],
      },
    ],
  },
  {
    clientId: 5,
    values: [
      {
        id: 1,
        component: 'section',
        title: 'Assets',
        articles: [
          {
            id: 1,
            component: 'fieldset',
            fields: [
              {
                id: 1,
                label: 'Test',
                type: 'text',
                value: 'This client\'s text',
              },
              {
                id: 2,
                label: 'Cash',
                type: 'number',
                value: 500.00,
              },
            ],
          },
        ],
      },
      {
        id: 2,
        component: 'section',
        title: 'Liabilities',
        articles: [
          {
            id: 1,
            component: 'table',
            value: table3,
          },
          {
            id: 3,
            title: 'A table',
            component: 'table',
            value: table4,
          },
        ],
      },
    ],
  },
];

export {
  dummyWorksheetTemplates,
  dummyClients,
  dummyWorksheetHistory,
  dummyStatementData,
};
