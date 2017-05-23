import React from 'react';
import styles from './FilterBar.css';

const FilterBar = () => {
  return (
    <ul className={styles.nav}>
      <li>Books</li>
      <li>Publishers</li>
    </ul>
  );
};

export default FilterBar;
