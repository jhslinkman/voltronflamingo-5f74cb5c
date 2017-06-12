import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import BookRatings from './BookRatings';
import BookRating from '../BookRating/BookRating';

const book = {
  'pk': 45,
  'title': 'Azure Dream',
  'description': 'Sid is a waiter from Japan',
  'isbn': '1111111111111',
  'authors': [2],
  'publisher': 1,
  'average_rating': 2.4
};

function getWrapper(isBookRated) {
  const bookCopy = Object.assign({}, book, {rated: isBookRated});
  return shallow(<BookRatings book={bookCopy} />);
}

test('should include five BookRating components', t => {
  const count = getWrapper().find(BookRating).length;
  t.is(count, 5);
});

test('should pass a publisher object to each BookRating', t => {
  t.plan(5);
  const bookRatings = getWrapper().find(BookRating);
  bookRatings.forEach((item, i) => {
    const expected = {'rating': i + 1, bookPk: book.pk, bookRating: undefined, onClick: undefined};
    t.deepEqual(item.props(), expected);
  });
});

test('should render the average rating if the book passed the "rated" prop', t => {
  const bookRatings = getWrapper(true);
  t.is(bookRatings.text(), `Average rating: ${book.average_rating}`)
});
