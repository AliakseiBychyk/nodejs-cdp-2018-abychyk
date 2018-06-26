module.exports = lightQueryParser;

const pairSplitRegExp = /& */;


/**
 * Parse Query string and populate `req.parsedQuery`
 * with an object keyed by the query names.
 *
 */
function lightQueryParser() {
  return function lightQueryParser(req, res, next) {
    if (req.parsedQuery) return next();

    /**  req.query return already parsed query object
     *   that we can write to the req.parsedQuery
     */
    // const query = req.query;
    // req.parsedQuery = query;

    console.log(req.url);
    const query = req.url.split('?')[1];

    // check if there is no query
    req.parsedQuery = query !== undefined ? parse(query) : {};

    next();
  };
}

/**
 * Parse a query string
 *
 * Parse the given query string into an object
 * The object has the various queries as key => values
 *
 * @param {string} str
 */
function parse(str) {

  let obj = {};
  const pairs = str.split(pairSplitRegExp);

  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];
    const eq_idx = pair.indexOf('=');

    // skip things that don't look like key=value
    if (eq_idx < 0) continue;

    const key = pair.substr(0, eq_idx).trim();

    let value = pair.substr(eq_idx + 1, pair.length).trim();

    // quoted values - remove quotes
    if (value[0] === '"') value = value.slice(1, -1);

    // only assign once
    if (undefined === obj[key]) obj[key] = value;
  }

  return obj;
}
