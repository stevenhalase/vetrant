<template>
  <div class="feed">
    <div class="feed-content">
      <FeedPostEntry />
      <FeedItem v-for="(item, ind) of displayedFeedItems" :key="ind" :item="item" />
      <div v-if="!showingAllFeedItems" class="feed-content-view-more">
        <button @click="viewMore" class="btn btn-link">View older posts</button>
      </div>
    </div>
  </div>
</template>

<script>
import FeedPostEntry from '@/components/Feed/FeedPostEntry.vue';
import FeedItem from '@/components/Feed/FeedItem.vue';

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
  methods: {
    viewMore() {
      const numFeedItems = this.feed.items.length;
      const add = this.end + 10 < numFeedItems ? 10 : numFeedItems - this.end;
      this.end += add;
    }
  },
  components: {
    FeedPostEntry,
    FeedItem
  }
}
</script>

<style lang="scss">
.feed {
  display: flex;
  justify-content: center;
  align-items: flex-start;

  .feed-content {
    max-width: 650px;

    .feed-content-view-more {
      width: 100%;
      padding: 10px;
      border-bottom: 1px solid #dfe6e9;
    }
  }
}
</style>
