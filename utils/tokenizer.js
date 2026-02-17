const stopWords = require("./stopWords");
const stemTokens = require("./stemmer");

const tokenize = (text) => {
  const tokens = text
    //1-Convert text to lowercase
    .toLowerCase()
    //2-Clean text form punctuation
    .replace(/[^a-z0-9\s]/g, "")
    //3-Split text into words
    .split(/\s+/)
    //4-Remove stop words & short words
    .filter((word) => word.length > 2 && !stopWords.has(word));

  //5-stem words
  return stemTokens(tokens);
};

module.exports = tokenize;
