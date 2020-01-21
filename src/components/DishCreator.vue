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
    <draggable v-model="ingredients" style="margin-bottom: 15px">
      <v-card v-for="(ingredient, index) in ingredients" v-bind:key="index*1" :hover=true style="cursor: ns-resize;">
        <v-row>
          <v-col>
            <v-text-field v-model="ingredient.name" prefix="Ingredient:" style="margin-top: -15px;margin-bottom: -15px;">
              <template slot="prepend">
                <v-icon>mdi-drag-horizontal</v-icon>
              </template>
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field min="0" v-model="ingredient.amount" prefix="Amount:" style="margin-top: -15px;margin-bottom: -15px;"></v-text-field>
          </v-col>
          <v-col v-if="index!==ingredients.length-1">
            <v-text-field v-model="ingredient.unit" prefix="Unit:" style="margin-top: -15px;margin-bottom: -15px;">
              <template slot="append">
                <v-icon v-on:click="deleteIngredient(index)">mdi-minus-box</v-icon>
              </template>
            </v-text-field>
          </v-col>
          <v-col v-if="index===ingredients.length-1">
            <v-text-field v-model="ingredient.unit" prefix="Unit:" style="margin-top: -15px;margin-bottom: -15px">
              <template slot="append">
                <v-icon v-on:click="addIngredient()">mdi-plus-box</v-icon>
                <v-icon v-on:click="deleteIngredient(index)">mdi-minus-box</v-icon>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-card>
    </draggable>
    <div style="margin-left: 50px; margin-bottom: 15px;" v-for="(namedIngredient, namedIngredientIndex) in namedIngredients" v-bind:key="namedIngredientIndex">
      <v-divider></v-divider>
      <v-text-field v-model="namedIngredient.name" prefix="Name:"></v-text-field>
      <draggable v-model="namedIngredient.ingredients">
        <v-card v-for="(ingredient, index) in namedIngredient.ingredients" v-bind:key="index*1" :hover=true style="cursor: ns-resize;">
          <v-row>
            <v-col>
              <v-text-field v-model="ingredient.name" prefix="Ingredient:" style="margin-top: -15px;margin-bottom: -15px;">
                <template slot="prepend">
                  <v-icon>mdi-drag-horizontal</v-icon>
                </template>
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field min="0" v-model="ingredient.amount" prefix="Amount:" style="margin-top: -15px;margin-bottom: -15px;"></v-text-field>
            </v-col>
            <v-col v-if="index!==namedIngredient.ingredients.length-1">
              <v-text-field v-model="ingredient.unit" prefix="Unit:" style="margin-top: -15px;margin-bottom: -15px;">
                <template slot="append">
                  <v-icon v-on:click="deleteNamedIngredient(namedIngredientIndex, index)">mdi-minus-box</v-icon>
                </template>
              </v-text-field>
            </v-col>
            <v-col v-if="index===namedIngredient.ingredients.length-1">
              <v-text-field v-model="ingredient.unit" prefix="Unit:" style="margin-top: -15px; margin-bottom: -15px;">
                <template slot="append">
                  <v-icon v-on:click="addNamedIngredient(namedIngredientIndex)">mdi-plus-box</v-icon>
                  <v-icon v-on:click="deleteNamedIngredient(namedIngredientIndex, index)">mdi-minus-box</v-icon>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </draggable>
      <v-btn v-on:click="deleteNamedIngredientGroup(namedIngredientIndex)" style="margin-top: 15px">Delete this Ingredient Group</v-btn>
    </div>
    <v-btn v-on:click="addNamedIngredientGroup()">Add Ingredient Group</v-btn>
    <v-container fluid>
      <h3>Instructions:</h3> (<a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">markdown</a> supported)
      <v-tabs v-model="tab">
        <v-tab>
          Edit
        </v-tab>
        <v-tab>
          Preview
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-textarea auto-grow v-model="instruction"></v-textarea>
        </v-tab-item>
        <v-tab-item>
          <VueMarkdown v-bind:source="instruction"></VueMarkdown>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
    <v-btn v-if="!edit" v-on:click="$emit('finalized-dish', finalizeDish())">Add Dish</v-btn>
    <v-btn v-if="edit" v-on:click="$emit('finalized-dish', finalizeDish())">Edit Dish</v-btn>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
// @ts-ignore
import VueMarkdown from 'vue-markdown-v2';
// @ts-ignore
import draggable from 'vuedraggable';

export default Vue.extend({
  data: () => {
    const ing = [{ name: '', amount: '', unit: '' }];
    const named: any[] = [];
    return {
      name: '', chefs: [], ingredients: ing, namedIngredients: named, instruction: '', tab: null,
    };
  },
  components: {
    VueMarkdown,
    draggable,
  },
  mounted() {
    this.name = this.dish.name;
    // @ts-ignore
    this.chefs = this.dish.chefs.map(x => x.name);
    this.ingredients = [...this.dish.ingredients];
    this.namedIngredients = [...this.dish.namedIngredients];
    this.instruction = this.dish.instruction;
  },
  methods: {
    addIngredient() {
      this.ingredients.push({ name: '', amount: '', unit: '' });
    },
    addNamedIngredient(index: number) {
      this.namedIngredients[index].ingredients.push({ name: '', amount: '', unit: '' });
    },
    addNamedIngredientGroup() {
      this.namedIngredients.push({ name: '', ingredients: [{ name: '', amount: '', unit: '' }] });
    },
    deleteIngredient(index: number) {
      this.ingredients.splice(index, 1);
    },
    deleteNamedIngredient(namedIndex: number, index: number) {
      this.namedIngredients[namedIndex].ingredients.splice(index, 1);
    },
    deleteNamedIngredientGroup(index: number) {
      this.namedIngredients.splice(index, 1);
    },
    finalizeDish(): string {
      const dish = JSON.stringify({
        name: this.name, chefs: this.chefs.map(chef => ({ name: chef })), ingredients: this.ingredients, namedIngredients: this.namedIngredients, instruction: this.instruction,
      });
      this.name = '';
      this.chefs = [];
      this.instruction = '';
      const ing = [{ name: '', amount: '', unit: '' }];
      this.ingredients = ing;
      this.namedIngredients = [];
      return dish;
    },
  },
  props: {
    dish: {
      type: Object,
      default: () => ({
        name: '', chefs: [], ingredients: [{ name: '', amount: '', unit: '' }], namedIngredients: [], instruction: '',
      }),
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
