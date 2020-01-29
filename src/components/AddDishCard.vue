<template>
  <v-card v-on:click="overlay = true" :hover=true style="width: 250px">
    <v-card-title>New Dish</v-card-title>
    <v-icon :size=244 >mdi-plus-thick</v-icon>
    <v-dialog v-model="overlay" width="1200">
      <DishCreator v-on:finalized-dish="disableOverlay" style="background: #303030"></DishCreator>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import DishCreator from '@/components/DishCreator.vue';

export default Vue.extend({
  name: 'App',
  components: {
    DishCreator,
  },
  methods: {
    disableOverlay() {
      this.overlay = false;
    },
  },
  data: () => ({
    overlay: false,
  }),
});
</script>
