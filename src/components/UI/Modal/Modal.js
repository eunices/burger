import React, { Component } from 'react';

import PropTypes from 'prop-types';

import classes from './Modal.module.css';

import Hux  from '../../../hoc/Hux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {

    // update only when visible is different
    return (nextProps.visible !== this.props.visible) || 
      (nextProps.children !== this.props.children);
    // or when spinner appears
  } 

  componentDidUpdate() {
    // console.log('[Modal] Updated');
  }

  render() {
    return(
      <Hux>
        
        <Backdrop 
          visible={this.props.visible} 
          modalClosed={this.props.modalClosed}
        />
  
        <div 
          className={classes.Modal}
          style={{
            transform: this.props.visible ? 'translateY(0)' : 'translateY(-100vH)',
            opacity: this.props.visible ? '1' : '0',
          }}
        >
          {this.props.children}
        </div> 
  
      </Hux>
    );
  }
};

Modal.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
  modalClosed: PropTypes.func,
};

export default Modal;