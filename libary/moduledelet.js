const readBooks = require("./readBooks");
const saveBooks = require("./saveBooks");

function deleteBook(id) {

    const books = readBooks();

    const index = books.findIndex(book => book.id === id);

    if (index === -1) {
        return null;
    }

    const deletedBook = books.splice(index, 1);

    saveBooks(books);

    return deletedBook[0];
}

module.exports = deleteBook;