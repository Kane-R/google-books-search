import React,{useContext} from 'react';
import { AppContext } from '../utils/AppContext';

const BookSearch = () => {

  const {search, bookData, fetchData} = useContext(AppContext);
  // eslint-disable-next-line
  let [books, setBooks] =  bookData;
  let [fetching, setFetching] =  fetchData;
  let [searching, setSearching] =  search;

  const handleChange = e => {
    setSearching( searching = e.target.value);
  };

  const API = {

    async booksCall(e) {
      e.preventDefault();

      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        e.target.querySelector("input").blur();
      }

      if( searching === ''){

      }else{
        const res = await fetch("/api/books", {
        method: "POST",
        body: JSON.stringify({searching}),
        headers: { "Content-Type": "application/json" }
        });
    
       const json = await res.json();
          setBooks(books = json);
          if (fetching === false){
            setFetching(fetching = true)
          }
        }
      }
    }

   let handleKeyPress = (e) => {
      if(e.key === 'Enter'){
       API.booksCall();
      }
    }

  return(
    <React.Fragment>
      <header>
        <h1>Google Books Search</h1>
      </header>

      <section className="filterBar">
        <form onSubmit={(e) => API.booksCall(e) }>
          <input 
            type="text" 
            placeholder="Filter by book name..."
            value={searching}
            name="book-search"
            onChange={handleChange}
            onKeyPress={(e) => handleKeyPress(e)}
          />
          <button>Search</button>
        </form>
      </section>
    </React.Fragment>
  );
}

export default BookSearch