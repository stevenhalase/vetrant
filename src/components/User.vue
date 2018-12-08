<template>
  <div @click="toggleUserDropdown"  class="user">
    <div class="user-image" :style="{ backgroundImage: `url(data:${user.image.type};base64,${user.image.data})` }"></div>
    <button class="btn btn-icon">
      <font-awesome-icon :icon="['fas', 'cog']" class="user-settings-icon"/>
    </button>
    <div v-if="userDropdownOpen" class="user-dropdown">
      <div @click="goTo('settings')" class="user-dropdown-item">
        Settings
      </div>
      <div @click="logout" class="user-dropdown-item">
        Logout
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'user',
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
      this.userDropdownOpen = false;
      this.$router.push({ name: to });
    },
    logout() {
      this.userDropdownOpen = false;
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
.user {
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .user-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    margin-right: 10px;
  }

  .user-settings-icon {
    font-size: 18px;
  }

  .user-dropdown {
    position: absolute;
    top: 60px;
    right: 5px;
    background-color: #fff;
    box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0);
    border-left: 2px solid #2d3436;

    .user-dropdown-item {
      padding: 10px 25px;

      &:hover {
        background-color: #f3f3f3;
      }
    }
  }

  &:hover {
    cursor: pointer;
  }
}
</style>
