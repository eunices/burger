import React from 'react';

import classes from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {

  const authenticatedNavLinks = props.isAuthenticated ? 
    <React.Fragment>
      <NavigationItem link='/orders'>Orders</NavigationItem>
      <NavigationItem link='/logout'>Logout</NavigationItem>
    </React.Fragment> :
    <NavigationItem link='/auth'>Login/Signup</NavigationItem>;

  return(
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/' exact>Burger Builder</NavigationItem>
      
      {authenticatedNavLinks}
    </ul>
  );
};

export default navigationItems;