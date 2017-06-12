import PropTypes from 'prop-types';

const { arrayOf, number, shape, string, bool } = PropTypes;

const book = shape({
  authors: arrayOf(number.isRequired),
  description: string.isRequired,
  pk: number.isRequired,
  publisher: number.isRequired,
  title: string.isRequired,
  average_rating: number, // eslint-disable-line camelcase
  rated: bool
});

const publisher = shape({
  pk: number.isRequired,
  name: string.isRequired
});

const bookList = arrayOf(book);

const publisherList = arrayOf(publisher);

export default {
  book,
  bookList,
  publisher,
  publisherList
};
