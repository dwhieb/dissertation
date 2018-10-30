const parseXML = require(`./parseXML`);

/**
 * Converts an ELAN FlexText XML String to a DLx Text Object
 * @param  {String}  xml The ELAN FlexText XML String
 * @return {Promise}
 */
async function elan2dlx(xml) {

  let data = await parseXML(xml);

  data = data.document;
  data = data[`interlinear-text`];

  return data;

}

module.exports = elan2dlx;
