<template>
  <div class="feed-item-comment-entry">
    <div class="feed-item-comment-entry-container">
      <div class="feed-item-comment-entry-user-image" :style="{ backgroundImage: `url(${user.image})` }"></div>
      <textarea v-model="commentInput" class="feed-item-comment-entry-textarea" placeholder="Post a reply..."></textarea>
    </div>
    <div class="feed-item-comment-entry-controls">
      <button class="btn btn-icon feed-item-comment-entry-image">
        <font-awesome-icon :icon="['fas', 'image']" class="feed-item-comment-entry-image-icon"/>
      </button>
      <button @click="submitComment" class="btn feed-item-comment-entry-controls-submit">Reply</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'feed-item-comment-entry',
  data() {
    return {
      commentInput: ''
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    submitComment() {

    }
  }
}
</script>

<style lang="scss" scoped>
.feed-item-comment-entry {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .feed-item-comment-entry-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    border-top: 1px solid #dfe6e9;
    border-bottom: 1px solid #dfe6e9;
    padding: 10px 0;

    .feed-item-comment-entry-user-image {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      margin-right: 15px;
    }

    .feed-item-comment-entry-textarea {
      flex: 1;
      border: none;
      padding: 10px;
      resize: none;
      height: 40px;
    }
  }

  .feed-item-comment-entry-controls {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #dfe6e9;

    .feed-item-comment-entry-image {
      margin-right: 10px;

      .feed-item-comment-entry-image-icon {
        font-size: 22px;
      }
    }

    .feed-item-comment-entry-controls-submit {
      
    }
  }
}
</style>
