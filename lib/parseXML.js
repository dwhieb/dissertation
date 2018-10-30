const xml2js = require(`xml2js`);

/**
 * Parses an XML string to JavaScript
 * @param  {String}  xml The XML string to parse
 * @return {Promise}     Returns a Promise
 */
function parseXML(xml) {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

module.exports = parseXML;
