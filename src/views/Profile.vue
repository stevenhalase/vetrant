<template>
  <div class="profile">
    <div class="profile-container">
      <ProfileHeader />
      <ProfileRecentActivity />
    </div>
  </div>
</template>

<script>
import ProfileHeader from '@/components/Profile/ProfileHeader.vue';
import ProfileRecentActivity from '@/components/Profile/ProfileRecentActivity.vue';
import { mapState } from 'vuex';

export default {
  name: 'profile',
  components: {
    ProfileHeader,
    ProfileRecentActivity
  }
}
</script>

<style lang="scss" scoped>
.profile {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .profile-container {
    width: 100%;
    max-width: 650px;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.dark {
  
}
</style>
