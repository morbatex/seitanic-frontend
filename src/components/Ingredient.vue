<template>
  <v-simple-table>
    <tbody>
      <tr v-for="(ingredient,index) in ingredients" :key="ingredient.name">
        <div v-if="index < (amount ? amount : ingredients.length)">
          <td class="ma-auto pa-auto">{{ ingredient.name }}</td>
          <td class="ma-auto pa-auto">{{ ingredient.amount }}</td>
          <td class="ma-auto pa-auto">{{ ingredient.unit }}</td>
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
      default: [],
    },
    amount:{
      type: Number,
      default: 0,
    },
  },
});
</script>
