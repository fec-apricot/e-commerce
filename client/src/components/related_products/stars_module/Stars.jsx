import React from 'react';
// import styled from 'styled-components';
import Star from './SingleStar.jsx';
import styles from '../Related.module.css';

function Stars() {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((i) => (
        <li key={i} className={styles.starIcon}>
          <Star />
        </li>
      ))}
    </div>
  );
}

export default Stars;
