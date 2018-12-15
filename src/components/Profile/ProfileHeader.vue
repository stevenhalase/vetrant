<template>
  <div class="profile-header">
    <div class="profile-header-avatar" :style="{ backgroundImage: `url(data:${user.image.type};base64,${user.image.data})` }"></div>
    <span class="profile-header-name">{{ username }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'profile-header',
  computed: {
    ...mapState({
      user: state => state.user
    }),
    username() {
      return this.user.name ? this.user.name : this.user.username;
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-header {
  width: 100%;
  min-height: 200px;
  padding: 25px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f3f3f3;

  .profile-header-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    margin-bottom: 10px;
  }

  .profile-header-name {
    font-weight: bold;
    font-size: 18px;
  }
}
</style>
