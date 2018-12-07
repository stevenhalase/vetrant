<template>
  <div class="feed-user">
    <div class="feed-user-image" :style="{ backgroundImage: `url(data:${user.image.type};base64,${user.image.data})` }"></div>
    <button @click="toggleUserDropdown" class="btn btn-icon">
      <font-awesome-icon :icon="['fas', 'cog']" class="feed-user-settings-icon"/>
    </button>
    <div v-if="userDropdownOpen" class="feed-user-dropdown">
      <div @click="goTo('settings')" class="feed-user-dropdown-item">
        Settings
      </div>
      <div @click="logout" class="feed-user-dropdown-item">
        Logout
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'feed-user',
  data() {
    return {
      userDropdownOpen: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    toggleUserDropdown() {
      this.userDropdownOpen = !this.userDropdownOpen;
    },
    goTo(to) {
      this.$router.push({ name: to });
    },
    logout() {
      this.$store.dispatch('LOGOUT')
        .then(response => {
          this.$router.push({ name: 'auth' });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
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

  .feed-user-dropdown {
    position: absolute;
    top: 61px;
    right: 0px;
    background-color: #fff;
    box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0);
    border-left: 2px solid #2d3436;

    .feed-user-dropdown-item {
      padding: 10px 25px;

      &:hover {
        cursor: pointer;
        background-color: #f3f3f3;
      }
    }
  }
}
</style>
