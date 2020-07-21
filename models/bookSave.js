const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    books: [
      {
        bookId: {
          type: String,
          trim: true,
          required: "Enter a book's google id"
        },
        title: {
          type: String,
          trim: true,
          required: "Enter a book title"
        },
        authors: {
          type: Array,
          trim: true,
          required: "Enter a list of authors"
        },
        description: {
          type: String,
          trim: true,
          required: "Enter a description of a book"
        },
        imgUrl: {
          type: String,
          trim: true,
          required: "Enter a image url"
        },
        linkUrl: {
          type: String,
          trim: true,
          required: "Enter a image url"
        },
      }
    ]
  }
);

const bookSave = mongoose.model("bookSave", bookSchema);

module.exports = bookSave;
