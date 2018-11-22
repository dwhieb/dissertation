const parseXML = require(`./parseXML`);

/**
 * Converts an individual ELAN text to DLx format
 * @param  {Object} data An Object representing an ELAN FlexText document
 * @return {Object}      Returns a DLx Text Object
 */
function convertText(data) {

  // Construct the text.title Object
  const title = data.item
  .filter(item => item.$.type === `title`)
  .reduce((hash, titleObj) => {
    hash[titleObj.$.lang] = titleObj._; // eslint-disable-line no-param-reassign
    return hash;
  }, { eng: `` });

  // Get text.abbreviation (FlexText: "abbreviation")
  // NB: FLEx supports abbreviations in multiple scripts/languages.
  // This converter finds the the first "eng" or "en" comment, or the first in the Array if none is present
  const abbreviationObjects = data.item.filter(item => item.$.type === `title-abbreviation`);
  const engAbbreviation     = abbreviationObjects.find(abbrObj => abbrObj.$.lang === `eng`);
  const enAbbreviation      = abbreviationObjects.find(abbrObj => abbrObj.$.lang === `en`);
  const abbreviationObject  = engAbbreviation || enAbbreviation || abbreviationObjects[0];
  const abbreviation        = abbreviationObject._;

  // Construct text.notes (FlexText: "comment")
  const notes = data.item
  .filter(item => item.$.type === `comment`)
  .map(commentObj => ({
    dateCreated:  new Date,
    dateModified: new Date,
    language:     commentObj.$.lang,
    text:         commentObj._,
    type:         `Note`,
  }));

  // Construct text.access.notes (FlexText: "source")
  const accessNotes = data.item
  .filter(item => item.$.type === `source`)
  .reduce((hash, sourceObj) => {
    hash[sourceObj.$.lang] = sourceObj._; // eslint-disable-line no-param-reassign
    return hash;
  }, {});

  // Construct text.utterances (FlexText: "paragraphs")
  const paragraphs = data.paragraphs[0].paragraph;

  paragraphs.forEach((para, i) => {
    para.phrases[0].phrase.paragraph = i; // eslint-disable-line no-param-reassign
  });

  console.log(Object.keys(paragraphs[0].phrases[0].phrase));

  return data;

}

/**
 * Converts a FlexText XML String to a DLx Text Object
 * @param  {String}  xml The FlexText XML String
 * @return {Promise}     Resolves to an Array of texts, even if only 1 text was included in the XML
 */
async function flex2dlx(xml) {

  // Parse XML
  let data = await parseXML(xml);

  // Get text(s)
  data = data.document;
  data = data[`interlinear-text`];

  // Ensure that the data is an Array, and convert each text in the Array
  data = Array.isArray(data) ? data : [data];
  data = data.map(convertText);

  // Return an Array of converted texts
  return data;

}

module.exports = flex2dlx;
