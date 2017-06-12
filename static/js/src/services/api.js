import 'isomorphic-fetch';

const getBooks = (baseApiUrl) => {
  const url = `${baseApiUrl}/books/`;
  return fetch(url);
};

const getBookDetail = (baseApiUrl, bookPk) => {
  const url = `${baseApiUrl}/books/${bookPk}`;
  return fetch(url);
}

const getPublishers = (baseApiUrl) => {
  const url = `${baseApiUrl}/publishers/`;
  return fetch(url);
};

const postRateBook = (baseApiUrl, bookPk, userPk, rating) => {
  const url = `${baseApiUrl}/ratings/`;
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      book: bookPk,
      user: userPk,
      rating: rating
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export {
  getBooks,
  getBookDetail,
  getPublishers,
  postRateBook
};
