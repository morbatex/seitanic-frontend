<template>
  <v-container fluid>
  <v-row>
    <v-col>
      <v-text-field v-model='name' prefix="Name:"></v-text-field>
    </v-col>
    <v-col>
      <v-combobox v-model='chefs' prefix="Chefs:" chips deletable-chips solo multiple ></v-combobox>
    </v-col>
  </v-row>
  <div v-for="(ingredient, index) in ingredients" v-bind:key="index">
    <v-row>
      <v-col>
        <v-text-field v-model="ingredient.name" prefix="Ingredient:"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field type="number" min="0" v-model="ingredient.amount" prefix="Amount:"></v-text-field>
      </v-col>
      <v-col v-if="index!==ingredients.length-1">
        <v-text-field v-model="ingredient.unit" prefix="Unit:"></v-text-field>
      </v-col>
      <v-col v-if="index===ingredients.length-1">
        <v-text-field v-model="ingredient.unit" prefix="Unit:" :append-icon="'mdi-plus-box'" v-on:click:append="addIngredient"></v-text-field>
      </v-col>
    </v-row>
  </div>
  <v-container fluid>
      <v-textarea auto-grow v-model="instructions" prefix="Instructions:"></v-textarea>
  </v-container>
    <v-btn v-on:click="$emit('finalized-dish', finalizeDish())">Add Dish</v-btn>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';


export default Vue.extend({
  data: () => {
    const ing = [{ name: '', amount: 0, unit: '' }];
    return {
      name: '', chefs: [], ingredients: ing, instructions: '',
    };
  },
  methods: {
    addIngredient() {
      this.ingredients.push({ name: '', amount: 0, unit: '' });
    },
    finalizeDish(): string {
      const ingredients = this.ingredients.map(ingredient => ({ name: ingredient.name, amount: Number(ingredient.amount), unit: ingredient.unit })).filter(ingredient => !Number.isNaN(ingredient.amount));
      const dish = JSON.stringify({
        name: this.name, chefs: this.chefs.map(chef => ({ name: chef })), ingredients: ingredients.filter(ingredient => !(ingredient.name === '' || ingredient.amount === 0 || ingredient.unit === '')), instruction: this.instructions,
      });
      this.name = '';
      this.chefs = [];
      this.instructions = '';
      const ing = [{ name: '', amount: 0, unit: '' }];
      this.ingredients = ing;
      return dish;
    },
  },
});
</script>
