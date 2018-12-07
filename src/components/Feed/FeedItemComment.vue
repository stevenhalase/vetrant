<template>
  <div class="feed-item-comment">
    <div class="feed-item-comment-side-controls">
      <div class="feed-item-comment-side-controls-like">
        <button class="btn btn-icon">
          <font-awesome-icon :icon="['fas', 'plus-circle']" class="feed-item-comment-side-controls-like-icon"/>
        </button>
        <span class="feed-item-comment-side-controls-like-count">{{ comment.likes.length }}</span>
      </div>
      <div class="feed-item-comment-side-controls-dislike">
        <button class="btn btn-icon">
          <font-awesome-icon :icon="['fas', 'minus-circle']" class="feed-item-comment-side-controls-dislike-icon"/>
        </button>
        <span class="feed-item-comment-side-controls-dislike-count">{{ comment.dislikes.length }}</span>
      </div>
    </div>
    <div class="feed-item-comment-container">
      <div class="feed-item-comment-container-header">
        <div class="feed-item-comment-container-header-user">
          <span :style="{ backgroundImage: `url(${comment.user.image})` }" class="feed-item-comment-container-header-user-image"></span>
          <span class="feed-item-comment-container-header-user-name">{{ comment.user.name }}</span>
        </div>
        <div class="feed-item-comment-container-header-date">
          <timeago :datetime="comment.date"></timeago>
        </div>
      </div>
      <div class="feed-item-comment-container-content">
        <div class="feed-item-comment-container-content-title">{{ comment.title }}</div>
        <div v-if="comment.image" :style="{ backgroundImage: `url(${comment.image})` }" class="feed-item-comment-container-content-image"></div>
        <div class="feed-item-comment-container-content-content">{{ comment.content }}</div>
      </div>
      <div class="feed-item-comment-container-footer">
        <div class="feed-item-comment-container-footer-controls">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'feed-item-comment',
  props: {
    comment: {
      type: Object,
      required: true
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

      .feed-item-comment-container-content-image {
          width: 100%;
          height: 200px;
          border-radius: 4px;
          margin-bottom: 10px;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
      }

      .feed-item-comment-container-content-title {
         font-family: 'Roboto Condensed', sans-serif;
         font-weight: bold;
         font-size: 16px;
         padding: 10px 0;
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
