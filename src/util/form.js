import React from 'react';
import Input from '../components/UI/Input/Input';


export function convertDictToArr (dict) {
  const formElementsArray = [];
  for (let key in dict) {
    formElementsArray.push({id: key, config: dict[key]});
  }
  return formElementsArray;
};

export function arrToInput(arr, inputChangedHandler) {
  return arr.map(el => {
    return(
      <Input
        key={el.id}
        elementType={el.config.elementType}
        elementConfig={el.config.elementConfig}
        value={el.config.value}
        invalid={!el.config.valid}
        shouldValidate={el.config.validation}
        touched={el.config.touched}
        changed={(event) => inputChangedHandler(event, el.id)}
      />
    );
  });
  
}

export function checkValidity(value, rules) {
  let isValid = true;

  if(rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if(rules.minLength) {
    isValid = value.length >=  rules.minLength && isValid;
  }

  return isValid;
}