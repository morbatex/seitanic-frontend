<template>
  <v-simple-table>
    <tbody>
      <tr v-for="(ingredient,index) in ingredients" :key="index">
        <td class="ma-auto pa-auto">{{ ingredient.name }}</td>
        <td class="ma-auto pa-auto">{{ ingredient.amount }}</td>
        <td class="ma-auto pa-auto">{{ ingredient.unit }}</td>
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
      require: true,
    },
  },
});
</script>
