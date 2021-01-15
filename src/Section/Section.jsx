import React from 'react';
import componentHelper from '../helpers/componentHelper';

export default function Section({ instance, sectionKey }) {
  const componentKeys = Object.keys(instance.components);

  return (
    <section className="worksheet-section stack">
      {console.log(instance)}
      <h2>{instance.sectionTitle}</h2>
      {componentKeys
        .map((key) => componentHelper(instance.components[key], sectionKey, key))}
    </section>
  );
}
