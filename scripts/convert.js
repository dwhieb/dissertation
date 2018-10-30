// IMPORTS
const { parseXML } = require(`../lib`);
const path         = require(`path`);
const { readFile } = require(`fs`).promises;

// VARIABLES
const [,, inputFilepath, outputFilepath] = process.argv;

void async function convert() {

  const xml  = await readFile(path.join(process.cwd(), inputFilepath), `utf8`);
  const data = await parseXML(xml);
  console.log(data);

}();
