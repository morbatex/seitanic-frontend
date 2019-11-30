<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="(dish, index) in dishes" :key="index">
        <DishCard v-bind:dish="dish"></DishCard>
      </v-col>
    </v-row>
  </v-container>
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
