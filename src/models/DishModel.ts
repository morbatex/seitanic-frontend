import IngredientModel from '@/models/IngredientModel';
import NamedIngredientModel from '@/models/NamedIngredientModel';

export default class DishModel {
  name = '';
  chefs: Array<String> = [];
  ingredients: Array<IngredientModel> = [];
  namedIngredients: Array<NamedIngredientModel> = [];
  instruction = '';
  categories: Array<String> = [];
  _id = { $oid: '' };
}
