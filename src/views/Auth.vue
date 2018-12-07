<template>
  <div class="auth">
    <div class="auth-container">
      <input v-model="username" type="text" class="input auth-username-input" placeholder="Username"/>
      <input v-model="password" keydown.enter="login" type="password" class="input auth-password-input" placeholder="Password"/>
      <button @click="login" class="btn auth-submit-button">Login</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'auth',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      const username = this.username;
      const password = this.password;
      this.$store.dispatch('LOGIN', { username, password })
        .then(response => {
          this.$router.push({ name: 'feed' });
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.username = '';
          this.password = '';
        });
    }
  }
}
</script>

<style lang="scss">
.auth {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .auth-container {
    padding: 100px 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .input {
      margin-bottom: 10px;
    }

    .auth-submit-button {
      align-self: flex-end;
    }
  }
}
</style>
