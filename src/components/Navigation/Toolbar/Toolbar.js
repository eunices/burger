import React from 'react';

import PropTypes from 'prop-types';

import classes from './Toolbar.module.css';

import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import DrawerToggle from '../../Navigation/Sidedrawer/DrawerToggle/DrawerToggle';
import Logo from '../../Logo/Logo';

const toolbar = (props) => {

  return(
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.clicked}/>
      <div className={classes.Logo}><Logo /></div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuthenticated}/>
      </nav>
    </header>
  );
};

toolbar.propTypes = {
  isAuthenticated: PropTypes.bool,  
};

export default toolbar;