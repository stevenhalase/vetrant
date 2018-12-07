<template>
  <div class="feed-user">
    <div class="feed-user-image" :style="{ backgroundImage: `url(${user.image})` }"></div>
    <button class="btn btn-icon">
      <font-awesome-icon :icon="['fas', 'cog']" class="feed-user-settings-icon"/>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'feed-user',
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
}
</script>

<style lang="scss">
.feed-user {
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .feed-user-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    margin-right: 10px;
  }

  .feed-user-settings-icon {
    font-size: 18px;
  }
}
</style>
