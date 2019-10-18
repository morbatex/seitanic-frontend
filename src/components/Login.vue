<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-text-field v-model='username' prefix="Username:"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field type="password" v-on:keyup.enter="$emit('finalized-login', finalizeLogin())"
            v-model='password' prefix="Password:">
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
        <v-btn style="margin-left:10px" v-on:click="$emit('finalized-login', finalizeLogin())">Login</v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';


export default Vue.extend({
  data: () => ({ username: '', password: '' }),
  methods: {
    finalizeLogin(): string {
      const ret = `{ "name": "${this.username}", "password": "${this.password}" }`;
      this.username = '';
      this.password = '';
      return ret;
    },
  },
});
</script>
