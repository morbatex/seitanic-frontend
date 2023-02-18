<template>
  <v-app>
   <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Seitanic Cookbook</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="userType === 'UNKNOWN'" v-on:click="logDialog = true" text>
        <span class="mr-2">Login</span>
      </v-btn>
      <v-dialog v-if="userType === 'UNKNOWN'" v-model="logDialog" width="500">
        <Login v-on:finalized-login="login" style="background: #303030"></Login>
      </v-dialog>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer>
      <p>Visit the Repository on <a href="https://github.com/morbatex/seitanic-frontend" target="_blank">Github</a></p>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import Login from '@/components/Login.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Login,
  },
  computed: {
    ...mapGetters({
      userType: 'getUserType',
      route: 'getRoute',
    }),
  },
  data: () => ({
    logDialog: false,
  }),
  methods: {
    login(user: string) {
      fetch(`${process.env.VUE_APP_API_URL}/login`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: user,
      })
        .then(() => {
          this.logDialog = false;
          this.getUserType();
        });
    },
    ...mapActions({
      getUserType: 'updateUserType',
      getDishes: 'updateDishes',
    }),
  },
  created() {
    this.getUserType();
    const { query } = this.route;
    this.getDishes({
      name: query.name ? query.name : '',
      chef: query.chef ? query.chef : '',
      ingredients: query.ingredients ? JSON.parse(query.ingredients) : [],
      exgredients: query.exgredients ? JSON.parse(query.exgredients) : [],
      tags: query.tags ? JSON.parse(query.tags) : [],
    });
  },
});
</script>
