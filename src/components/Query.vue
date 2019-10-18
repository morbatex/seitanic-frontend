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
      <v-btn v-on:click="$emit('finalized-query', finalizeQuery())">Find
      </v-btn>
    </v-col>
  </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';


export default Vue.extend({
  data: () => {
    const ingr: string[] = [];
    const exgr: string[] = [];
    return {
      name: '', chef: '', ingredients: ingr, exgredients: exgr,
    };
  },
  created() {
    if (this.query) {
      if (typeof this.query.name === 'string') {
        this.name = this.query.name;
      }
      if (typeof this.query.chef === 'string') {
        this.chef = this.query.chef;
      }
      if (Array.isArray(this.query.ingredients)) {
        this.ingredients = this.query.ingredients;
      } else if (typeof this.query.ingredients === 'string') {
        this.ingredients.push(this.query.ingredients);
      }
      if (Array.isArray(this.query.exgredients)) {
        this.exgredients = this.query.exgredients;
      } else if (typeof this.query.exgredients === 'string') {
        this.exgredients.push(this.query.exgredients);
      }
    }
  },
  methods: {
    remove_ingredient(item: string) {
      this.ingredients.splice(this.ingredients.indexOf(item), 1);
    },
    remove_exgredient(item: string) {
      this.exgredients.splice(this.exgredients.indexOf(item), 1);
    },
    finalizeQuery(): Object {
      return {
        name: this.name, chef: this.chef, ingredients: this.ingredients, exgredients: this.exgredients,
      };
    },
  },
  props: {
    query: Object,
  },
});
</script>
