import { INGREDIENT_PRICES } from './constants';

export function sumTotalPrice(ingredients) {
  return Object.keys(ingredients)
    .map(ingredient => {
      return ingredients[ingredient] * INGREDIENT_PRICES[ingredient];
    })
    .reduce((sum, value) => {
      return sum + value;
    }, INGREDIENT_PRICES['base']);
}

export function sumTotalIngredients(ingredients) {
  return Object.keys(ingredients)
    .map(ingredient => {
      return ingredients[ingredient];
    })
    .reduce((sum, value) => {
      return sum + value;
    }, 0);
}
