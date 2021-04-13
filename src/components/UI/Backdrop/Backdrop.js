import React from 'react';

import PropTypes from 'prop-types';

import classes from './Backdrop.module.css';


const Backdrop = (props) => {
  return(
    props.visible ? 
      <div className={classes.Backdrop} onClick={props.modalClosed}></div> 
      : 
      null
  );
};


Backdrop.propTypes  = {
  visible: PropTypes.bool,
  modalClosed: PropTypes.func,
};

export default Backdrop;