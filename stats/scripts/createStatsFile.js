import compare       from '../../scripts/utilities/compare.js';
import csvStringify  from 'csv-stringify';
import fs            from 'fs-extra';
import { promisify } from 'util';

const json2csv      = promisify(csvStringify);
const { writeFile } = fs;

const csvOptions = {
  columns: [
    `item`,
    `frequency`,
    `dispersion`,
    `REF`,
    `PRED`,
    `MOD`,
  ],
  delimiter: `\t`,
  header:    true,
};

export default async function createStatsFile(outputPath, lexemeStats) {

  const tableData = Array.from(lexemeStats.entries())
  .map(([
    lexeme, {
      frequency,
      dispersion,
      REF,
      PRED,
      MOD,
    },
  ]) => [
    lexeme,
    frequency,
    dispersion,
    REF,
    PRED,
    MOD,
  ])
  .sort(([,,, a], [,,, b]) => compare(a, b));

  if (!outputPath) {
    return console.info(tableData
      .map(([
        lexeme,
        frequency,
        dispersion,
        REF,
        PRED,
        MOD,
      ]) => `${lexeme}:\t${frequency} ${dispersion} ${REF} ${PRED} ${MOD}`)
      .join(`\n`));
  }

  const tsv = await json2csv(tableData, csvOptions);
  await writeFile(outputPath, tsv, `utf8`);

}
