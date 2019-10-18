<template>
  <v-layout  class="ma-2" wrap>
    <v-flex d-flex v-for="dish in dishes" v-bind:key="dish.name">
      <DishCard v-bind:dish="dish"></DishCard>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import DishCard from './DishCard.vue';

export default Vue.extend({
  name: 'App',
  components: {
    DishCard,
  },
  props: ['dishes'],
});
</script>
