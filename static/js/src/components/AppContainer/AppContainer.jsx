import React, {Component} from 'react';
import BookList from '../bookList/BookList';
import FilterBar from '../filterBar/FilterBar';
import {getBooks} from '../../services/api';

export default class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      'showBooks': true,
      'books': []
    };
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
        <FilterBar/>
        {this.state.showBooks && <BookList books={this.state.books}/>}
      </div>
    );
  }
}
