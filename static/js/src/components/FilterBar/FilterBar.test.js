import React from 'react';
import sinon from 'sinon';
import test from 'ava';
import { shallow } from 'enzyme';
import FilterBar from './FilterBar';

function getWrapper(onClickFilter) {
  onClickFilter || (onClickFilter = sinon.spy());
  return shallow(<FilterBar onClickFilter={onClickFilter}/>);
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

test('clicking Books filter should call onClickFilter with args ["books"]', t => {
  const onClickFilter = sinon.spy();
  const wrapper = getWrapper(onClickFilter);
  wrapper.find('.books').find('a').simulate('click');
  t.is(onClickFilter.calledWith('books'), true);
});

test('clicking Publishers filter should call onClickFilter with args ["publishers"]', t => {
  const onClickFilter = sinon.spy();
  const wrapper = getWrapper(onClickFilter);
  wrapper.find('.publishers').find('a').simulate('click');
  t.is(onClickFilter.calledWith('publishers'), true);
});
