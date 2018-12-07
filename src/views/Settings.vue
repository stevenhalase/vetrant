<template>
  <div class="settings">
    <div class="settings-container">
      <div class="settings-avatar-preview">
        <div class="settings-avatar-preview-image" :style="{ backgroundImage: avatarSrc }"></div>
        <div @click="clickUpload" class="settings-avatar-preview-edit">
          <font-awesome-icon :icon="['fas', 'edit']" class="settings-avatar-preview-edit-icon"/>
        </div>
      </div>
      <input v-model="name" type="text" class="input settings-name-input" placeholder="Name"/>
      <input v-model="username" type="text" class="input settings-username-input" placeholder="Username" disabled="true"/>
      <input type="file" id="avatar-upload" ref="file" v-on:change="handleFileUpload"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'settings',
  data() {
    return {
      name: '',
      username: '',
      file: ''
    };
  },
  beforeMount() {
    this.username = this.user.username;
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    avatarSrc() {
      if (this.user.image && this.user.image.data) {
        return `url(data:${this.user.image.type};base64,${this.user.image.data})`;
      } else {
        return 'url(https://placeimg.com/640/480/people/grayscale)';
      }
    }
  },
  methods: {
    clickUpload() {
      const uploadInput = document.querySelector('#avatar-upload');
      uploadInput.click();
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      let formData = new FormData();
      formData.append('username', this.user.username);
      formData.append('file', this.file);
      formData.append('fileType', this.file.type);
      formData.append('fileName', this.file.name);
      this.$store.dispatch('UPDATE_AVATAR', formData)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.settings {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .settings-container {
    width: 100%;
    max-width: 650px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    #avatar-upload {
      visibility: hidden;
      width: 0;
      height: 0;
    }

    .settings-avatar-preview {
      width: 100px;
      height: 100px;
      overflow: hidden;
      position: relative;
      border-radius: 4px;

      .settings-avatar-preview-image {
        width: 100%;
        height: 100%;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
      }

      .settings-avatar-preview-edit {
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        display: none;

        .settings-avatar-preview-edit-icon {
          font-size: 24px;
          color: #fff;
        }
      }

      &:hover {
        cursor: pointer;

        .settings-avatar-preview-edit {
          display: flex;
        }
      }
    }
  }
}
</style>
