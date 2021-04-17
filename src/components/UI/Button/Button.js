import React from 'react';

import PropTypes from 'prop-types';

import classes from './Button.module.css';

const button = (props) => {

  return(
    <button 
      className={[classes.Button, classes[props.buttontype]].join(' ')} 
      {...props}
    >
      {props.children}
    </button>
  );
};

button.propTypes = {
  clicked: PropTypes.func,
  children: PropTypes.node.isRequired,
  buttontype: PropTypes.string,
};

export default button;