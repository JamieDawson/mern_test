import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import e from "express";
const app = express();

app.use(express.json()); //Needed for express to use JSON body

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome to the app");
}); //the root

// Route for Save a new Book
app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// route for Get All books from database
app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
  }
});

// route for Get ONE books from database
app.get("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
  }
});

//Route to update a book
app.put("/books/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "send all required fields: title, author, publishYear",
      });
    }

    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).send({ message: error.message });
    }

    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Delete a book
app.delete("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id);

    if (!result) {
      return response.status(404).json({ message: "book not found" });
    }

    return response.status(200).send({ message: "book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("connected to mongodb database!!!");
    app.listen(PORT, () => {
      console.log(`PORT IS ON ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
