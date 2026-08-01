const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "books.json");

function saveBooks(books) {
    fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
}

module.exports = saveBooks;