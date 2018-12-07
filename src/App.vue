<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'app',
  beforeMount() {
    this.$store.dispatch('GET_LOCAL_USER')
      .then(response => {
        this.$router.push({ name: 'feed' });
      })
      .catch(error => {
        console.log(error);
      });
  }
}
</script>

<style lang="scss">
@import './style/global.scss';

#app {
  
}
</style>
