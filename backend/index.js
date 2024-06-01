import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middlewar efor CORS POLICY
//Option 1: All all origns iwht defualt of cors
// app.use(cors());
//Option 2: Allow custom origins
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome to the app");
}); //the root

app.use("/books", booksRoute); //middlware

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
