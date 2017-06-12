import React from 'react';
import PropTypes from '../PropTypes';
import PublisherItem from '../PublisherItem/PublisherItem';
import styles from './PublisherList.css';

const PublisherList = props => {
  const {publishers} = props;

  return (
    <div className="content">
      <h1>Publishers</h1>
      <ol className={styles.list}>
        {publishers.map(publisher =>
          <li key={publisher.pk}><PublisherItem publisher={publisher} /></li>
        )}
      </ol>
    </div>
  );
};

PublisherList.propTypes = {
  publishers: PropTypes.publisherList
};

export default PublisherList;
