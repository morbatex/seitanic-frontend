<template>
  <v-container>
    <h2 >{{ dish.name }} by
      <div style="display:inline-block" v-for="(chef,index) in dish.chefs" v-bind:key="index">
        <p v-if="index !== dish.chefs.length - 1"><a v-bind:href="'/?chef='+chef.name" style="display: inline">{{ chef.name }}</a> &amp;&nbsp;</p>
        <a v-bind:href="'/?chef='+chef.name" style="display: inline" v-if="index === dish.chefs.length - 1">{{ chef.name }}</a>
      </div>
      <v-btn v-if="userType !== 'UNKNOWN'" class="float-right" v-on:click="edit = true">Edit</v-btn>
    </h2>
    <Ingredient v-bind:ingredients="dish.ingredients" style="max-width: 500px;"></Ingredient>
    <div v-for="(namedIngredient, index) in dish.namedIngredients" v-bind:key="index">
        <h3 class="mt-3">{{ namedIngredient.name }}</h3>
        <Ingredient v-bind:ingredients="namedIngredient.ingredients" style="max-width: 500px;"></Ingredient>
    </div>
    <h3 class="mt-3">Instructions:</h3>
    <VueMarkdown>{{ dish.instruction }}</VueMarkdown>
    <v-dialog v-model="edit" width="1200">
      <DishCreator style="background: #303030" v-bind:dish="dish" v-bind:edit="true" v-on:finalized-dish="putDish"></DishCreator>
    </v-dialog>
  </v-container>
</template>


<script lang="ts">
import Vue from 'vue';
// @ts-ignore
import VueMarkdown from 'vue-markdown-v2';
import Ingredient from './Ingredient.vue';
import DishCreator from './DishCreator.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Ingredient,
    DishCreator,
    VueMarkdown,
  },
  methods: {
    putDish(dish: string, id: string) {
      // eslint-disable-next-line no-underscore-dangle
      fetch(`${process.env.VUE_APP_API_URL}/dish/${this.dish._id.$oid}`, {
        method: 'PUT',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: dish,
      })
        .then(() => {
          this.edit = false;
          window.location.reload();
        });
    },
  },
  data: () => ({
    edit: false,
  }),
  props: ['dish', 'userType'],
});
</script>
