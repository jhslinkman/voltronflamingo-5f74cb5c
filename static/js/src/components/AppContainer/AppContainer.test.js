import 'jsdom-global/register';
import React from 'react';
import test from 'ava';
import fetchMock from 'fetch-mock';
import { mount, shallow } from 'enzyme';
import AppContainer from './AppContainer';
import BookList from '../bookList/BookList';
import FilterBar from '../filterBar/FilterBar';

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

const publishers = [
  {
    'pk': 1,
    'name': 'Publisher 1'
  },
  {
    'pk': 2,
    'name': 'Publisher 2'
  }
];

const baseApiUrl = 'http://www.example.com';

test.beforeEach(() => {
  fetchMock.mock('end:books/', books);
  fetchMock.mock('end:publishers/', publishers);
});

test.afterEach(() => {
  fetchMock.restore();
});

function getWrapper() {
  return shallow(<AppContainer baseApiUrl={baseApiUrl}/>);
}

function getMountedWrapper() {
  return mount(<AppContainer baseApiUrl={baseApiUrl} />);
}

test('should have the correct default state', t => {
  const expected = {'showBooks': true, 'books': [], 'publishers': []};
  const state = getWrapper().state();
  t.deepEqual(state, expected);
});

test('should include a FilterBar', t => {
  const expected = 1;
  const filterBar = getWrapper().find(FilterBar);
  t.is(filterBar.length, expected);
});

test('should include a BookList', t => {
  const expected = 1;
  const bookList = getWrapper().find(BookList);
  t.is(bookList.length, expected);
});

test('should not include a BookList if showBooks is false', t => {
  t.plan(1);

  const expected = 0;
  const wrapper = getWrapper();

  wrapper.setState({'showBooks': false}, () => {
    const bookList = wrapper.find(BookList);
    t.is(bookList.length, expected);
  });
});

test('should get book data when mounted', t => {
  t.plan(1);

  const expected = books;
  const instance = getWrapper().instance();

  instance.componentWillMount();

  return new Promise(resolve => {
    setTimeout(() => {
      t.deepEqual(instance.state.books, expected);
      resolve();
    }, 10);
  });
});

test('should get publisher data when mounted', t => {
  t.plan(1);

  const expected = publishers;
  const instance = getWrapper().instance();

  instance.componentWillMount();

  return new Promise(resolve => {
    setTimeout(() => {
      t.deepEqual(instance.state.publishers, expected);
      resolve();
    }, 10);
  });
});

test('clicking the publishers nav should render a list of publishers', t => {
  const wrapper = getMountedWrapper();
  wrapper.find(FilterBar).find('.publishers a').simulate('click');
  t.is(wrapper.find('.content h1').text(), 'Publishers');
});

test.skip('rating a book should call the ratings API and show the average rating for that book', t => { // eslint-disable-line no-unused-vars
  // Need more time to look figure out the ins and outs of enzyme
});
