<template>
  <v-container>
    <h2 >{{ dish.name }} by
      <div style="display:inline-block" v-for="(chef,index) in dish.chefs" v-bind:key="index">
        <p v-if="index !== dish.chefs.length - 1"><a v-bind:href="'/?chef='+chef.name" style="display: inline">{{ chef.name }}</a> &amp;&nbsp;</p>
        <a v-bind:href="'/?chef='+chef.name" style="display: inline" v-if="index === dish.chefs.length - 1">{{ chef.name }}</a>
      </div>
      <v-btn class="float-right" v-on:click="edit = true">Edit</v-btn>
    </h2>
    <Ingredient v-bind:ingredients="dish.ingredients" style="max-width: 500px;"></Ingredient>
    <h3 class="mt-3">Instructions:</h3>
    <p style="white-space: pre-line">{{ dish.instruction }}</p>
    <v-dialog v-model="edit" width="1200">
      <DishCreator style="background: #303030" v-bind:dish="dish" v-on:finalized-dish="postDish"></DishCreator>
    </v-dialog>
  </v-container>
</template>


<script lang="ts">
import Vue from 'vue';
import Ingredient from './Ingredient.vue';
import DishCreator from './DishCreator.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Ingredient,
    DishCreator,
  },
  methods: {
    postDish(dish: string, id: string) {
      fetch(`/api/dish/${this.dish._id.$oid}`, {
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
  props: ['dish'],
});
</script>
