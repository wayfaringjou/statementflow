import React from 'react';
import componentHelper from '../helpers/componentHelper';

export default function Section({ instance, callback }) {
  return (
    <section className="worksheet-section stack">
      {console.log(instance)}
      <h2>{instance.title}</h2>
      {instance.articles.map((componentInstance) => componentHelper(componentInstance, callback))}
    </section>
  );
}
