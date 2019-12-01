<template>
  <v-card v-on:click="overlay = true" :hover=true style="width: 250px" >
    <v-card-title style="word-break: break-word">{{ dish.name }} by
      <div v-for="(chef,index) in dish.chefs" v-bind:key="index">
        <div v-if="index !== dish.chefs.length - 1">&nbsp;{{ chef.name }} &amp;</div>
        <div v-if="index === dish.chefs.length - 1">&nbsp;{{ chef.name }}</div>
      </div>
    </v-card-title>
    <v-simple-table>
      <tbody>
        <tr v-for="(ingredient, index) in dish.ingredients" :key="index">
            <td v-if="index <=4">{{ ingredient.name }}</td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-dialog v-model="overlay" width="1200">
      <Dish style="background: #303030" v-bind:userType="userType" v-bind:dish="dish"></Dish>
    </v-dialog>
  </v-card>
</template>


<script lang="ts">
import Vue from 'vue';
import Dish from './Dish.vue';

export default Vue.extend({
  name: 'App',
  components: {
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
  props: ['dish', 'userType'],
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
