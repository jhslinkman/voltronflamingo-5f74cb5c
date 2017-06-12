import React from 'react';
import PropTypes from '../PropTypes';
import styles from './PublisherItem.css';

const PublisherItem = props => {
  const {publisher} = props;

  return (
    <div className={styles.item}>
      <div className={styles.cover}>
        <img className="t-publisher-cover" src={`https://placeimg.com/150/200/nature?id=${publisher.pk}`}/>
      </div>
      <div className={`${styles.body}`}>
        <span className="t-publisher-title">{publisher.title}</span>
        <p className="t-publisher-description">{publisher.description}</p>
      </div>
    </div>
  );
};

PublisherItem.propTypes = {
  publisher: PropTypes.publisher
};

export default PublisherItem;
