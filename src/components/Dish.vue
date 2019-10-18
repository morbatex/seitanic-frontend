<template>
  <v-container>
    <h2 class="mb-3">{{ dish.name }} by
      <div style="display:inline" v-for="(chef,index) in dish.chefs" v-bind:key="index">
        <div style="display: inline" v-if="index !== dish.chefs.length - 1">&nbsp;{{ chef.name }} &amp;</div>
        <div style="display: inline" v-if="index === dish.chefs.length - 1">&nbsp;{{ chef.name }}</div>
      </div>
    </h2>
    <Ingredient v-bind:ingredients="dish.ingredients" style="max-width: 500px;"></Ingredient>
    <h3 class="mt-3">Instructions:</h3>
    <p>{{ dish.instruction }}</p>
  </v-container>
</template>


<script lang="ts">
import Vue from 'vue';
import Ingredient from './Ingredient.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Ingredient,
  },
  props: ['dish'],
});
</script>
