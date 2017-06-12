import React from 'react';
import PropTypes from '../PropTypes';
import BookItem from '../BookItem/BookItem';
import styles from './BookList.css';

const BookList = props => {
  const { books, rateBook } = props;

  return (
    <div className="content">
      <h1>Books</h1>
      <ol className={styles.list}>
        {books.map(book =>
          <li key={book.pk}><BookItem book={book} rateBook={rateBook}/></li>
        )}
      </ol>
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.bookList
};

export default BookList;
