<template>
  <div class="feed-item">
    <div class="feed-item-side-controls">
      <div class="feed-item-side-controls-like">
        <button class="btn btn-icon">
          <font-awesome-icon :icon="['fas', 'plus-circle']" class="feed-item-side-controls-like-icon"/>
        </button>
        <span class="feed-item-side-controls-like-count">{{ item.likes.length }}</span>
      </div>
      <div class="feed-item-side-controls-dislike">
        <button class="btn btn-icon">
          <font-awesome-icon :icon="['fas', 'minus-circle']" class="feed-item-side-controls-dislike-icon"/>
        </button>
        <span class="feed-item-side-controls-dislike-count">{{ item.dislikes.length }}</span>
      </div>
    </div>
    <div class="feed-item-container">
      <div class="feed-item-container-header">
        <div class="feed-item-container-header-user">
          <span :style="{ backgroundImage: `url(${item.user.image})` }" class="feed-item-container-header-user-image"></span>
          <span class="feed-item-container-header-user-name">{{ item.user.name }}</span>
        </div>
        <div class="feed-item-container-header-date">
          <timeago :datetime="item.date"></timeago>
        </div>
      </div>
      <div class="feed-item-container-content">
        <div class="feed-item-container-content-title">{{ item.title }}</div>
        <div v-if="item.image" :style="{ backgroundImage: `url(${item.image})` }" class="feed-item-container-content-image"></div>
        <div class="feed-item-container-content-content">{{ item.content }}</div>
      </div>
      <div class="feed-item-container-footer">
        <div class="feed-item-container-footer-controls">
          <button @click="toggleComments" class="btn btn-icon feed-item-container-footer-controls-comments">
            <font-awesome-icon :icon="['fas', 'comment']" class="feed-item-container-footer-controls-comments-icon"/>
            <span class="feed-item-container-footer-controls-comments-label">{{ commentsLinkText(item.comments.length) }}</span>
          </button>
        </div>
      </div>
      <div v-if="commentsOpen" class="feed-item-container-comments">
        <FeedItemComments :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import FeedItemComments from '@/components/Feed/FeedItemComments.vue';
import { mapState } from 'vuex';

export default {
  name: 'feed-item',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      commentsOpen: false
    };
  },
  methods: {
    commentsLinkText(count) {
      return count !== 1 ? `${count} Replies` : `${count} Reply`;
    },
    toggleComments() {
      this.commentsOpen = !this.commentsOpen;
    }
  },
  components: {
    FeedItemComments
  }
}
</script>

<style lang="scss" scoped>
.feed-item {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 5px 0;
  margin: 5px 0;
  border-bottom: 1px solid #dfe6e9;

  .feed-item-side-controls {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;

    .feed-item-side-controls-like {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 5px;

      .feed-item-side-controls-like-icon {
        font-size: 22px;
        margin-bottom: 5px;

        &:hover {
          cursor: pointer;
        }
      }
    }

    .feed-item-side-controls-dislike {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 5px;

      .feed-item-side-controls-dislike-icon {
        font-size: 22px;
        margin-bottom: 5px;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .feed-item-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;

    .feed-item-container-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .feed-item-container-header-user {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .feed-item-container-header-user-image {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 10px;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
        }

        .feed-item-container-header-user-name {
          font-weight: bold;
        }
      }
    }

    .feed-item-container-content {
      width: 100%;

      .feed-item-container-content-image {
          width: 100%;
          height: 200px;
          border-radius: 4px;
          margin-bottom: 10px;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
      }

      .feed-item-container-content-title {
         font-family: 'Roboto Condensed', sans-serif;
         font-weight: bold;
         font-size: 16px;
         padding: 10px 0;
      }
    }

    .feed-item-container-footer {
      width: 100%;

      .feed-item-container-footer-controls {
        padding: 10px 0;

        .feed-item-container-footer-controls-comments {

          .feed-item-container-footer-controls-comments-icon {
            margin-right: 5px;
          }

          .feed-item-container-footer-controls-comments-label {
            font-weight: bold;
          }

          &:hover {
            cursor: pointer;
          }
        }
      }
    }

    .feed-item-container-comments {
      width: 100%;
    }
  }
}
</style>
