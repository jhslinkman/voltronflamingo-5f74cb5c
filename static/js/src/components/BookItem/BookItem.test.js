import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import BookItem from './BookItem';

const book = {
  'pk': 45,
  'title': 'Azure Dream',
  'description': 'Sid is a waiter from Japan',
  'isbn': '1111111111111',
  'authors': [2],
  'publisher': 1
};

function getWrapper(overrides = {}) {
  const props = Object.assign({book}, overrides);
  return shallow(<BookItem {...props} />);
}

test('should include the title of the book', t => {
  const expected = 'Azure Dream';
  const title = getWrapper().find('.t-book-title').text();
  t.is(title, expected);
});

test('should include the description of the book', t => {
  const expected = 'Sid is a waiter from Japan';
  const desc = getWrapper().find('.t-book-description').text();
  t.is(desc, expected);
});

test('should include a cover image', t => {
  const expected = 'https://placeimg.com/150/200/nature?id=45';
  const src = getWrapper().find('.t-book-cover').node.props.src;
  t.is(src, expected);
});
