import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import FilterBar from './FilterBar';

function getWrapper() {
  return shallow(<FilterBar/>);
}

test('should get nav class', t => {
  const expected = 'nav';
  const list = getWrapper().find('ul');
  t.true(list.hasClass(expected));
});

test('should include a filter Books', t => {
  const expected = 'Books';
  const filter = getWrapper().find('li').at(0);
  t.is(filter.text(), expected);
});

test('should include a filter Publishers', t => {
  const expected = 'Publishers';
  const filter = getWrapper().find('li').at(1);
  t.is(filter.text(), expected);
});
