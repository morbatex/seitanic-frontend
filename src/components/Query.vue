<template>
  <v-container fluid>
  <v-row>
    <v-col>
      <v-text-field v-model='name' prefix="Name:"></v-text-field>
    </v-col>
    <v-col>
      <v-text-field v-model='chef' prefix="Chef:"></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-combobox v-model="ingredients"
          prefix="Ingredients:" clearable chips deletable-chips multiple solo>
      </v-combobox>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-combobox v-model="exgredients"
          prefix="Excluded ingredients:" clearable chips deletable-chips multiple solo>
      </v-combobox>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-combobox v-model="tags"
          prefix="Tags:" clearable chips deletable-chips multiple solo>
      </v-combobox>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-btn v-on:click="$emit('finalized-query', finalizeQuery())">Find
      </v-btn>
    </v-col>
  </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import QueryModel from '@/models/QueryModel';

export default Vue.extend({
  name: 'QueryComponent',
  data: () => {
    const ingr: string[] = [];
    const exgr: string[] = [];
    const tags: string[] = [];
    return {
      name: '', chef: '', ingredients: ingr, exgredients: exgr, tags,
    };
  },
  computed: {
    ...mapGetters({
      query: 'getQuery',
    }),
  },
  created() {
    this.name = this.query.name;
    this.chef = this.query.chef;
    this.ingredients = [...this.query.ingredients];
    this.exgredients = [...this.query.exgredients];
    this.tags = [...this.query.tags];
  },
  methods: {
    remove_ingredient(item: string) {
      this.ingredients.splice(this.ingredients.indexOf(item), 1);
    },
    remove_exgredient(item: string) {
      this.exgredients.splice(this.exgredients.indexOf(item), 1);
    },
    finalizeQuery() {
      const q = new QueryModel();
      q.name = this.name;
      q.chef = this.chef;
      q.ingredients = this.ingredients;
      q.exgredients = this.exgredients;
      q.tags = this.tags;
      this.updateDishes(q);
    },
    ...mapActions({
      updateDishes: 'updateDishes',
    }),
  },
});
</script>
