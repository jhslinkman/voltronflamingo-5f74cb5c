import test from 'ava';
import {getBooks} from './api';
import fetchMock from 'fetch-mock';

const baseApiUrl = 'http://www.example.com';

test.beforeEach(() => {
  fetchMock.mock('*', 200);
});

test.afterEach(() => {
  fetchMock.restore();
});

test('getBooks should make a call to the books endpoint', t => {
  t.plan(1);

  getBooks(baseApiUrl);

  return new Promise(resolve => {
    setTimeout(() => {
      t.true(fetchMock.called());
      resolve();
    }, 10);
  });
});
