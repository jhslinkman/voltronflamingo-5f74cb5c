import React from 'react';

const BookRating = ({ rating, bookPk, bookRating, onClick }) => (
  <span className="rating--star">
    <a href="#"
      onClick={() => onClick(bookPk, rating)}>
      &#9734;
    </a>
  </span>
);

export default BookRating;
