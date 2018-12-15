<template>
  <div class="feed">
    <div class="feed-header">
      <FeedControls />
    </div>
    <div class="feed-content">
      <FeedPostEntry />
      <FeedItem v-for="(item, ind) of displayedFeedItems" :key="ind" :item="item" />
      <div v-if="!showingAllFeedItems" class="feed-content-view-more">
        <button @click="viewMore" class="btn btn-link">View older posts</button>
      </div>
    </div>
    <ToTop />
  </div>
</template>

<script>
import FeedControls from '@/components/Feed/FeedControls.vue';
import FeedPostEntry from '@/components/Feed/FeedPostEntry.vue';
import FeedItem from '@/components/Feed/FeedItem.vue';
import ToTop from '@/components/ToTop.vue';

import { mapState } from 'vuex';

export default {
  name: 'feed',
  data() {
    return {
      end: this.feed ? this.feed.items.length > 10 ? 10 : this.feed.items.length : 10
    }
  },
  computed: {
    ...mapState({
      feed: state => state.feed
    }),
    sortedFeedItems() {
      const feedItems = Array.from(this.feed.items);
      return feedItems.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    },
    displayedFeedItems() {
      const feedItems = Array.from(this.sortedFeedItems);
      return feedItems.slice(0, this.end);
    },
    showingAllFeedItems() {
      return this.end === this.feed.items.length;
    }
  },
  beforeMount() {
    this.$store.dispatch('GET_CHANNELS');
  },
  methods: {
    viewMore() {
      const numFeedItems = this.feed.items.length;
      const add = this.end + 10 < numFeedItems ? 10 : numFeedItems - this.end;
      this.end += add;
    }
  },
  components: {
    FeedControls,
    FeedPostEntry,
    FeedItem,
    ToTop
  }
}
</script>

<style lang="scss">
.feed {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  .feed-header {
    width: 100%;
    max-width: 650px;
    position: fixed;
    top: 60px;
    background-color: $white;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;
    border-bottom: 1px solid $outerSpace;
    padding: 0 15px;
    z-index: 100;
  }

  .feed-content {
    width: 100%;
    max-width: 650px;
    margin-top: 100px;
    padding: 0 15px 15px 15px;

    .feed-content-view-more {
      width: 100%;
      padding: 10px;
      border-bottom: 1px solid $geyser;
    }
  }
}

.dark {
  .feed {
    .feed-header {
      background-color: $whiteDark;
      border-bottom: 1px solid $outerSpaceDark;
    }

    .feed-content {
      .feed-content-view-more {
        border-bottom: 1px solid $geyserDark;
      }
    }
  }
}
</style>
