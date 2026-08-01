const http = require("http");

const readBooks = require("./modules/readBooks");
const addBook = require("./modules/addBook");
const deleteBook = require("./modules/deleteBook");

const PORT = 3000;

const server = http.createServer((req, res) => {

    res.setHeader("Content-Type", "application/json");

    

    if (req.method === "GET" && req.url === "/books") {

        try {

            const books = readBooks();

            res.writeHead(200);

            res.end(JSON.stringify(books));

        } catch (error) {

            res.writeHead(500);

            res.end(JSON.stringify({
                message: "Error reading file"
            }));

        }

    }

    

    else if (req.method === "POST" && req.url === "/books") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {

            try {

                const book = JSON.parse(body);

                const newBook = addBook(book);

                res.writeHead(201);

                res.end(JSON.stringify(newBook));

            } catch (error) {

                res.writeHead(400);

                res.end(JSON.stringify({
                    message: "Invalid JSON"
                }));

            }

        });

    }

   

    else if (req.method === "DELETE" && req.url.startsWith("/books/")) {

        const id = Number(req.url.split("/")[2]);

        const deleted = deleteBook(id);

        if (!deleted) {

            res.writeHead(404);

            res.end(JSON.stringify({
                message: "Book not found"
            }));

        } else {

            res.writeHead(200);

            res.end(JSON.stringify({
                message: "Book deleted",
                deleted
            }));

        }

    }

    

    else {

        res.writeHead(404);

        res.end(JSON.stringify({
            message: "Route not found"
        }));

    }

});

server.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});