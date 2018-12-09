<template>
  <div class="feed-item-comment-entry">
    <div class="feed-item-comment-entry-container">
      <div class="feed-item-comment-entry-user-image" :style="{ backgroundImage: `url(data:${user.image.type};base64,${user.image.data})` }"></div>
      <div class="feed-item-comment-entry-container-content">
        <textarea-autosize
          v-model="comment.content"
          @keydown.enter.native="submitComment"
          class="input dark feed-item-comment-entry-textarea"
          placeholder="Post a reply..."
          :min-height="40"
          :max-height="350"
          rows="1"
        ></textarea-autosize>
        <div v-if="comment.image" class="feed-item-comment-image-upload-container">
          <div class="feed-item-comment-image-upload-preview" :style="{ backgroundImage: `url(${comment.image.data})` }">
            <button @click="cancelUpload" class="btn btn-icon feed-item-comment-image-upload-cancel">
              <font-awesome-icon :icon="['far', 'window-close']" class="feed-item-comment-image-upload-cancel-icon"/>
            </button>
          </div>
        </div>
        <div v-if="comment.giphyUrl" class="feed-item-comment-image-upload-container">
          <div class="feed-item-comment-image-upload-preview" :style="{ backgroundImage: `url(${comment.giphyUrl})` }">
            <button @click="cancelGiphyUpload" class="btn btn-icon feed-item-comment-image-upload-cancel">
              <font-awesome-icon :icon="['far', 'window-close']" class="feed-item-comment-image-upload-cancel-icon"/>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="feed-item-comment-entry-controls">
      <button @click="toggleGiphySearch" class="btn btn-icon feed-item-comment-entry-image">
        <font-awesome-icon :icon="['fas', 'camera-retro']" class="feed-item-comment-entry-gif-icon"/>
      </button>
      <button @click="clickUpload" class="btn btn-icon feed-item-comment-entry-image">
        <font-awesome-icon :icon="['fas', 'image']" class="feed-item-comment-entry-image-icon"/>
      </button>
      <button @click="submitComment" class="btn feed-item-comment-entry-controls-submit">Reply</button>
    </div>
    <GiphySearchModal @selectGiphy="selectGiphy" :open="giphySearchOpen"/>
    <input type="file" id="comment-image-upload" ref="file" v-on:change="handleFileSelection"/>
  </div>
</template>

<script>
import GiphySearchModal from '@/components/Giphy/GiphySearchModal.vue';
import { mapState } from 'vuex';

export default {
  name: 'feed-item-comment-entry',
  props: {
    postId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      comment: {
        content: '',
        image: null,
        giphyUrl: null
      },
      giphySearchOpen: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    submitComment() {
      let formData = new FormData();
      formData.append('user', this.user._id);
      formData.append('post', this.postId);
      formData.append('content', this.comment.content);

      if (this.comment.image) {
        formData.append('file', this.comment.image.file);
        formData.append('fileType', this.comment.image.fileType);
        formData.append('fileName', this.comment.image.fileName);
      }

      if (this.comment.giphyUrl) {
        formData.append('giphyUrl', this.comment.giphyUrl);
      }

      this.$store.dispatch('CREATE_COMMENT', formData)
        .then(response => {
          this.comment = {
            title: '',
            content: '',
            image: null
          };
          this.$emit('newComment');
        })
        .catch(error => {
          console.log(error);
        })
    },
    handleFileSelection() {
      const file = this.$refs.file.files[0];

      this.getBase64(file)
        .then(base64data => {
          this.comment.image = {
            file,
            data: base64data,
            fileType: file.type,
            fileName: file.name,
          };
        })
    },
    clickUpload() {
      const uploadInput = document.querySelector('#comment-image-upload');
      uploadInput.click();
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener("load", function(e) {
          resolve(e.target.result);
        }); 
        
        reader.readAsDataURL(file);
      })
    },
    cancelUpload() {
      this.comment.image = null;
    },
    cancelGiphyUpload() {
      this.comment.giphyUrl = null;
    },
    toggleGiphySearch() {
      this.giphySearchOpen = !this.giphySearchOpen;
    },
    selectGiphy(giphy) {
      this.giphySearchOpen = false;
      this.comment.giphyUrl = giphy.images.original.url;
    }
  },
  components: {
    GiphySearchModal
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
  position: relative;
  
  #comment-image-upload {
    visibility: hidden;
    width: 0;
    height: 0;
  }

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

    .feed-item-comment-entry-container-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      .feed-item-comment-entry-input {
        width: 100%;
        padding: 10px;
        height: 40px;
      }

      .feed-item-comment-entry-textarea {
        width: 100%;
        padding: 10px;
        resize: none;
        height: 40px;
      }

      .feed-item-comment-image-upload-container {
        width: 100%;

        .feed-item-comment-image-upload-preview {
          width: 100%;
          height: 200px;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          border-radius: 4px;
          margin: 10px 0;
          position: relative;

          .feed-item-comment-image-upload-cancel {
            position: absolute;
            top: 15px;
            right: 15px;

            .feed-item-comment-image-upload-cancel-icon {
              font-size: 22px;
            }
          }
        }
      }
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

      .feed-item-comment-entry-image-icon,
      .feed-item-comment-entry-gif-icon {
        font-size: 22px;
      }
    }

    .feed-item-comment-entry-controls-submit {
      
    }
  }
}
</style>
