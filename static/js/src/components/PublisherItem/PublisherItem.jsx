import React from 'react';
import PropTypes from '../PropTypes';
import styles from './PublisherItem.css';

const PublisherItem = props => {
  const {publisher} = props;

  return (
    <div className={styles.item}>
      <div className={`${styles.body}`}>
        <span className="t-publisher-title">{publisher.name}</span>
      </div>
    </div>
  );
};

PublisherItem.propTypes = {
  publisher: PropTypes.publisher
};

export default PublisherItem;
