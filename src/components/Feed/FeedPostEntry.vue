<template>
  <div class="post-entry">
    <div class="post-entry-container">
      <div class="post-entry-user-image" :style="{ backgroundImage: `url(data:${user.image.type};base64,${user.image.data})` }"></div>
      <div class="post-entry-container-content">
        <input v-model="post.title" type="text" class="input post-entry-input" placeholder="Post title..."/>
        <textarea-autosize
          v-model="post.content"
          @keydown.enter.native="submitPost"
          class="input post-entry-textarea"
          placeholder="Make a post..."
          :min-height="40"
          :max-height="350"
          rows="1"
        ></textarea-autosize>
        <div v-if="post.image" class="post-image-upload-container">
          <div class="post-image-upload-preview" :style="{ backgroundImage: `url(${post.image.data})` }">
            <button @click="cancelUpload" class="btn btn-icon post-image-upload-cancel">
              <font-awesome-icon :icon="['far', 'window-close']" class="post-image-upload-cancel-icon"/>
            </button>
          </div>
        </div>
        <div v-if="post.giphyUrl" class="post-image-upload-container">
          <div class="post-image-upload-preview" :style="{ backgroundImage: `url(${post.giphyUrl})` }">
            <button @click="cancelGiphyUpload" class="btn btn-icon post-image-upload-cancel">
              <font-awesome-icon :icon="['far', 'window-close']" class="post-image-upload-cancel-icon"/>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="post-entry-controls">
      <button @click="toggleGiphySearch" class="btn btn-icon post-entry-image">
        <font-awesome-icon :icon="['fas', 'camera-retro']" class="post-entry-gif-icon"/>
      </button>
      <button @click="clickUpload" class="btn btn-icon post-entry-image">
        <font-awesome-icon :icon="['fas', 'image']" class="post-entry-image-icon"/>
      </button>
      <button @click="submitPost" class="btn post-entry-controls-submit">Post</button>
    </div>
    <GiphySearchModal @selectGiphy="selectGiphy" :open="giphySearchOpen"/>
    <input type="file" id="post-image-upload" ref="file" v-on:change="handleFileSelection"/>
  </div>
</template>

<script>
import GiphySearchModal from '@/components/Giphy/GiphySearchModal.vue';
import { mapState } from 'vuex';

export default {
  name: 'post-entry',
  data() {
    return {
      post: {
        title: '',
        content: '',
        image: null,
        giphyUrl: null
      },
      giphySearchOpen: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
      selectedChannel: state => state.selectedChannel
    })
  },
  methods: {
    submitPost() {
      let formData = new FormData();
      formData.append('user', this.user._id);
      formData.append('channel', this.selectedChannel._id);
      formData.append('title', this.post.title);
      formData.append('content', this.post.content);

      if (this.post.image) {
        formData.append('file', this.post.image.file);
        formData.append('fileType', this.post.image.fileType);
        formData.append('fileName', this.post.image.fileName);
      }

      if (this.post.giphyUrl) {
        formData.append('giphyUrl', this.post.giphyUrl);
      }

      this.$store.dispatch('CREATE_POST', formData)
        .then(response => {
          this.post = {
            title: '',
            content: '',
            image: null
          };
          this.$store.dispatch('GET_POSTS');
        })
        .catch(error => {
          console.log(error);
        })
    },
    handleFileSelection() {
      const file = this.$refs.file.files[0];

      this.getBase64(file)
        .then(base64data => {
          this.post.image = {
            file,
            data: base64data,
            fileType: file.type,
            fileName: file.name,
          };
        })
    },
    clickUpload() {
      const uploadInput = document.querySelector('#post-image-upload');
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
      this.post.image = null;
    },
    cancelGiphyUpload() {
      this.post.giphyUrl = null;
    },
    toggleGiphySearch() {
      this.giphySearchOpen = !this.giphySearchOpen;
    },
    selectGiphy(giphy) {
      this.giphySearchOpen = false;
      this.post.giphyUrl = giphy.images.original.url;
    }
  },
  components: {
    GiphySearchModal
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
  position: relative;
  
  #post-image-upload {
    visibility: hidden;
    width: 0;
    height: 0;
  }

  .post-entry-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    border-top: 1px solid $geyser;
    border-bottom: 1px solid $geyser;
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

    .post-entry-container-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      .post-entry-input {
        width: 100%;
        padding: 10px;
        height: 40px;
      }

      .post-entry-textarea {
        width: 100%;
        padding: 10px;
        resize: none;
        height: 40px;
      }

      .post-image-upload-container {
        width: 100%;

        .post-image-upload-preview {
          width: 100%;
          height: 200px;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          border-radius: 4px;
          margin: 10px 0;
          position: relative;

          .post-image-upload-cancel {
            position: absolute;
            top: 15px;
            right: 15px;

            .post-image-upload-cancel-icon {
              font-size: 22px;
            }
          }
        }
      }
    }
  }

  .post-entry-controls {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid $geyser;

    .post-entry-image {
      margin-right: 10px;

      .post-entry-image-icon,
      .post-entry-gif-icon {
        font-size: 22px;
      }
    }

    .post-entry-controls-submit {
      
    }
  }
}

.dark {
  .post-entry {
    .post-entry-container {
      border-top: 1px solid $geyserDark;
      border-bottom: 1px solid $geyserDark;
    }

    .post-entry-controls {
      border-bottom: 1px solid $geyserDark;
    }
  }
}
</style>
