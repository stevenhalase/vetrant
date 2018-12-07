<template>
  <div class="post-entry">
    <div class="post-entry-container">
      <div class="post-entry-user-image" :style="{ backgroundImage: `url(data:${user.image.type};base64,${user.image.data})` }"></div>
      <textarea v-model="post.content" class="post-entry-textarea" placeholder="Make a post..."></textarea>
    </div>
    <div class="post-entry-controls">
      <button class="btn btn-icon post-entry-image">
        <font-awesome-icon :icon="['fas', 'image']" class="post-entry-image-icon"/>
      </button>
      <button @click="submitPost" class="btn post-entry-controls-submit">Post</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'post-entry',
  data() {
    return {
      post: {
        title: '',
        content: ''
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    submitPost() {

    }
  }
}
</script>

<style lang="scss" scoped>
.post-entry {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .post-entry-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    border-top: 1px solid #dfe6e9;
    border-bottom: 1px solid #dfe6e9;
    padding: 10px 0;

    .post-entry-user-image {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      margin-right: 15px;
    }

    .post-entry-textarea {
      flex: 1;
      border: none;
      padding: 10px;
      resize: none;
      height: 40px;
    }
  }

  .post-entry-controls {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #dfe6e9;

    .post-entry-image {
      margin-right: 10px;

      .post-entry-image-icon {
        font-size: 22px;
      }
    }

    .post-entry-controls-submit {
      
    }
  }
}
</style>
