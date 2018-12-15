<template>
  <div class="feed-item">
    <div class="feed-item-side-controls">
      <div class="feed-item-side-controls-like">
        <button @click="like" class="btn btn-icon" :class="{ 'btn-icon-success': liked }" :disabled="liked">
          <font-awesome-icon :icon="['fas', 'plus-circle']" class="feed-item-side-controls-like-icon"/>
        </button>
        <span class="feed-item-side-controls-like-count">{{ numLikes }}</span>
      </div>
      <div class="feed-item-side-controls-dislike">
        <button @click="dislike" class="btn btn-icon" :class="{ 'btn-icon-success': disliked }" :disabled="disliked">
          <font-awesome-icon :icon="['fas', 'minus-circle']" class="feed-item-side-controls-dislike-icon"/>
        </button>
        <span class="feed-item-side-controls-dislike-count">{{ numDislikes }}</span>
      </div>
    </div>
    <div class="feed-item-container">
      <div class="feed-item-container-header">
        <div class="feed-item-container-header-user">
          <span :style="{ backgroundImage: `url(data:${item.user.image.type};base64,${item.user.image.data})` }" class="feed-item-container-header-user-image"></span>
          <span class="feed-item-container-header-user-name">{{ username }}</span>
        </div>
        <div class="feed-item-container-header-date">
          <timeago :datetime="item.date"></timeago>
        </div>
      </div>
      <div class="feed-item-container-content">
        <div class="feed-item-container-content-title">{{ item.title }}</div>
        <div v-if="item.image" :style="{ backgroundImage: `url(data:${item.image.type};base64,${item.image.data})` }" class="feed-item-container-content-image"></div>
        <div v-if="item.giphyUrl" :style="{ backgroundImage: `url(${item.giphyUrl})` }" class="feed-item-container-content-image"></div>
        <div class="feed-item-container-content-content">{{ item.content }}</div>
      </div>
      <div class="feed-item-container-footer">
        <div class="feed-item-container-footer-controls">
          <button @click="toggleComments" class="btn btn-icon feed-item-container-footer-controls-comments">
            <font-awesome-icon :icon="['fas', 'comment']" class="feed-item-container-footer-controls-comments-icon"/>
            <span class="feed-item-container-footer-controls-comments-label">{{ commentsLinkText }}</span>
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
  computed: {
    ...mapState({
      user: state => state.user,
    }),
    username() {
      return this.item.user.name ? this.item.user.name : this.item.user.username;
    },
    numLikes() {
      return this.item && this.item.likes ? this.item.likes.length : 0;
    },
    numDislikes() {
      return this.item && this.item.dislikes ? this.item.dislikes.length : 0;
    },
    commentsLinkText() {
      return this.item.comments ? this.item.comments.length !== 1 ? `${this.item.comments.length} Replies` : `${this.item.comments.length} Reply` : '0 Replies';
    },
    liked() {
      return this.item && this.item.likes ? this.item.likes.find(l => l.user === this.user._id) : false;
    },
    disliked() {
      return this.item && this.item.dislikes ? this.item.dislikes.find(d => d.user === this.user._id) : false;
    }
  },
  methods: {
    toggleComments() {
      this.commentsOpen = !this.commentsOpen;
    },
    like() {
      const like = {
        user: this.user._id,
        post: this.item._id
      };
      this.$store.dispatch('CREATE_LIKE', like);
    },
    dislike() {
      const dislike = {
        user: this.user._id,
        post: this.item._id
      };
      this.$store.dispatch('CREATE_DISLIKE', dislike);
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
  border-bottom: 1px solid $geyser;

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

      .feed-item-container-content-content {
        padding: 10px 0;
        white-space: pre-wrap;
      }

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

.dark {
  .feed-item {
    border-bottom: 1px solid $geyserDark;
  }
}
</style>
