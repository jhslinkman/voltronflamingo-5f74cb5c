import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import BookList from './BookList';
import BookItem from '../bookItem/BookItem';

const books = [
  {
    'pk': 45,
    'title': 'Azure Dream',
    'description': 'Sid is a waiter from Japan.',
    'isbn': '1111111111111',
    'authors': [2],
    'publisher': 1
  },
  {
    'pk': 91,
    'title': 'Wizards in the Secret',
    'description': 'In a world where robots are rude and reckless.',
    'isbn': '2222222222222',
    'authors': [1],
    'publisher': 2
  }
];

function getWrapper(overrides = {}) {
  const props = Object.assign({books}, overrides);
  return shallow(<BookList {...props} />);
}

test('should give list the `list` class', t => {
  const expected = 'list';
  const list = getWrapper().find('ol');
  t.true(list.hasClass(expected));
});

test('should include a BookItem for each item in the books prop', t => {
  const expected = books.length;
  const count = getWrapper().find(BookItem).length;
  t.is(count, expected);
});

test('should pass a book object to each BookItem', t => {
  t.plan(books.length);

  const bookItems = getWrapper().find(BookItem);
  bookItems.forEach((item, i) => {
    const expected = {'book': books[i]};
    t.deepEqual(item.props(), expected);
  });
});
