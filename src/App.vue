<template>
  <div id="app" :class="{ dark: theme === 'Dark', light: theme === 'Light' }">
    <Navigation />
    <router-view/>
    <div v-if="loading" class="loading-container">
      <div class="lds-ripple"><div></div><div></div></div>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation.vue';
import themes from '@/themes';
import { mapState } from 'vuex';

export default {
  name: 'app',
  data() {
    return {
      themes
    };
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      theme: state => state.theme
    })
  },
  beforeMount() {
    this.$store.dispatch('GET_LOCAL_THEME');
    console.log(document.documentElement.style);
    this.$store.dispatch('GET_LOCAL_USER')
      .then(response => {
        this.$router.push({ name: 'feed' });
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    applyTheme() {
      if (this.theme === 'Light') {
        for (const property of themes.light) {

        }
      } else {

      }
    }
  },
  components: {
    Navigation
  }
}
</script>

<style lang="scss">
@import './styles/global.scss';

#app {
  background-color: $white;
  min-height: 100vh;
  
  .loading-container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $blackThird;
    z-index: 10000;
  }

  &.dark {
    background-color: $whiteDark;
    
    .loading-container {
      background-color: $blackThirdDark;
    }
  }
}
</style>
