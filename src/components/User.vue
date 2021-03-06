<template>
  <div class="user">
    <div @click="toggleUserDropdown" class="user-container">
      <div class="user-image" :style="{ backgroundImage: `url(data:${user.image.type};base64,${user.image.data})` }"></div>
      <button class="btn btn-icon">
        <font-awesome-icon :icon="['fas', 'cog']" class="user-settings-icon"/>
      </button>
    </div>
    <div v-if="userDropdownOpen" class="user-dropdown">
      <div @click="goTo('profile')" class="user-dropdown-item">
        Your Profile
      </div>
      <div @click="goTo('settings')" class="user-dropdown-item">
        Settings
      </div>
      <div @click="toggleTheme" class="user-dropdown-item">
        <div class="theme-toggle">
          <span>Theme:</span>
          <span>{{ theme }}</span>
        </div>
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
      user: state => state.user,
      theme: state => state.theme
    })
  },
  methods: {
    toggleUserDropdown(val) {
      this.userDropdownOpen = val && typeof val === 'boolean' ? val : !this.userDropdownOpen;
    },
    goTo(to) {
      console.log(this.userDropdownOpen);
      this.toggleUserDropdown(false);
      console.log(this.userDropdownOpen);
      this.$router.push({ name: to });
    },
    logout() {
      console.log(this.userDropdownOpen);
      this.userDropdownOpen = false;
      console.log(this.userDropdownOpen);
      this.$store.dispatch('LOGOUT')
        .then(response => {
          this.$router.push({ name: 'auth' });
        })
        .catch(error => {
          console.log(error);
        });
    },
    toggleTheme() {
      const newTheme = this.theme === 'Light' ? 'Dark' : 'Light';
      this.$store.commit('SET_THEME', newTheme);
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

  .user-container {
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
  }

  .user-dropdown {
    position: absolute;
    top: 60px;
    right: 5px;
    background-color: $white;
    box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0);
    border-left: 2px solid $outerSpace;

    .user-dropdown-item {
      padding: 10px 25px;

      .theme-toggle {
        span:first-child {
          margin-right: 5px;
        }
      }

      &:hover {
        background-color: $concrete;
      }
    }
  }

  &:hover {
    cursor: pointer;
  }
}

.dark {
  .user {
    .user-dropdown {
      background-color: $whiteDark;
      box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0);
      border-left: 2px solid $outerSpaceDark;

      .user-dropdown-item {
        &:hover {
          background-color: $concreteDark;
        }
      }
    }
  }
}
</style>
