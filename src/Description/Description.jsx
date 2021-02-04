import React from 'react';

export default function Description() {
  return (
    <section className="description flow">
      <section id="intro">

        <h2>
          What is &apos;Statementflow&apos;?
        </h2>
        <p>
          &apos;Statementflow&apos; is meant to be a tool to
          help accountants in the preparation of financial statements.
          The first version of this project offers basic
          functionality that can serve as a good foundation for further development.
        </p>

        <p>
          You can use &apos;Statementflow&apos; to generate financial
          statement documents for your clients using worksheet templates
          based on the &apos;Generally Accepted Accounting Principles&apos; (GAAP).
        </p>

        <p>
          You can follow a worksheet to gather the necessary information
          about your client&apos;s financial activities and store that data
          for later reference.
          By filling the worksheet with your client&apos;s financial data,
          you can also export a statement in Docx format to use as a starting
          point for an official financial statement.
          Use Worksheets designed to
          gather the necessary information to prepare financial statements.
          Use stored forms to generate a financial statement by filling the fields
          with your client&apos;s financial data.
        </p>

        <p>
          You can use a worksheet template designed for a Personal Financial
          Statement Compilation, expect more templates soon.
        </p>
      </section>

      <section id="start-prompt">
        <section className="start-prompt-title">
          <h2>
            Start a new worksheet
          </h2>
        </section>

        <p>
          Start working on a new statement using a GAAP worksheet by
          clicking on the &apos;New Worksheet&apos; button above.
        </p>
      </section>

      <section id="modify-prompt">
        <section
          className="modify-prompt-title"
        >
          <h2>Modify past worksheets</h2>
        </section>

        <p>
          Continue working on a worksheet by clicking on
          &apos;Worksheet History&apos; above to see a list of past worksheets.
        </p>
      </section>

    </section>
  );
}
