import React from 'react';
import styles from './FilterBar.css';

const FilterBar = ({ onClickFilter }) => {
  return (
    <ul className={styles.nav}>
      <li className="books">
        <a onClick={() => onClickFilter('books')}>Books</a>
      </li>
      <li className="publishers">
        <a onClick={() => onClickFilter('publishers')}>Publishers</a>
      </li>
    </ul>
  );
};

export default FilterBar;
