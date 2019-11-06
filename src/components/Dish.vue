<template>
  <v-container>
    <h2 class="mb-3">{{ dish.name }} by
      <div style="display:inline-block" v-for="(chef,index) in dish.chefs" v-bind:key="index">
        <p v-if="index !== dish.chefs.length - 1"><a v-bind:href="'/?chef='+chef.name" style="display: inline">{{ chef.name }}</a> &amp;&nbsp;</p> 
        <a v-bind:href="'/?chef='+chef.name" style="display: inline" v-if="index === dish.chefs.length - 1">{{ chef.name }}</a>
      </div>
    </h2>
    <Ingredient v-bind:ingredients="dish.ingredients" style="max-width: 500px;"></Ingredient>
    <h3 class="mt-3">Instructions:</h3>
    <p style="white-space: pre-line">{{ dish.instruction }}</p>
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
