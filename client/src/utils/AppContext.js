import React, {useState, createContext} from 'react';

export const AppContext = createContext();

export const AppProvider = props => {

//Initially data called from API
const [books, setBooks] = useState({}); 
// Saved book data
const [savedBooks, setSavedBooks] = useState('');
//State check to see if it's done being called
const [fetching, setFetching] = useState(false); 
// Set search data
const [searching, setSearching] = useState(""); 
// Set Modal state and message
const [modalState, setModalState] = useState("hide"); 
const [modalCopyState, setModalCopyState] = useState(""); 

  return(
    <AppContext.Provider value={{ 
      bookData: [books, setBooks],
      savedBookData: [savedBooks, setSavedBooks],
      fetchData: [fetching, setFetching], 
      search: [searching, setSearching], 
      modal: [modalState, setModalState],
      modalCopy: [modalCopyState, setModalCopyState]
      }}>
      {props.children}
    </AppContext.Provider>
  );
}
