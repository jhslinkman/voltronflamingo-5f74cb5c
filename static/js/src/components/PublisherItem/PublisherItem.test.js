import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import PublisherItem from './PublisherItem';

const publisher = {
  'pk': 1,
  'name': 'Publisher 1'
};

function getWrapper() {
  return shallow(<PublisherItem publisher={publisher} />);
}

test('should include the title of the publisher', t => {
  const expected = 'Publisher 1';
  const title = getWrapper().find('.t-publisher-title').text();
  t.is(title, expected);
});
