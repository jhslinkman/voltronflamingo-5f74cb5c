import 'isomorphic-fetch';

const getBooks = (baseApiUrl) => {
  const url = `${baseApiUrl}/books/`;
  return fetch(url);
};

export {
  getBooks
};
