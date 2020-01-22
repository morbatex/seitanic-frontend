<template>
  <v-simple-table>
    <tbody>
      <tr v-for="(ingredient,index) in ingredients" :key="index">
        <div v-if="ingredient.name !== '' || ingredient.amount !== '' || ingredient.unit !== ''">
          <td v-if="index <= (amount ? amount : ingredients.length)" class="ma-auto pa-auto">{{ ingredient.name }}</td>
          <td v-if="index <= (amount ? amount : ingredients.length)" class="ma-auto pa-auto">{{ ingredient.amount }}</td>
          <td v-if="index <= (amount ? amount : ingredients.length)" class="ma-auto pa-auto">{{ ingredient.unit }}</td>
        </div>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    ingredients: {
      type: Array,
      default: () => ([]),
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
});
</script>
