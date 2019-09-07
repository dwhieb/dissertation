import fs             from 'fs';
import JSONStream     from 'JSONStream';
import path           from 'path';
import { processDir } from '../utilities/index.js';

const [,, dataDir] = process.argv;

const generateWordforms = filePath => new Promise((resolve, reject) => {

  const dir         = path.dirname(filePath);
  const filename    = path.basename(filePath, `.json`);
  const newFilename = `${filename}_wordforms.json`;
  const newFilePath = path.join(dir, newFilename);

  const parser      = JSONStream.parse(`token`);
  const readStream  = fs.createReadStream(filePath);
  const writeStream = fs.createWriteStream(newFilePath);

  parser.on(`error`, reject);

  parser.on(`data`, console.log);

  parser.on(`end`, resolve);

  readStream.pipe(parser);

});

function ignore(filePath, stats) {
  if (stats.isDirectory()) return false;
  return path.extname(filePath) !== `.json`;
}

processDir(dataDir, generateWordforms, ignore);
