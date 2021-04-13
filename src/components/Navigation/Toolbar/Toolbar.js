import React from 'react';

import PropTypes from 'prop-types';

import classes from './Toolbar.module.css';

import Logo from '../../Logo/Logo';

const toolbar = (props) => {
  return(
    <header className={classes.Toolbar}>
      <div>MENU</div>
      <Logo/>
      <nav>
        ...
      </nav>
    </header>
  );
};

toolbar.propTypes = {
  
};

export default toolbar;