<template>
  <v-card v-on:click="overlay = true" :hover=true style="width: 250px">
    <v-card-title>New Dish</v-card-title>
    <v-icon :size=244 >mdi-plus-thick</v-icon>
    <v-dialog v-model="overlay" width="1200">
      <DishCreator v-on:finalized-dish="postDish" style="background: #303030"></DishCreator>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import DishCreator  from './DishCreator.vue';

export default Vue.extend({
  name: 'App',
  components: {
    DishCreator,
  },
  methods: {
    postDish(dish: string) {
      fetch(`/api/dish`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: dish,
      })
        .then(() => {
          window.location.reload();
        });
    },
  },
  data: () => ({
    overlay: false,
  }),
});
</script>
