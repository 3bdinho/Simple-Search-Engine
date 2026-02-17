const stem = require("stemmer");

function stemTokens(tokens) {
  return tokens.map((token) => stem(token));
}

module.exports = stemTokens;
