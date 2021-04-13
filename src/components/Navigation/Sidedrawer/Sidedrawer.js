import React from 'react';

import PropTypes from 'prop-types';

import classes from './Sidedrawer.module.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Hux from '../../../hoc/Hux';

const sidedrawer = (props) => {

  let sideDrawerClasses = [classes.Sidedrawer, classes.Close];
  if (props.visible) {
    sideDrawerClasses = [classes.Sidedrawer, classes.Open];
  } else {
    sideDrawerClasses = [classes.Sidedrawer, classes.Close];
  }

  return(
    <Hux>
      <Backdrop 
        className={classes.Backdrop}
        visible={props.visible} 
        modalClosed={props.closed}
      />
      <div className={sideDrawerClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems/>
        </nav>
      </div>
    </Hux>
  );
};

sidedrawer.propTypes = {
  visible: PropTypes.bool,
  closed: PropTypes.func,
};

export default sidedrawer;