<template>
  <v-container>
    <h2 >{{ dish.name }} by
      <div style="display:inline-block" v-for="(chef,index) in dish.chefs" v-bind:key="'chef' + index">
        <p v-if="index !== dish.chefs.length - 1"><a v-on:click="filterChef(chef.name)" style="display: inline">{{ chef.name }}</a> &amp;&nbsp;</p>
        <a v-on:click="filterChef(chef.name)" style="display: inline" v-if="index === dish.chefs.length - 1">{{ chef.name }}</a>
      </div>
      <div style="display:inline-block" v-for="(tag, index) in dish.tags" v-bind:key="'tag' + index">
        <v-chip style="margin-left: 10px" v-on:click=filterTag(tag)>{{ tag }}</v-chip>
      </div>
      <v-btn v-if="userType !== 'UNKNOWN'" class="float-right" v-on:click="edit = true">Edit</v-btn>
    </h2>
    <Ingredient v-bind:ingredients="dish.ingredients" style="max-width: 500px;"></Ingredient>
    <div v-for="(namedIngredient, index) in dish.namedIngredients" v-bind:key="'ingredients' + index">
      <h3 class="mt-3">{{ namedIngredient.name }}</h3>
      <Ingredient v-bind:ingredients="namedIngredient.ingredients" style="max-width: 500px;"></Ingredient>
    </div>
    <h3 class="mt-3">Instructions:</h3>
    <VueMarkdown>{{ dish.instruction }}</VueMarkdown>
    <v-dialog v-model="edit" width="1200">
      <DishCreator style="background: #303030" v-bind:dish="dish" v-bind:edit="true" v-on:finalized-dish="closeEdit"></DishCreator>
    </v-dialog>
  </v-container>
</template>


<script lang="ts">
import Vue from 'vue';
// @ts-ignore
import VueMarkdown from 'vue-markdown-v2';
import { mapGetters, mapActions } from 'vuex';
import Ingredient from '@/components/Ingredient.vue';
import DishCreator from '@/components/DishCreator.vue';
import QueryModel from '@/models/QueryModel';

export default Vue.extend({
  name: 'App',
  components: {
    Ingredient,
    DishCreator,
    VueMarkdown,
  },
  computed: {
    ...mapGetters({
      userType: 'getUserType',
      query: 'getQuery',
    }),
  },
  data: () => ({
    edit: false,
  }),
  methods: {
    closeEdit() {
      this.edit = false;
    },
    filterTag(tag: string) {
      const tags = [...this.query.tags];
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
      this.updateDishes({ ...this.query, tags });
    },
    filterChef(chef: string) {
      this.updateDishes({ ...this.query, chef });
    },
    ...mapActions({
      updateDishes: 'updateDishes',
    }),
  },
  props: {
    dish: {
      type: Object,
      required: true,
    },
  },
});
</script>
