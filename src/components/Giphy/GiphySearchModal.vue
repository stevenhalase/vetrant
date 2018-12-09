<template>
  <div class="giphy-search-modal" :class="{ open }">
    <div class="giphy-search-modal-container">
      <div class="giphy-search-controls">
        <input @keydown.enter="submitSearch" v-model="search" type="text" class="input dark giphy-search-input" placeholder="Search Giphy..."/>
        <button @click="submitSearch" class="btn giphy-search-submit">Search</button>
      </div>
      <div class="giphy-search-modal-container-results">
        <div @click="selectGiphy(item)" v-for="(item, ind) of results" :key="ind" class="giphy-search-result" :style="{ backgroundImage: `url(${item.images.original.url})` }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'giphy-search-modal',
  props: {
    open: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      search: '',
      results: []
    };
  },
  methods: {
    submitSearch() {
      this.$store.dispatch('SEARCH_GIPHY', this.search)
        .then(response => {
          this.results = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    selectGiphy(giphy) {
      this.$emit('selectGiphy', giphy);
    }
  }
}
</script>

<style lang="scss">
.giphy-search-modal {
  display: none;
  
  .giphy-search-modal-container {
    position: absolute;
    bottom: -500px;
    right: 0;
    width: 300px;
    height: 500px;
    background-color: #f3f3f3;
    padding: 15px;
    box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0);
    border-left: 2px solid #2d3436;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .giphy-search-controls {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .giphy-search-input {
        flex: 1;
        margin-right: 10px;
      }
    }

    .giphy-search-modal-container-results {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      .giphy-search-result {
        width: 30%;
        height: 100px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        margin: 3px;
        border-radius: 4px;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  &.open {
    display: flex;
  }
}
</style>
