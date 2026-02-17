const stopWords = require("./stopWords");

const tokenize = (text) => {
  //1-convert text to lowercase
  const lowerCase = text.toLowerCase();
  //2-clean text form punction
  const cleaned = lowerCase.replace(/[^a-z0-9\s]/g, "");
  //3-split text to words
  const words = cleaned.split(/\s+/);
  //4-remove stop words
  const tokenz = words.filter(
    (word) => word.length > 0 && !stopWords.has(word),
  );
  //5-stem words
  return tokenz;
};

module.exports = tokenize;
