import React, {useEffect, useContext} from 'react';
import { AppContext } from '../utils/AppContext';


function SavedBooks() {

// Call Context 
const {savedBookData, modal, modalCopy} = useContext(AppContext);
// Handle mobile class for operating menu
let [savedBooks, setSavedBooks] = savedBookData;
// eslint-disable-next-line
let [modalState, setModalState] =  modal;
// eslint-disable-next-line
let [modalCopyState, setModalCopyState] =  modalCopy;

  const API = {
    async savedBooks() {
      const res = await fetch(`/api/savedBooks`);
      const json = await res.json();
      setSavedBooks( savedBooks = json);
    },
    async removeBook(id) {
      
      // Convert to json syntax
      let jsonId = {id: id}

      const res = await fetch("/api/removeBook", {
        method: "DELETE",
        body: JSON.stringify(jsonId),
        headers: { "Content-Type": "application/json" }
        });

        const json = await res;

        if(json.status === 200){
          setModalState( modalState = "");
          setModalCopyState( modalCopyState = "Book removed from saved books.");
          setTimeout(() =>{ setModalState( modalState = "set") }, 500);
          setTimeout(() =>{ setModalState( modalState = "") }, 3000);
          setTimeout(() =>{ setModalState( modalState = "hide") }, 3500);
          setSavedBooks( savedBooks = savedBooks.filter(data => data.bookId !== id) );
        }else{
          setModalState( modalState = "");
          setModalCopyState( modalCopyState = "Error action at this time cannot be completed.");
          setTimeout(() =>{ setModalState( modalState = "not-set") }, 500);
          setTimeout(() =>{ setModalState( modalState = "") }, 3000);
          setTimeout(() =>{ setModalState( modalState = "hide") }, 3500);
        }
    }
  }

  /********************************************* Call lifecycle methods *********************************************/

  useEffect(() => {
   API.savedBooks();
   // eslint-disable-next-line
  }, []);


  return(
    <section id="savedBooks">
      <header><h1>Google Books Saved</h1></header>
      {savedBooks === '' ?  
       ''
        : (
          <React.Fragment>
            
          {savedBookData[0].map((book) => (
            <div className="book" key={book.bookId}>
              <h3>{book.title}</h3>
              <h4>Written By: {
                (book.authors ) ? 
                book.authors.map((author) => ` ${author}`).toString() :
                  " Not Provided"
              }</h4>
              <div className="book-info">
                <div className="book-buttons">
                  <button onClick={(e) => {
                    e.preventDefault();
                    window.open(book.linkUrl);
                    }}>View
                  </button>
                  <button data-id={book.bookId} onClick={(e) => API.removeBook(e.target.getAttribute("data-id"))}>Delete</button>
                </div>
                <div>{ (book.imgUrl ? 
                <img src={book.imgUrl} alt="book.volumeInfo.title"/>
                : <img src="./content/img/not-found.jpg" alt="Not Found" width="150"/> )}</div>
                <div>{ (book.description ? <p>{book.description}</p>: <p>No description has been provided for this book.</p> )}</div>
                
                </div>
              </div>  
          ))}
        </React.Fragment>
      )}
    </section>
    )
  }; 

export default SavedBooks;