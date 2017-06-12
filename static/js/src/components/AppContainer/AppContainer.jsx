import React, {Component} from 'react';
import BookList from '../bookList/BookList';
import PublisherList from '../publisherList/PublisherList';
import FilterBar from '../filterBar/FilterBar';
import { getBookDetail, getBooks, getPublishers, postRateBook } from '../../services/api';

export default class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      'showBooks': true,
      'books': [],
      'publishers': []
    };
    this.onClickFilter = this.onClickFilter.bind(this);
    this.rateBook = this.rateBook.bind(this);
  }

  onClickFilter(filter) {
    this.setState({showBooks: filter === 'books'});
  }

  componentWillMount() {
    this.getBookData();
    this.getPublisherData();
  }

  getBookData () {
    getBooks(this.props.baseApiUrl).then(response => {
      return response.json();
    }).then(data => {
      this.setState({'books': data});
    });
  }

  getPublisherData() {
    getPublishers(this.props.baseApiUrl)
      .then(response => response.json())
      .then(data => {
        this.setState({'publishers': data});
      });
  }

  rateBook(bookPk, rating) {
    postRateBook(this.props.baseApiUrl, bookPk, this.props.userPk, rating)
      .then(() => {
        return getBookDetail(this.props.baseApiUrl, bookPk)
      })
      .then(response => response.json())
      .then(book => {
        const books = this.state.books.slice();
        const bookInd = books.map(b => b.pk).indexOf(bookPk);
        book.rated = true;
        books[bookInd] = book;
        this.setState({books: books});
      });
  }

  render() {
    return (
      <div>
        <FilterBar onClickFilter={this.onClickFilter} />
        {this.state.showBooks ? <BookList books={this.state.books} rateBook={this.rateBook}/> : <PublisherList publishers={this.state.publishers} />}
      </div>
    );
  }
}
