const readGrades = require("./read.grades");
const saveGrades = require("./save.grades");

function addGrade(id, name, subject, grade) {
  const grades = readGrades();

  const student = grades.find((item) => item.id === id);

  if (student) {
    console.log("Student already exists.");
    return;
  }

  grades.push({
    id,
    name,
    subject,
    grade,
  });

  saveGrades(grades);

  console.log("Grade added successfully.");
}

module.exports = addGrade;