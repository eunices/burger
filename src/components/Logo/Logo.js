import React from 'react';

import PropTypes from 'prop-types';

import classes from './Logo.module.css';

import BurgerLogo from '../../assets/burger-logo.png';

const logo = (props) => {
  return(
    <div className={classes.Logo} style={{height: props.height}}>
      <img src={BurgerLogo}/>
    </div>
  );
};

logo.proptypes = {
  height: PropTypes.string,
};

export default logo;