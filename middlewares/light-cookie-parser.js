module.exports = lightCookieParser;

const pairSplitRegExp = /; */;

/**
 * Parse Cookie header and populate `req.parsedCookies`
 * with an object keyed by the cookie names.
 *
 */
function lightCookieParser() {
  return function lightCookieParser(req, res, next) {
    if (req.parsedCookies) return next();

    const cookies = req.headers.cookie;

    req.parsedCookies = parse(cookies);

    next();
  };
}

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as key => values
 *
 * @param {string} str
 */
function parse(str) {

  if (typeof str !== 'string') {
    throw new TypeError('Argument str must be a string');
  }

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
