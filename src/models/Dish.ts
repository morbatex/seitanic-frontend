import Ingredient from './Ingredient';
import NamedIngredient from './NamedIngredient';

export default class Dish {
  name = '';
  chef: Array<String> = [];
  ingredients: Array<Ingredient> = [];
  namedIngredients: Array<NamedIngredient> = [];
  instruction = '';
  categories: Array<String> = [];
}
