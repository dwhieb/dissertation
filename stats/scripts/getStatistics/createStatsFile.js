import compare       from '../../../scripts/utilities/compare.js';
import csvStringify  from 'csv-stringify';
import fs            from 'fs-extra';
import { promisify } from 'util';

const json2csv      = promisify(csvStringify);
const { writeFile } = fs;

const csvOptions = {
  columns: [
    `item`,
    `frequency`,
    `REF`,
    `PRED`,
    `MOD`,
    `dispersion`,
    `dispersionREF`,
    `dispersionPRED`,
    `dispersionMOD`,
    `dispersionNorm`,
    `dispersionREFNorm`,
    `dispersionPREDNorm`,
    `dispersionMODNorm`,
  ],
  delimiter: `\t`,
  header:    true,
};

export default async function createStatsFile(outputPath, lexemeStats) {

  const tableData = Array.from(lexemeStats.entries())
  .map(([
    lexeme, {
      frequency,
      REF,
      PRED,
      MOD,
      dispersion,
      dispersionREF,
      dispersionPRED,
      dispersionMOD,
      dispersionNorm,
      dispersionREFNorm,
      dispersionPREDNorm,
      dispersionMODNorm,
    },
  ]) => [
    lexeme,
    frequency,
    REF,
    PRED,
    MOD,
    dispersion,
    dispersionREF,
    dispersionPRED,
    dispersionMOD,
    dispersionNorm,
    dispersionREFNorm,
    dispersionPREDNorm,
    dispersionMODNorm,
  ])
  .sort(([a], [b]) => compare(a, b));

  const tsv = await json2csv(tableData, csvOptions);
  await writeFile(outputPath, tsv, `utf8`);

}
