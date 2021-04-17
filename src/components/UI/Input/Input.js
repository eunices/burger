import React from 'react';

import classes from './Input.module.css';


const input = (props) => {
  let inputEl = null;
  const inputClasses = [classes.InputEl];
  
  if(props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch(props.elementType) {
    
  case('input'):
    inputEl = <input 
      className={inputClasses.join(' ')} 
      value={props.value}
      {...props.elementConfig}
      onChange={props.changed}
    />;
    break;

  case('textArea'):
    inputEl = <textarea 
      className={inputClasses.join(' ')}
      value={props.value}
      {...props.elementConfig}
      onChange={props.changed}
    />;
    break;

  case('select'):
    inputEl = (
      <select
        className={inputClasses.join(' ')}
        value={props.value}
        onChange={props.changed}
      >
        {props.elementConfig.options.map(option => {
          return(
            <option value={option.value} key={option.value}>
              {option.displayValue}
            </option>
          );
        })}
      </select>);
    break;

  default:
    inputEl = <input 
      className={inputClasses.join(' ')}
      value={props.value}
      {...props.elementConfig}
      onChange={props.changed}
    />;
  }

  return(
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputEl}
    </div>
  );
};

export default input;