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
    <v-content>
      <router-view v-bind:userType="userType"></router-view>
    </v-content>
    <v-footer>
      <p>Visit the Repository on <a href="https://github.com/morbatex/seitanic-cookbook" target="_blank">Github</a></p>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Login from './components/Login.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Login,
  },
  data: () => ({
    logDialog: false,
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
      fetch('/api:12345/login', {
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
  },
  created() {
    this.getUsertype();
  },
});
</script>
