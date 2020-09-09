import compare       from '../../../scripts/utilities/compare.js';
import csvStringify  from 'csv-stringify';
import fs            from 'fs-extra';
import { promisify } from 'util';

const json2csv      = promisify(csvStringify);
const { writeFile } = fs;

const csvOptions = {
  columns: [
    `item`,
    `gloss`,
    `frequency`,
    `ger`,
    `inf`,
    `mod`,
    `pred`,
    `precxn`,
    `ref`,
    `dispersion`,
    `dispersion_ref`,
    `dispersion_pred`,
    `dispersion_mod`,
    `dispersion_ref_broad`,
    `dispersion_pred_broad`,
    `dispersion_norm`,
    `dispersion_ref_norm`,
    `dispersion_pred_norm`,
    `dispersion_mod_norm`,
  ],
  delimiter: `\t`,
  header:    true,
};

export default async function createStatsFile(outputPath, lexemeStats) {

  const tableData = Array.from(lexemeStats.entries())
  .map(([
    lexeme, {
      frequency,
      gloss,
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
      dispersionREFbroad,
      dispersionPREDbroad,
      dispersionNorm,
      dispersionREFNorm,
      dispersionPREDNorm,
      dispersionMODNorm,
    },
  ]) => [
    lexeme,
    gloss,
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
    dispersionREFbroad,
    dispersionPREDbroad,
    dispersionNorm,
    dispersionREFNorm,
    dispersionPREDNorm,
    dispersionMODNorm,
  ])
  .filter(([, gloss]) => !gloss.includes(`?`))
  .sort(([a], [b]) => compare(a, b));

  const tsv = await json2csv(tableData, csvOptions);
  await writeFile(outputPath, tsv, `utf8`);

}
