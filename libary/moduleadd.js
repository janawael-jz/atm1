const readBooks = require("./readBooks");
const saveBooks = require("./saveBooks");

function addBook(book) {

    const books = readBooks();

    const newBook = {
        id: books.length ? books[books.length - 1].id + 1 : 1,
        ...book
    };

    books.push(newBook);

    saveBooks(books);

    return newBook;
}

module.exports = addBook;