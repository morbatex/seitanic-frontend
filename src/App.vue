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
      <v-btn v-if="userType !== 'UNKNOWN'" v-on:click="dishDialog = true" text>
        <span class="mr-2">New Dish</span>
      </v-btn>
      <v-dialog v-if="userType !== 'UNKNOWN'" v-model="dishDialog" width="1200">
        <DishCreator v-on:finalized-dish="postDish" style="background: #303030"></DishCreator>
      </v-dialog>
    </v-app-bar>
    <v-content>
        <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Login from './components/Login.vue';
import DishCreator from './components/DishCreator.vue';

export default Vue.extend({
  name: 'App',
  components: {
    DishCreator,
    Login,
  },
  data: () => ({
    logDialog: false,
    dishDialog: false,
    userType: 'UNKNOWN',
  }),
  methods: {
    getUsertype() {
      const self = this;
      fetch('/api/user/me', {
        credentials: 'include',
      })
        .then(response => response.json())
        .then((userType) => {
          self.userType = userType;
        });
    },
    login(user: string) {
      fetch('/api/login', {
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
          this.getUsertype();
        });
    },
    postDish(dish: string) {
      fetch('/api/dish', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: dish,
      })
        .then(() => {
          this.dishDialog = false;
          window.location.reload();
        });
    },
  },
  created() {
    this.getUsertype();
  },
});
</script>
