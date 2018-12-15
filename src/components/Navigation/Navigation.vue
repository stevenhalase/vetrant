<template>
  <div class="navigation">
    <div @click="goTo('feed')" class="logo">
      <Logo :height="'40px'" :width="'40px'"/>
      <div class="logo-name">VetRant</div>
    </div>
    <User v-if="user" />
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue';
import User from '@/components/User.vue';
import { mapState } from 'vuex';

export default {
  name: 'navigation',
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    goTo(to) {
      this.$router.push({ name: to });
    }
  },
  components: {
    Logo,
    User
  }
}
</script>

<style lang="scss" scoped>
.navigation {
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid #2d3436;
  padding: 0 15px;
  z-index: 200;

  .logo {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .logo-name {
      font-size: 24px;
      font-weight: bold;
      color: #2d3436;
    }
  }
}
</style>
