import React from 'react';
import BookRating from '../BookRating/BookRating';

const BookRatings = props => {
  const { book, rateBook } = props;
  if (book.rated) {
    return (
      <div className="ratings">
        Average rating: {book.average_rating}
      </div>
    );
  }
  const ratings = [];
  for (let i = 1; i < 6; i++) {
    ratings.push(
      <BookRating key={i}
        rating={i}
        bookPk={book.pk}
        bookRating={book.rating}
        onClick={rateBook}
      />
    );
  }
  return (
    <div className="ratings">
      { ratings }
    </div>
  );
};

export default BookRatings;
