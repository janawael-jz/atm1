const readGrades = require("./read.grades");
const saveGrades = require("./save.grades");

function deleteGrade(id) {
  const grades = readGrades();

  const filtered = grades.filter((item) => item.id !== id);

  if (filtered.length === grades.length) {
    console.log("Student not found.");
    return;
  }

  saveGrades(filtered);

  console.log("Grade deleted successfully.");
}

module.exports = deleteGrade;