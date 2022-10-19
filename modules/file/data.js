const fs = require("fs");

const fileData = () => {
  const fileToRead = "distances/distance.json";
  const file = fs.readFileSync(fileToRead);
  return JSON.parse(file);
};

module.export = fileData;
