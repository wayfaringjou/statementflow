import React from 'react';

export default function Description() {
  return (
    <section className="description">
      <h2>
        What is &apos;Statementflow&apos;?
      </h2>
      <p>
        {`A tool to create 'Financial Statement Worksheet' templates and use them 
      to generate financial statements for clients. Use Worksheets designed to
      gather the necessary information to prepare financial statements.
      Use stored forms to generate a financial statement by filling the fields
      with your client's financial data.`}
      </p>
      <h2>
        Start a new worksheet
      </h2>
      <p>
        Start working on a new statement using a GAAP worksheet by
        clicking on the &apos;New Worksheet&apos; button above.
      </p>
      <h2>Modify past worksheets</h2>
      <p>
        Continue working on a worksheet by clicking on
        &apos;Worksheet History&apos; above to see a list of past worksheets.
      </p>
    </section>
  );
}
