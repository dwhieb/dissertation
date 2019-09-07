import data                       from '../../data/English/data/spoken/court-transcript/Lessig-court-transcript.json';
import getTextWordformFrequencies from './getTextWordformFrequencies.js';

void function getStats() {
  console.log(getTextWordformFrequencies(data));
}();
