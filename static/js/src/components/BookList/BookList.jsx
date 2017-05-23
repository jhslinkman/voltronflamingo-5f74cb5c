import React from 'react';
import PropTypes from '../PropTypes';
import BookItem from '../bookItem/BookItem';
import styles from './BookList.css';

const BookList = props => {
  const {books} = props;

  return (
    <div>
      <h1>Books</h1>
      <ol className={styles.list}>
        {books.map(book =>
          <li key={book.pk}><BookItem book={book} /></li>
        )}
      </ol>
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.bookList
};

export default BookList;
