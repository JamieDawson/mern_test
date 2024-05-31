import mongoose from "mongoose";

//creating the schema for the model.
const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Creating the model that uses the Schema.
export const Book = mongoose.model("Cat", bookSchema);
