<template>
  <div class="feed-item-comment">
    <div class="feed-item-comment-side-controls">
      <div class="feed-item-comment-side-controls-like">
        <button @click="like" class="btn btn-icon" :class="{ 'btn-icon-success': liked }" :disabled="liked">
          <font-awesome-icon :icon="['fas', 'plus-circle']" class="feed-item-comment-side-controls-like-icon"/>
        </button>
        <span class="feed-item-comment-side-controls-like-count">{{ numLikes }}</span>
      </div>
      <div class="feed-item-comment-side-controls-dislike">
        <button @click="dislike" class="btn btn-icon" :class="{ 'btn-icon-success': disliked }" :disabled="disliked">
          <font-awesome-icon :icon="['fas', 'minus-circle']" class="feed-item-comment-side-controls-dislike-icon"/>
        </button>
        <span class="feed-item-comment-side-controls-dislike-count">{{ numDislikes }}</span>
      </div>
    </div>
    <div class="feed-item-comment-container">
      <div class="feed-item-comment-container-header">
        <div class="feed-item-comment-container-header-user">
          <span :style="{ backgroundImage: `url(data:${comment.user.image.type};base64,${comment.user.image.data})` }" class="feed-item-comment-container-header-user-image"></span>
          <span class="feed-item-comment-container-header-user-name">{{ username }}</span>
        </div>
        <div class="feed-item-comment-container-header-date">
          <timeago :datetime="comment.date"></timeago>
        </div>
      </div>
      <div class="feed-item-comment-container-content">
        <div class="feed-item-comment-container-content-content">{{ comment.content }}</div>
        <div v-if="comment.image" :style="{ backgroundImage: `url(data:${comment.image.type};base64,${comment.image.data})` }" class="feed-item-comment-container-content-image"></div>
      </div>
      <div class="feed-item-comment-container-footer">
        <div class="feed-item-comment-container-footer-controls">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'feed-item-comment',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
    username() {
      return this.comment.user.name ? this.comment.user.name : this.comment.user.username;
    },
    numLikes() {
      return this.comment && this.comment.likes ? this.comment.likes.length : 0;
    },
    numDislikes() {
      return this.comment && this.comment.dislikes ? this.comment.dislikes.length : 0;
    },
    liked() {
      return this.comment && this.comment.likes ? this.comment.likes.find(l => l.user === this.user._id) : false;
    },
    disliked() {
      return this.comment && this.comment.dislikes ? this.comment.dislikes.find(d => d.user === this.user._id) : false;
    }
  },
  methods: {
    like() {
      const like = {
        user: this.user._id,
        comment: this.comment._id
      };
      this.$store.dispatch('CREATE_LIKE', like);
    },
    dislike() {
      const dislike = {
        user: this.user._id,
        comment: this.comment._id
      };
      this.$store.dispatch('CREATE_DISLIKE', dislike);
    }
  },
}
</script>

<style lang="scss" scoped>
.feed-item-comment {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 5px 0;
  margin: 5px 0;
  border-bottom: 1px solid #dfe6e9;

  .feed-item-comment-side-controls {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;

    .feed-item-comment-side-controls-like {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 5px;

      .feed-item-comment-side-controls-like-icon {
        font-size: 22px;
        margin-bottom: 5px;

        &:hover {
          cursor: pointer;
        }
      }
    }

    .feed-item-comment-side-controls-dislike {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 5px;

      .feed-item-comment-side-controls-dislike-icon {
        font-size: 22px;
        margin-bottom: 5px;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .feed-item-comment-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;

    .feed-item-comment-container-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .feed-item-comment-container-header-user {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .feed-item-comment-container-header-user-image {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 10px;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
        }

        .feed-item-comment-container-header-user-name {
          font-weight: bold;
        }
      }
    }

    .feed-item-comment-container-content {
      width: 100%;

      .feed-item-comment-container-content-content {
        padding: 10px 0;
        white-space: pre-wrap;
      }

      .feed-item-comment-container-content-image {
          width: 100%;
          height: 200px;
          border-radius: 4px;
          margin-bottom: 10px;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
      }
    }

    .feed-item-comment-container-footer {
      width: 100%;

      .feed-item-comment-container-footer-controls {
        padding: 5px 0;
      }
    }
  }
}
</style>
