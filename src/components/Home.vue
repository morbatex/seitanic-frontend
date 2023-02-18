<template>
    <v-container flow>
      <v-btn v-on:click="filter = true" text>
        Filter
      </v-btn>
      <v-dialog v-model="filter" width="1200">
        <Query v-on:finalized-query="disableFilter" style="background: #303030"></Query>
      </v-dialog>
      <DishView></DishView>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import DishView from '@/components/DishView.vue';
import Query from '@/components/Query.vue';

export default Vue.extend({
  name: 'HomeComponent',
  components: {
    DishView,
    Query,
  },
  data: () => ({ filter: false }),
  methods: {
    disableFilter() {
      this.filter = false;
    },
  },
});
</script>
