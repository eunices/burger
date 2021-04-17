import React from 'react';

import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import classes from './NavigationItem.module.css';
import propTypes from 'prop-types';

const navigationItem = (props) => {
  return(
    <li className={classes.NavigationItem}>
      <NavLink 
        to={props.link}
        activeClassName={classes.active}
        exact={props.exact}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

navigationItem.propTypes = {
  link: PropTypes.string,
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
};

export default navigationItem;