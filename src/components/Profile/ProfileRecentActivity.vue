<template>
  <div class="profile-recent-activity">
    <div class="profile-recent-activity-header">
      <span class="profile-recent-activity-header-title">Recent Activity</span>
    </div>
    <div class="profile-recent-activity-list">
      <div v-for="(item, ind) of sortedActivity" :key="ind" class="profile-recent-activity-list-item">
        <div v-if="isPost(item)" class="profile-recent-activity-list-item-type">
          <font-awesome-icon :icon="['far', 'list-alt']" class="profile-recent-activity-list-item-type-icon"/>
          <span class="profile-recent-activity-list-item-type-name">POST</span>
        </div>
        <div v-else class="profile-recent-activity-list-item-type">
          <font-awesome-icon :icon="['far', 'comment-alt']" class="profile-recent-activity-list-item-type-icon"/>
          <span class="profile-recent-activity-list-item-type-name">COMMENT</span>
        </div>
        <FeedItem v-if="isPost(item)" :item="item" />
        <FeedItemComment v-else :comment="item" />
      </div>
    </div>
  </div>
</template>

<script>
import FeedItem from '@/components/Feed/FeedItem.vue';
import FeedItemComment from '@/components/Feed/FeedItemComment.vue';
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
      return item.hasOwnProperty('channel');
    }
  },
  components: {
    FeedItem,
    FeedItemComment
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
    border-bottom: 1px solid $geyser;
    padding: 10px;

    .profile-recent-activity-header-title {
      font-weight: bold;
    }
  }

  .profile-recent-activity-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 15px;

    .profile-recent-activity-list-item {
      width: 100%;

      .profile-recent-activity-list-item-type {
        width: 100%;
        display: flex;
        padding: 10px;
        border-bottom: 1px solid $geyser;

        .profile-recent-activity-list-item-type-icon {
          margin-right: 10px;
          color: $dustyGray;
        }

        .profile-recent-activity-list-item-type-name {
          color: $dustyGray;
        }
      }
    }
  }
}

.dark {
  .profile-recent-activity {
    
    .profile-recent-activity-header {
      border-bottom: 1px solid $geyserDark;
    }

    .profile-recent-activity-list {
      .profile-recent-activity-list-item {
        .profile-recent-activity-list-item-type {
          border-bottom: 1px solid $geyserDark;

          .profile-recent-activity-list-item-type-icon {
            color: $dustyGrayDark;
          }

          .profile-recent-activity-list-item-type-name {
            color: $dustyGrayDark;
          }
        }
      }
    }
  }
}
</style>
