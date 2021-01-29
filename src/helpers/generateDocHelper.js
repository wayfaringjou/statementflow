/* eslint-disable no-new */
/* eslint-disable array-callback-return */
import {
  AlignmentType,
  Document,
  HeadingLevel,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun,
  Header,
  SectionVerticalAlignValue,
  indent,
  IIndentAttributesProperties,
} from 'docx';

export default function CreateDocument(data) {
  const doc = new Document();
  console.log(data);
  const client = data.thisWorksheet.client.name;
  const statementType = data.thisWorksheet.template.name;
  const statementDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(data.thisWorksheet.statement.statementDate));

  doc.addSection({
    properties: {
      verticalAlign: SectionVerticalAlignValue.CENTER,
    },
    children: [
      new Paragraph({
        children: [
          new TextRun({ text: client }),
        ],
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        children: [
          new TextRun({ text: statementType }),
        ],
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        children: [
          new TextRun({ text: statementDate }),
        ],
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
      }),
    ],
  });
  console.log(data.worksheetData);
  const sectionKeys = Object.keys(data.worksheetData);

  const statementElements = [];

  sectionKeys
    .forEach((sectionKey) => {
      const itemKeys = Object.keys(data.worksheetData[sectionKey].items);
      statementElements.push(
        new Paragraph({
          text: data.worksheetData[sectionKey].sectionName,
          heading: HeadingLevel.HEADING_1,
        }),
      );
      itemKeys.forEach((itemKey) => {
        const { itemName } = data.worksheetData[sectionKey].items[itemKey];
        const itemTotal = data.worksheetData[sectionKey].items[itemKey].itemTotal.value;
        statementElements.push(
          new Paragraph({
            children: [
              new TextRun(`${itemName}:`),
              new TextRun(`\t${itemTotal}`),
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

  doc.addSection({
    headers: {
      default: new Header({
        children: [
          new Paragraph(client),
          new Paragraph(statementType),
          new Paragraph(statementDate),
        ],
      }),
    },
    children: statementElements,
  });

  const noteElements = [];

  sectionKeys.forEach((sectionKey) => {
    const itemKeys = Object.keys(data.worksheetData[sectionKey].items);
    let noteCount = 0;
    itemKeys.forEach((itemKey) => {
      if (data.worksheetData[sectionKey].items[itemKey].itemNote) {
        noteCount += 1;

        const {
          name,
          description,
          tableReference,
        } = data.worksheetData[sectionKey].items[itemKey].itemNote;

        noteElements.push(
          new Paragraph({
            children: [
              new TextRun(`Note ${noteCount}:\t`),
              new TextRun({ text: `${name}`, bold: true, underline: {} }),
            ],
            tabStops: [
              {
                type: TabStopType.LEFT,
                position: 1000,
              },
            ],
          }),
          new Paragraph({
            children: [
              new TextRun('\t'),
              new TextRun({ text: description }),
            ],
            tabStops: [
              {
                type: TabStopType.LEFT,
                position: 1000,
              },
            ],
          }),
        );

        if (tableReference) {
          noteElements.push(
            new Paragraph({
              indent: 1000,
              children: [
                new TextRun({ text: 'Description', underline: {} }),
                new TextRun('\t'),
                new TextRun({ text: 'Amount', underline: {} }),
              ],
              tabStops: [
                {
                  type: TabStopType.RIGHT,
                  position: TabStopPosition.MAX,
                },
              ],
            }),
          );
          tableReference.forEach((row) => {
            noteElements.push(
              new Paragraph({
                children: [
                  new TextRun({ text: row[0].value }),
                  new TextRun('\t'),
                  new TextRun({ text: row[1].value }),
                ],
                tabStops: [
                  {
                    type: TabStopType.RIGHT,
                    position: TabStopPosition.MAX,
                  },
                ],
              }),
            );
          });

          const itemTotal = data.worksheetData[sectionKey].items[itemKey].itemTotal.value;

          noteElements.push(
            new Paragraph({
              children: [
                new TextRun('\t'),
                new TextRun({ text: itemTotal }),
              ],
              tabStops: [
                {
                  type: TabStopType.RIGHT,
                  position: TabStopPosition.MAX,
                },
              ],
            }),
          );
        }
      }
    });
  });

  doc.addSection({
    headers: {
      default: new Header({
        children: [
          new Paragraph(client),
          new Paragraph(statementType),
          new Paragraph(statementDate),
        ],
      }),
    },
    children: noteElements,
  });

  return doc;
}
