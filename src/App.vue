<template>
  <div id="app">
    <Navigation />
    <router-view/>
    <div v-if="loading" class="loading-container">
      <div class="lds-ripple"><div></div><div></div></div>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation.vue';
import { mapState } from 'vuex';

export default {
  name: 'app',
  computed: {
    ...mapState({
      loading: state => state.loading
    })
  },
  beforeMount() {
    this.$store.dispatch('GET_LOCAL_USER')
      .then(response => {
        this.$router.push({ name: 'feed' });
      })
      .catch(error => {
        console.log(error);
      });
  },
  components: {
    Navigation
  }
}
</script>

<style lang="scss">
@import './style/global.scss';

#app {
  
  .loading-container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.3);
    z-index: 10000;
  }
}
</style>
