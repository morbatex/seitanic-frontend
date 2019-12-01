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
        <v-text-field min="0" v-model="ingredient.amount" prefix="Amount:"></v-text-field>
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
      <v-textarea auto-grow v-model="instruction" prefix="Instructions:"></v-textarea>
  </v-container>
    <v-btn v-if="!edit" v-on:click="$emit('finalized-dish', finalizeDish())">Add Dish</v-btn>
    <v-btn v-if="edit" v-on:click="$emit('finalized-dish', finalizeDish())">Edit Dish</v-btn>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';


export default Vue.extend({
  data: () => {
    const ing = [{ name: '', amount: '', unit: '' }];
    return {
      name: '', chefs: [], ingredients: ing, instruction: '',
    };
  },
  mounted() {
    this.name = this.dish.name;
    // @ts-ignore
    this.chefs = this.dish.chefs.map(x => x.name);
    this.ingredients = this.dish.ingredients;
    this.instruction = this.dish.instruction;
  },
  methods: {
    addIngredient() {
      this.ingredients.push({ name: '', amount: '', unit: '' });
    },
    finalizeDish(): string {
      const dish = JSON.stringify({
        name: this.name, chefs: this.chefs.map(chef => ({ name: chef })), ingredients: this.ingredients.filter(ingredient => !(ingredient.name === '' || ingredient.amount === '' || ingredient.unit === '')), instruction: this.instruction,
      });
      this.name = '';
      this.chefs = [];
      this.instruction = '';
      const ing = [{ name: '', amount: '', unit: '' }];
      this.ingredients = ing;
      return dish;
    },
  },
  props: {
    dish: {
      type: Object,
      default: () => ({
        name: '', chefs: [], ingredients: [{ name: '', amount: '', unit: '' }], instruction: '',
      }),
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
