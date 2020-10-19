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
    `aspect`,
    `definite`,
    `frequency`,
    `rel_freq`,
    `flexibility`,
    `flexibility_broad`,
    `ger`,
    `inf`,
    `mod`,
    `pred`,
    `precxn`,
    `ref`,
    `mod_rel`,
    `pred_rel`,
    `ref_rel`,
    `pred_rel_broad`,
    `ref_rel_broad`,
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
      aspect,
      definite,
      flexibility,
      flexibilityBroad,
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
      relativeFrequency,
      relativeMOD,
      relativePRED,
      relativeREF,
      relativePREDbroad,
      relativeREFbroad,
    },
  ]) => [
    lexeme,
    gloss,
    aspect,
    definite === true ? `TRUE` : `FALSE`,
    frequency,
    relativeFrequency,
    flexibility,
    flexibilityBroad,
    GER,
    INF,
    MOD,
    PRED,
    PREDCXN,
    REF,
    relativeMOD,
    relativePRED,
    relativeREF,
    relativePREDbroad,
    relativeREFbroad,
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
  .filter(([, gloss]) => !gloss?.includes(`?`))
  .sort(([a], [b]) => compare(a, b));

  const tsv = await json2csv(tableData, csvOptions);
  await writeFile(outputPath, tsv, `utf8`);

}
