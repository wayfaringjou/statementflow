/* eslint-disable no-new */
/* eslint-disable array-callback-return */
import {
  Document, HeadingLevel, Paragraph, TabStopPosition, TabStopType, TextRun,
} from 'docx';

export default function CreateDocument(data) {
  const doc = new Document();
  const sectionKeys = Object.keys(data);

  const paragraphs = [];

  sectionKeys
    .forEach((sectionKey) => {
      const componentKeys = Object.keys(data[sectionKey].components);
      paragraphs.push(
        new Paragraph({
          text: data[sectionKey].sectionTitle,
          heading: HeadingLevel.HEADING_1,
        }),
      );
      componentKeys.forEach((componentKey) => {
        console.log(componentKey);
        console.log(data[sectionKey].components);
        const componentName = data[sectionKey].components[componentKey].name;
        const componentTotal = data[sectionKey].components[componentKey].componentTotal.value;
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun(`${componentName}:`),
              new TextRun(`\t${componentTotal}`),
            ],
            tabStops: [
              {
                type: TabStopType.RIGHT,
                position: TabStopPosition.MAX,
              },
            ],
            heading: HeadingLevel.HEADING_2,
          }),
        );
      });
    });

  console.log(paragraphs);

  doc.addSection({
    children: paragraphs,
  });

  console.log(doc);
  return doc;
}
