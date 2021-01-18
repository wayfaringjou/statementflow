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

const cashTable = [
  [
    { value: 'Bank Name' },
    { value: 'Account Title' },
    { value: 'Statement Date' },
    { value: 'Restricted Yes/No' },
    { value: 'Reconciled Balance' },
  ],
  [
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
  ],
  [
    { value: '' },
    { value: '' },
    { value: '' },
    { value: 'Total:' },
    { value: 0 },
  ],
];

const marketable = [
  [
    { value: 'Name of Issuer' },
    { value: 'No. of Shares' },
    { value: 'Date Acquired' },
    { value: 'Pledged Yes/No' },
    { value: 'Tax Basis (cost) per Share' },
    { value: 'Market per Share' },
    { value: 'Total Cost (tax basis)' },
    { value: 'Total Market' },
  ],
  [
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
  ],
  [
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: 'Total:' },
    { value: 0 },
  ],
];

const receivableTable = [
  [
    { value: 'Debtor\'s Name' },
    { value: 'Due Date' },
    { value: 'Interest Rate' },
    { value: 'Tax Basis (if different from principal to collect)' },
    { value: 'Cost Basis (principal to collect)' },
  ],
  [
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
  ],
  [
    { value: '' },
    { value: '' },
    { value: '' },
    { value: 'Total:' },
    { value: 0 },
  ],
];

const investmentsTable = [
  [
    { value: 'Name of Entity' },
    { value: '' },
  ],
  [
    { value: 'Type of Entity' },
    { value: '' },
  ],
  [
    { value: 'Statement Date' },
    { value: '' },
  ],
  [
    { value: 'Period Covered' },
    { value: '' },
  ],
  [
    { value: 'Basis of Accounting' },
    { value: '' },
  ],
  [
    { value: 'Significant Loss Contingencies' },
    { value: '' },
  ],
  [
    { value: 'Audited, Reviewed, or Compiled?' },
    { value: '' },
  ],
  [
    { value: 'Report Modified or Qualified?' },
    { value: '' },
  ],
  [
    { value: '' },
    { value: '' },
  ],
  [
    { value: 'Total Current Assets' },
    { value: '' },
  ],
  [
    { value: 'Net Property, Plant, Equipment' },
    { value: '' },
  ],
  [
    { value: 'Other Assets' },
    { value: '' },
  ],
  [
    { value: 'Total Assets' },
    { value: 0 },
  ],
];

const notesTable = [
  [
    { value: 'Payable to' },
    { value: 'Collateral' },
    { value: 'Maturity Date' },
    { value: 'Monthly Payment' },
    { value: 'Stated Interest Rate' },
    { value: 'Implicit Interest Rate (if different)' },
    { value: 'Present Balance' },
  ],
  [
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
  ],
  [
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: 'Total:' },
    { value: 0 },
  ],
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
        type: 'table',
        name: 'Cash',
        description: 'Record the individual’s checkbook or passbook balance in all bank accounts as of the financial statement date. If possible, obtain copies of bank reconciliations.',
        value: cashTable,
        componentTotal: {
          sectionKey: 'a1',
          componentKey: 'a2',
          cell: { row: 2, col: 4 },
          value: 0,
        },
      },
      ab2: {
        type: 'table',
        name: 'Marketable Securities',
        description: 'Obtain or prepare a listing of marketable securities with the following information (or attach a separate listing if necessary).',
        value: marketable,
        componentTotal: {
          sectionKey: 'a1',
          componentKey: 'ab2',
          cell: { row: 2, col: 7 },
          value: 0,
        },
      },
      ac3: {
        type: 'fieldset',
        name: 'Broker cash balance',
        fields: {
          ad34: {
            label: 'Determine if the individual has a cash balance with a broker. If so, add this amount to cash or present as a separate item after cash.',
            value: 0,
          },
        },
        componentTotal: {
          sectionKey: 'a1',
          componentKey: 'ac3',
          fieldKey: 'ad34',
          value: 0,
        },
      },
      ad4: {
        type: 'table',
        name: 'Accounts and notes receivable',
        description: 'Inquire if individual has any personal accounts or notes receivable. Obtain the following facts:',
        value: receivableTable,
        componentTotal: {
          sectionKey: 'a1',
          componentKey: 'ad4',
          cell: { row: 2, col: 4 },
          value: 0,
        },
      },
      adf5: {
        type: 'table',
        name: 'Investments in Closely Held Business',
        description: 'Each investment in a separate entity should be included as one amount in the statement of financial condition. When these investments are material, information regarding the various assets and liabilities and operating results should be set forth in a note to the financial statements. Obtain the following information:',
        value: investmentsTable,
        componentTotal: {
          sectionKey: 'a1',
          componentKey: 'adf5',
          cell: { row: 12, col: 1 },
          value: 0,
        },
      },
    },
  },
  b1: {
    sectionTitle: 'Liabilities & Net Worth',
    components: {
      ba2: {
        type: 'table',
        name: 'Notes Payable',
        description: 'Obtain the following information for notes payable other than residential mortgage and other real estate loans.',
        value: notesTable,
        componentTotal: {
          sectionKey: 'b1',
          componentKey: 'ba2',
          cell: { row: 2, col: 6 },
          value: 0,
        },
      },
      bac3: {
        type: 'fieldset',
        name: 'Net Worth',
        fields: {
          afd34: {
            label: 'Net Increase (Decrease) in Net Worth',
            value: 0,
          },
        },
        componentTotal: {
          sectionKey: 'b1',
          componentKey: 'bac3',
          fieldKey: 'afd34',
          value: 0,
        },
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
            type: 'table',
            name: 'Cash',
            description: 'Record the individual’s checkbook or passbook balance in all bank accounts as of the financial statement date. If possible, obtain copies of bank reconciliations.',
            value: cashTable,
            componentTotal: {
              sectionKey: 'a1',
              componentKey: 'a2',
              cell: { row: 2, col: 4 },
              value: 0,
            },
          },
          ab2: {
            type: 'table',
            name: 'Marketable Securities',
            description: 'Obtain or prepare a listing of marketable securities with the following information (or attach a separate listing if necessary).',
            value: marketable,
            componentTotal: {
              sectionKey: 'a1',
              componentKey: 'ab2',
              cell: { row: 2, col: 7 },
              value: 0,
            },
          },
          ac3: {
            type: 'fieldset',
            name: 'Broker cash balance',
            fields: {
              ad34: {
                label: 'Determine if the individual has a cash balance with a broker. If so, add this amount to cash or present as a separate item after cash.',
                value: 1000,
              },
            },
            componentTotal: {
              sectionKey: 'a1',
              componentKey: 'ac3',
              fieldKey: 'ad34',
              value: 1000,
            },
          },
          ad4: {
            type: 'table',
            name: 'Accounts and notes receivable',
            description: 'Inquire if individual has any personal accounts or notes receivable. Obtain the following facts:',
            value: receivableTable,
            componentTotal: {
              sectionKey: 'a1',
              componentKey: 'ad4',
              cell: { row: 2, col: 4 },
              value: 0,
            },
          },
          adf5: {
            type: 'table',
            name: 'Investments in Closely Held Business',
            description: 'Each investment in a separate entity should be included as one amount in the statement of financial condition. When these investments are material, information regarding the various assets and liabilities and operating results should be set forth in a note to the financial statements. Obtain the following information:',
            value: investmentsTable,
            componentTotal: {
              sectionKey: 'a1',
              componentKey: 'adf5',
              cell: { row: 12, col: 1 },
              value: 0,
            },
          },
        },
      },
      b1: {
        sectionTitle: 'Liabilities & Net Worth',
        components: {
          ba2: {
            type: 'table',
            name: 'Notes Payable',
            description: 'Obtain the following information for notes payable other than residential mortgage and other real estate loans.',
            value: notesTable,
            componentTotal: {
              sectionKey: 'b1',
              componentKey: 'ba2',
              cell: { row: 2, col: 6 },
              value: 0,
            },
          },
          bac3: {
            type: 'fieldset',
            name: 'Net Worth',
            fields: {
              afd34: {
                label: 'Net Increase (Decrease) in Net Worth',
                value: 0,
              },
            },
            componentTotal: {
              sectionKey: 'b1',
              componentKey: 'bac3',
              fieldKey: 'afd34',
              value: 0,
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
