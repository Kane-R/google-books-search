const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3001;
const axios = require('axios');
const app = express();

// Database Connection Request
require('dotenv/config');
const connectDB = require("./config/connectDB.js");

//Bring in models
const db = require("./models");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

/******************************* Connect to db  ****************************/
connectDB();

// Define API routes here

/*  POST REQUEST */

// Grab books based upon search box
app.post('/api/books', async (req, res) => {
    let searchQuery = req.body.searching;
    const googleConfig = process.env.GOOGLE_BOOKS;
    let response = await axios(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${googleConfig}`);
    let data = await response;
    res.send(data.data);
});

// Insert books into database
app.post('/api/saveBooks', async (req, res) => {

    let searchQuery = req.body;
    let mongoValue = [{
      bookId: searchQuery.id,
      title: searchQuery.title,
      authors: searchQuery.authors,
      description: searchQuery.description,
      imgUrl: searchQuery.imgUrl,
      linkUrl: searchQuery.linkUrl
    }];

    db.bookSave.countDocuments({bookId: mongoValue[0].bookId}, function (err, count){ 
    if(count>0){
      res.sendStatus(304);
    }else{
      db.bookSave.collection.insertMany(mongoValue).then(() => {
         res.sendStatus(200);
       })
       .catch(err => {
         res.json(err);
       });
     } 
  });  
});

/*  GET REQUEST */

app.get('/api/savedBooks', async (req, res) => {
  db.bookSave.find({})
  .then(dbbookSave => {
   // console.log(dbbookSave);
   res.json(dbbookSave);
  })
  .catch(err => {
   res.json(err);
  });
});

/*  DELETE REQUEST */

app.delete('/api/removeBook', async (req, res) => {
  //console.log(req.body);
  const id = req.body.id;

  db.bookSave.findOneAndRemove({ bookId: id })
  .then(() => {
    res.sendStatus(200); 
  })
  .catch(err => {
   res.status(500).send(err);
  });

});



// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
