const fs = require("fs");

function readGrades() {
  try {
    const data = fs.readFileSync("./data/grades.json", "utf8");

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

module.exports = readGrades;