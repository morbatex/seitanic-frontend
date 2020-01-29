import Vue from 'vue';
import Vuex from 'vuex';
import { Route } from 'vue-router';
import QueryModel from '@/models/QueryModel';
import DishModel from '@/models/DishModel';
import router from '@/router';

Vue.use(Vuex);

interface MyState {
    userType: string;
    dishes: Array<DishModel>;
    query: QueryModel;
    route?: Route;
}

export default new Vuex.Store<MyState>({
  state: {
    userType: 'UNKNOWN',
    dishes: [],
    query: new QueryModel(),
    route: undefined,
  },
  getters: {
    getUserType: state => state.userType,
    getDishes: state => state.dishes,
    getQuery: state => state.query,
    getRoute: state => state.route,
  },
  mutations: {
    updateDishes(state, dishes: Array<DishModel>) {
      state.dishes = dishes;
    },
    updateUserType(state, userType: string) {
      state.userType = userType;
    },
    updateQuery(state, query: QueryModel) {
      state.query = query;
    },
  },
  actions: {
    updateDishes(context, query : QueryModel) {
      let path;
      if (!context.state.route || !context.state.route.params.oid) {
        path = '';
      } else {
        path = context.state.route.params.oid;
      }
      router.push({
        path: `/${path}`,
        query: {
          name: query.name !== '' ? query.name : undefined,
          chef: query.chef !== '' ? query.chef : undefined,
          ingredients: query.ingredients.length > 0 ? JSON.stringify(query.ingredients) : undefined,
          exgredients: query.exgredients.length > 0 ? JSON.stringify(query.exgredients) : undefined,
        },
      });
      context.commit('updateQuery', query);
      let queryString = '?';
      queryString = queryString.concat(query.name === '' ? '' : `name=${query.name}&`);
      queryString = queryString.concat(query.chef === '' ? '' : `chef=${query.chef}&`);
      queryString = queryString.concat(query.ingredients.length === 0 ? '' : `ingredients=${JSON.stringify(query.ingredients)}&`);
      queryString = queryString.concat(query.exgredients.length === 0 ? '' : `exgredients=${JSON.stringify(query.exgredients)}&`);
      queryString = queryString.concat(query.categories.length === 0 ? '' : `categories=${JSON.stringify(query.categories)}`);
      fetch(`${process.env.VUE_APP_API_URL}/dish${encodeURI(queryString)}`)
        .then(response => response.json())
        .then(dishes => context.commit('updateDishes', dishes));
    },
    updateUserType(context) {
      fetch(`${process.env.VUE_APP_API_URL}/user/me`, { credentials: 'include' })
        .then(response => response.json())
        .then(userType => context.commit('updateUserType', userType));
    },
  },
});
