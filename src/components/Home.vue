<template>
    <v-container flow>
      <h2>Dishes:</h2>
      <v-btn v-on:click="filter = true" text>
        Filter
      </v-btn>
      <v-dialog v-model="filter" width="1200">
        <Query style="background: #303030" v-bind:query="query" v-on:finalized-query="queryDishes"></Query>
      </v-dialog>
      <DishView v-bind:dishes="dishes"></DishView>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import DishView from './DishView.vue';
import Query from './Query.vue';

export default Vue.extend({
  components: {
    DishView,
    Query,
  },
  data: () => ({ dishes: [], filter: false }),
  created() {
    this.queryDishes(this.query);
  },
  methods: {
    // @ts-ignore
    queryDishes(query) {
      const self = this;
      this.filter = false;
      let queryString = '?';
      if (query) {
        if (typeof query.name === 'string' && query.name !== '') {
          queryString += `name=${query.name}&`;
        }
        if (typeof query.chef === 'string' && query.chef !== '') {
          queryString += `chef=${query.chef}&`;
        }
        if (Array.isArray(query.ingredients) && query.ingredients.length > 0) {
          queryString += `ingredients=${JSON.stringify(query.ingredients)}&`;
        } else if (typeof query.ingredients === 'string' && query.ingredients !== '') {
          queryString += `ingredients=["${query.ingredients}"]&`;
        }
        if (Array.isArray(query.exgredients) && query.exgredients.length > 0) {
          queryString += `exgredients=${JSON.stringify(query.exgredients)}&`;
        } else if (typeof query.exgredients === 'string' && query.exgredients !== '') {
          queryString += `exgredients=["${query.exgredients}"]&`;
        }
      }
      const path = this.$route.params.oid ? this.$route.params.oid : '';
      this.$router.push({
        path: `/${path}`,
        query: {
          name: query.name, chef: query.chef, ingredients: query.ingredients, exgredients: query.exgredients,
        },
      });
      fetch(`http://localhost:12345/dish${encodeURI(queryString)}`)
        .then(response => response.json())
        .then((myJson) => {
          self.dishes = myJson;
        });
    },
  },
  props: ['query'],
});
</script>
