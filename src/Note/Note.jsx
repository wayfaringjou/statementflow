import React, { useState } from 'react';
import WorksheetContext from '../WorksheetContext';

export default function Note() {
  const [description, setDescription] = useState();
  return (
    <WorksheetContext.Consumer>
      {({ worksheetData, dispatch }) => (
        <section className="item-note">
          <h4>Note</h4>
        </section>
      )}
    </WorksheetContext.Consumer>
  );
}
