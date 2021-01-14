import React from 'react';
import componentHelper from '../helpers/componentHelper';

export default function Section({ instance }) {
  return (
    <section className="worksheet-section">
      {console.log(instance)}
      {instance.articles.map((componentInstance) => componentHelper(componentInstance))}
    </section>
  );
}
