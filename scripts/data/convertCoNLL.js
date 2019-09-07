import createParser      from 'csv-parse';
import { fileURLToPath } from 'url';
import fs                from 'fs';
import module            from 'module'; // eslint-disable-line no-shadow
import path              from 'path';
import { processDir }    from '../utilities/index.js';

const columns = [
  `ID`,
  `startIndex`,
  `endIndex`,
  `token`,
  `lemma`,
  `POS`,
];

const [,, dataDir] = process.argv;

const parserOptions = {
  columns,
  delimiter:          `\t`,
  relaxColumnCount:   true,
  skipEmptyLines:     true,
  skipLinesWithError: true,
  trim:               true,
};

const require = module.createRequire(fileURLToPath(import.meta.url)); // eslint-disable-line no-shadow

/**
 * Converts a CoNLL CSV file to JSON and saves it alongside the original
 * @param  {String} filePath The path to the CoNLL file to convert
 */
const convertCoNLL = filePath => new Promise((resolve, reject) => {

  const dir          = path.dirname(filePath);
  const filename     = path.basename(filePath, `.conll`);
  const jsonFilePath = path.join(dir, `${filename}.json`);

  const parser      = createParser(parserOptions);
  const readStream  = fs.createReadStream(filePath);
  const writeStream = fs.createWriteStream(jsonFilePath);

  let firstChunk = true;

  writeStream.write(`[\n`);

  parser.on(`error`, reject);

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

  parser.on(`end`, () => writeStream.end(`]`, resolve));

  readStream.pipe(parser);

});

/**
 * The ignore function for the recurse method
 */
function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.conll`;
}

if (require.main === module) processDir(dataDir, convertCoNLL, ignore);

export default () => processDir(dataDir, convertCoNLL, ignore);
