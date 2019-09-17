import { fileURLToPath } from 'url';
import path              from 'path';
import { readFileSync }  from 'fs';
import yamlParser        from 'js-yaml';

// eslint-disable-next-line no-shadow, no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const lexicalTagsPath = path.join(__dirname, `../constants/lexicalTags.yml`);
const yaml            = readFileSync(lexicalTagsPath);
const lexicalTags     = yamlParser.load(yaml);

/**
 * Determines whether a POS tag belongs to the major categories of Noun, Verb, or Adjective according to the Penn tag set
 * @param  {String}  tag The Penn tag to test
 * @return {Boolean}
 */
export default function isMajorCategory(tag) {
  return lexicalTags.includes(tag);
}
