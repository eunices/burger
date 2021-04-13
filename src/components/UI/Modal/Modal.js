import React from 'react';

import PropTypes from 'prop-types';

import classes from './Modal.module.css';

import Hux  from '../../../hoc/Hux';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
  return(
    <Hux>
      
      <Backdrop 
        visible={props.visible} 
        modalClosed={props.modalClosed}
      />

      <div 
        className={classes.Modal}
        style={{
          transform: props.visible ? 'translateY(0)' : 'translateY(-100vH)',
          opacity: props.visible ? '1' : '0',
        }}
      >
        {props.children}
      </div> 

    </Hux>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool,
  modalClosed: PropTypes.func,
};

export default Modal;