import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import PublisherList from './PublisherList';
import PublisherItem from '../PublisherItem/PublisherItem';

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

function getWrapper() {
  return shallow(<PublisherList publishers={publishers} />);
}

test('should give list the `list` class', t => {
  const expected = 'list';
  const list = getWrapper().find('ol');
  t.true(list.hasClass(expected));
});

test('should include a PublisherItem for each item in the publishers prop', t => {
  const expected = publishers.length;
  const count = getWrapper().find(PublisherItem).length;
  t.is(count, expected);
});

test('should pass a publisher object to each PublisherItem', t => {
  t.plan(publishers.length);

  const publisherItems = getWrapper().find(PublisherItem);
  publisherItems.forEach((item, i) => {
    const expected = {'publisher': publishers[i]};
    t.deepEqual(item.props(), expected);
  });
});
