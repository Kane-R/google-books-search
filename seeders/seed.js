let mongoose = require("mongoose");
let db = require("../models");
require('dotenv/config');

const dbConfig = process.env.MONGODB_URI;

mongoose.connect(dbConfig, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true 
});

let bookSeed = [
      {
        bookId: "f6d7*#",
        title: "Philosopher's Stone",
        authors: ["J. K. Rowling"],
        description: "Harry potter book 1",
        imgUrl: "https://vignette.wikia.nocookie.net/harrypotter/images/f/ff/Pholosophers-Stone_PM.jpg/revision/latest?cb=20161122143651",
        linkUrl: "https://en.wikipedia.org/wiki/Harry_Potter_and_the_Philosopher%27s_Stone"
      }
];

db.bookSave.deleteMany({})
  .then(() => db.bookSave.collection.insertMany(bookSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
