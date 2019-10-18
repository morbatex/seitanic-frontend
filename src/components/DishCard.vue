<template>
  <v-card v-on:click="overlay = true" class="mt-2 pa-auto" style="width: 250px" >
    <v-card-title>{{ dish.name }} by
      <div v-for="(chef,index) in dish.chefs" v-bind:key="index">
        <div v-if="index !== dish.chefs.length - 1">&nbsp;{{ chef.name }} &amp;</div>
        <div v-if="index === dish.chefs.length - 1">&nbsp;{{ chef.name }}</div>
      </div>
    </v-card-title>
    <Ingredient v-bind:ingredients="dish.ingredients"></Ingredient>
    <v-dialog v-model="overlay" width="1200">
        <Dish style="background: #303030" v-bind:dish="dish"></Dish>
    </v-dialog>
  </v-card>
</template>


<script lang="ts">
import Vue from 'vue';
import Ingredient from './Ingredient.vue';
import Dish from './Dish.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Ingredient,
    Dish,
  },
  created() {
    if (this.$route.params.oid === this.dish._id.$oid) {
      this.overlay = true;
    }
  },
  data: () => ({
    overlay: false,
  }),
  props: ['dish'],
  watch: {
    overlay() {
      if (this.overlay) {
        this.$router.push({ path: `/${this.dish._id.$oid}`, query: this.$route.query });
      } else {
        this.$router.push({ path: '/', query: this.$route.query });
      }
    },
  },
});
</script>
