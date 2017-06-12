import React from 'react';
import sinon from 'sinon';
import test from 'ava';
import { shallow } from 'enzyme';
import BookRating from './BookRating';

const book = {
  'pk': 45,
  'title': 'Azure Dream',
  'description': 'Sid is a waiter from Japan',
  'isbn': '1111111111111',
  'authors': [2],
  'publisher': 1
};

function getWrapper(onClick) {
  return shallow(<BookRating rating={2}
    bookPk={book.pk}
    bookRating={null}
    onClick={onClick} />);
}

test('clicking Books filter should call onClick with args ["<rating>"]', t => {
  const onClick = sinon.spy();
  const wrapper = getWrapper(onClick);
  wrapper.find('a').simulate('click');
  t.is(onClick.calledWith(book.pk, 2), true);
});
