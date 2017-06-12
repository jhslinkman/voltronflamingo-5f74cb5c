import 'isomorphic-fetch';

const getBooks = (baseApiUrl) => {
  const url = `${baseApiUrl}/books/`;
  return fetch(url);
};

const getPublishers = (baseApiUrl) => {
  const url = `${baseApiUrl}/publishers/`;
  return fetch(url);
};

export {
  getBooks,
  getPublishers
};
