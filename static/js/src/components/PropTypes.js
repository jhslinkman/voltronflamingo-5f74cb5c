import PropTypes from 'prop-types';

const { arrayOf, number, shape, string } = PropTypes;

const book = shape({
  authors: arrayOf(number.isRequired),
  description: string.isRequired,
  pk: number.isRequired,
  publisher: number.isRequired,
  title: string.isRequired
});

const bookList = arrayOf(book);

export default {
  book,
  bookList
};
