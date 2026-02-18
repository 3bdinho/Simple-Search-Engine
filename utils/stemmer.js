const stem = require("stemmer").stemmer;

const stemTokens = (tokens) => {
  return tokens.map((token) => stem(token));
};

module.exports = stemTokens;
