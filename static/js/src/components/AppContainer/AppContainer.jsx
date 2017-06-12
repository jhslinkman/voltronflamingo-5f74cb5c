import React, {Component} from 'react';
import BookList from '../bookList/BookList';
import PublisherList from '../publisherList/PublisherList';
import FilterBar from '../filterBar/FilterBar';
import {getBooks} from '../../services/api';

export default class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      'showBooks': true,
      'books': [],
      'publishers': []
    };
    this.onClickFilter = this.onClickFilter.bind(this);
  }

  onClickFilter(filter) {
    this.setState({showBooks: filter === 'books'});
  }

  componentWillMount() {
    this.getBookData();
  }

  getBookData () {
    getBooks(this.props.baseApiUrl).then(response => {
      return response.json();
    }).then(data => {
      this.setState({'books': data});
    });
  }

  render() {
    return (
      <div>
        <FilterBar onClickFilter={this.onClickFilter} />
        {this.state.showBooks ? <BookList books={this.state.books}/> : <PublisherList publishers={this.state.publishers} />}
      </div>
    );
  }
}
