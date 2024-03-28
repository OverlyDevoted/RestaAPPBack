const fs = require("fs");
const data = fs.readFileSync("./servers/data/profane.json", "utf8");
let profanityList = JSON.parse(data);

profanityList = profanityList.map((word) => word.toLowerCase())

const Filter = require("bad-words");
const profanityFilter = new Filter();
profanityFilter.addWords(...profanityList);
module.exports = profanityFilter;
