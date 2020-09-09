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
    `GER`,
    `INF`,
    `MOD`,
    `PRED`,
    `PREDCXN`,
    `REF`,
    `dispersion`,
    `dispersionREF`,
    `dispersionPRED`,
    `dispersionMOD`,
    `dispersionPREDbroad`,
    `dispersionREFbroad`,
    `dispersionNorm`,
    `dispersionREFNorm`,
    `dispersionPREDNorm`,
    `dispersionMODNorm`,
    `gloss`,
  ],
  delimiter: `\t`,
  header:    true,
};

export default async function createStatsFile(outputPath, lexemeStats) {

  const tableData = Array.from(lexemeStats.entries())
  .map(([
    lexeme, {
      frequency,
      GER,
      INF,
      MOD,
      PRED,
      PREDCXN,
      REF,
      dispersion,
      dispersionREF,
      dispersionPRED,
      dispersionMOD,
      dispersionPREDbroad,
      dispersionREFbroad,
      dispersionNorm,
      dispersionREFNorm,
      dispersionPREDNorm,
      dispersionMODNorm,
      gloss,
    },
  ]) => [
    lexeme,
    frequency,
    GER,
    INF,
    MOD,
    PRED,
    PREDCXN,
    REF,
    dispersion,
    dispersionREF,
    dispersionPRED,
    dispersionMOD,
    dispersionPREDbroad,
    dispersionREFbroad,
    dispersionNorm,
    dispersionREFNorm,
    dispersionPREDNorm,
    dispersionMODNorm,
    gloss,
  ])
  .sort(([a], [b]) => compare(a, b));

  const tsv = await json2csv(tableData, csvOptions);
  await writeFile(outputPath, tsv, `utf8`);

}
