<template>
  <div class="profile-recent-activity">
    <div class="profile-recent-activity-header">
      <span class="profile-recent-activity-header-title">Recent Activity</span>
    </div>
    <div class="profile-recent-activity-list">
      <div v-for="(item, ind) of sortedActivity" :key="ind" class="profile-recent-activity-list-item">
        <div v-if="isPost(item)" class="profile-recent-activity-list-item-content">{{ item.title }}</div>
        <div v-else class="profile-recent-activity-list-item-content">{{ item.content }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'profile-recent-activity',
  computed: {
    ...mapState({
      user: state => state.user,
      recentActivity: state => state.profile.recentActivity
    }),
    sortedActivity() {
      const recentActivity = Array.from(this.recentActivity);
      return recentActivity.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    }
  },
  beforeMount() {
    this.$store.dispatch('GET_RECENT_ACTIVITY', this.user._id);
  },
  methods: {
    isPost(item) {
      return !!item.channel;
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-recent-activity {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  .profile-recent-activity-header {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #f3f3f3;
    padding: 10px;

    .profile-recent-activity-header-title {
      font-weight: bold;
    }
  }
}
</style>
