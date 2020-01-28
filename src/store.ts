import Vue from 'vue';
import Vuex from 'vuex';
import Query from './models/Query';
import Dish from './models/Dish';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userType: 'UNKNOWN',
    dishes: <Dish[]>[],
    query: new Query(),
  },
  mutations: {
    updateDishes(state, dishes: Array<Dish>) {
      state.dishes = dishes;
    },
    updateUserType(state, userType: string) {
      state.userType = userType;
    },
    updateQuery(state, query: Query) {
      state.query = query;
    },
  },
  actions: {
    updateDishes(context) {
      const { query } = context.state;
      const queryString = `?name=${query.name}&chef=${query.chef}&ingredients=${JSON.stringify(query.ingredients)}&exgredients=${JSON.stringify(query.exgredients)}&categorie=${JSON.stringify(query.categories)}`;
      fetch(`${process.env.VUE_APP_API_URL}/dish${encodeURI(queryString)}`)
        .then(response => response.json())
        .then(dishes => context.commit('updateDishes', dishes));
    },
    updateUserType(context) {
      fetch(`${process.env.VUE_APP_API_URL}/user/me`, { credentials: 'include' })
        .then(response => response.json())
        .then(userType => context.commit('updateUserType', userType));
    },
    updateQuery(context, query: Query) {
      // TODO update url
      context.commit('updateQuery', query);
    },
  },
});
