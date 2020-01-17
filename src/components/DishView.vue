<template>
  <v-container fluid>
    <v-row>
      <v-col v-if="userType !== 'UNKNOWN'">
        <AddDishCard ></AddDishCard>
      </v-col>
      <v-col v-for="(dish, index) in dishes" :key="index">
        <DishCard v-bind:userType="userType" v-bind:dish="dish"></DishCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import DishCard from './DishCard.vue';
import AddDishCard from './AddDishCard.vue';

export default Vue.extend({
  name: 'App',
  components: {
    DishCard,
    AddDishCard,
  },
  props: ['dishes', 'userType'],
});
</script>
