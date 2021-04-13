import React from 'react';

import PropTypes from 'prop-types';

import classes from './NavigationItem.module.css';
import propTypes from 'prop-types';

const navigationItem = (props) => {
  return(
    <li className={classes.NavigationItem}>
      <a 
        href={props.link}
        className={props.active ? classes.active : null}
      >
        {props.children}
      </a>
    </li>
  );
};

navigationItem.propTypes = {
  link: PropTypes.string,
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
};

export default navigationItem;