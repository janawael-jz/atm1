const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "books.json");

function readBooks() {
    try {
        const data = fs.readFileSync(filePath, "utf8");

        if (!data) return [];

        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

module.exports = readBooks;