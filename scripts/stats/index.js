import data                   from '../../data/English/data/spoken/court-transcript/Lessig-court-transcript.json';
import getWordformFrequencies from './getWordformFrequencies.js';

void function getStats() {
  console.log(getWordformFrequencies(data));
}();
