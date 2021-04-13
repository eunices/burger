import React from 'react';

import PropTypes from 'prop-types';

import classes from './Logo.module.css';

import BurgerLogo from '../../assets/burger-logo.png';

const logo = (props) => {
  return(
    <div className={classes.Logo}>
      <img src={BurgerLogo}/>
    </div>
  );
};

logo.proptypes = {
  
};

export default logo;