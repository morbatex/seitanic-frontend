import IngredientModel from '@/models/IngredientModel';

export default class NamedIngredientModel {
  name = '';
  ingredients: Array<IngredientModel> = [];
}
