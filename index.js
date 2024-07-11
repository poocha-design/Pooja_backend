import express from "express";
import bodyParser from "body-parser"
import path, { dirname } from "path";
import fs from "fs"
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
import data from './books.json' assert { type: 'json' };
// console.log(data);



import userdata from './favorites.json' assert { type: 'json' };



app.use(bodyParser.json());


app.get("/books", (req, res) => {
    res.sendFile(path.join(__dirname, "books.json"))

}
)





app.get("/books/:id", (req, res) => {
    var id = parseInt(req.params.id);
    var reqbook;
    data.forEach((book) => {
        if (book.id == id) {
            reqbook = book;
        }
    })
    if (reqbook) {
        res.json(reqbook);
    } else {
        res.status(404).json({ error: "Book not found" });
    };
})










app.get("/favorites/users/:userId", (req, res) => {
    var id = parseInt(req.params.userId)
    // var user=parseInt(req.params.users)
    var requser;
    if (userdata.userId == id) {
        requser = userdata
    }
    if (requser) {
        res.json(requser);
    } else {
        res.status(404).json({ error: "Favorites not found" });
    };
});





app.post("/favorites/users/:userId", (req, res) => {
    var id = parseInt(req.params.userId);
    var bookid = parseInt(req.body.bookId);

    // var user=parseInt(req.params.users)
    var requser;
    if (userdata.userId == id) {
        requser = userdata
    }
    if (requser) {
        res.json(requser);
    } else {
        res.status(404).json({ error: "Favorites not found" });
    };
});














app.post("/books", (req, res) => {
    const book = req.body;
    // 


    try {
        var data = fs.readFileSync('books.json');
        var myObject = JSON.parse(data);

        book.id = myObject.length + 1
        myObject.push(book);

        var newData = JSON.stringify(myObject);
        console.log(newData)

        fs.writeFile('book.json', newData, err => {
            res.send({ "id": book.id, "message": "Book added successfully" })
            if (err) throw err;


        });



    } catch (err) {
        res.send({ "message": "Unable to add the title" })
    };


})








app.post("favorites/users/:userId", (req, res) => {
    var id = req.params.userId;
    var user = req.params.users;
    var bookId = req.body.bookId;
    var reqbook;
    data.forEach((book) => {
        if (book.id == bookId) {
            reqbook = book;
        }
    })
    try {
        var data = fs.readFileSync('favorites.json');
        var myObject = JSON.parse(data);


        myObject.favorites.push(book);

        var newData = JSON.stringify(myObject);

        fs.writeFile('favorites.json', newData, err => {
            res.send({ "message": "Book added to favorites" })
            if (err) throw err;
        });
    } catch (err) {

    }
})


    






    app.delete('/books', (req, res) => {
        console.log(`DELETE Request Called for /books${req.body.id} endpoint`)
        res.send({
            "message":"deleting the book"
        })
    })






app.put("/books", (req, res) => {
    const book_id = req.body.id;
    const book_details = req.body;


    try {
        var data = fs.readFileSync('books.json');
        var myObject = JSON.parse(data);

        book.id = myObject.length + 1
        myObject.push(book);

        var newData = JSON.stringify(myObject);
        console.log(newData)

        fs.writeFile('book.json', newData, err => {
            res.send({ "id": book.id, "message": "Book added successfully" })
            if (err) throw err;


        });



    } catch (err) {
        res.send({ "message": "Unable to add the title" })
    };

});







app.put("/favorites/users/:userId", (req, res) => {
    const userid = req.params.userId;
    var isThere = False;
    userdata.forEach((user) => {
        if (user.userId == userid) {
            isThere = True;
            res.send({
                "message": "Book shared successfully"
            })
        } else {
            res.send({ "error": "Unsuccessful" })
        }

    })

})





app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

