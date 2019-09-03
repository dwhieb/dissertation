import createParser from 'csv-parse';
import fs           from 'fs';
import path         from 'path';

const columns = [
  `ID`,
  `startIndex`,
  `endIndex`,
  `token`,
  `lemma`,
  `POS`,
];

const parserOptions = {
  columns,
  delimiter:          `\t`,
  relaxColumnCount:   true,
  skipEmptyLines:     true,
  skipLinesWithError: true,
  trim:               true,
};

/**
 * Converts a CoNLL CSV file to JSON and saves it alongside the original
 * @param  {String} filePath The path to the CoNLL file to convert
 */
export default function convertCoNLL(filePath) {

  const dir          = path.dirname(filePath);
  const filename     = path.basename(filePath, `.conll`);
  const jsonFilePath = path.join(dir, `${filename}.json`);

  const parser      = createParser(parserOptions);
  const readStream  = fs.createReadStream(filePath);
  const writeStream = fs.createWriteStream(jsonFilePath);

  let firstChunk = true;

  writeStream.write(`[\n`);

  parser.on(`error`, console.error);

  parser.on(`readable`, () => {

    // eslint-disable-next-line no-underscore-dangle
    if (!(firstChunk || parser._readableState.ended === true)) writeStream.write(`,\n`);

    let json;
    let record = parser.read();

    while (record) {

      json = JSON.stringify(record, null, 2);

      writeStream.write(json);

      record = parser.read();

      if (record) writeStream.write(`,\n`);

    }

    firstChunk = false;

  });

  parser.on(`end`, () => writeStream.write(`]`));

  readStream.pipe(parser);

}
