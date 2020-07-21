import React from 'react';
import BookSearch from './BookSearch';
import BookTable from './BookTable';

function Home() {
  return (
    <React.Fragment>
      <BookSearch />
      <BookTable />
    </React.Fragment>
  )
}

export default Home;