const addGrade = require("./modules/add.grade");
const deleteGrade = require("./modules/delete.grade");
const updateGrade = require("./modules/update.grade");
const readGrades = require("./modules/read.grades");


addGrade(1, "Jana", "Math", 95);
addGrade(2, "Ahmed", "English", 88);
addGrade(3, "Sara", "Science", 91);


console.log("All Grades:");
console.log(readGrades());


updateGrade(2, 94);

console.log("After Update:");
console.log(readGrades());


deleteGrade(1);

console.log("After Delete:");
console.log(readGrades());