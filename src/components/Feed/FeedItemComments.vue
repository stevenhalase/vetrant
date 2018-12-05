<template>
  <div class="feed-item-comments">
    <FeedItemCommentEntry />
    <div v-for="(comment, ind) of displayedComments" :key="ind" class="feed-item-comment">
      <FeedItemComment :comment="comment" />
    </div>
    <div v-if="!showingAllComments" class="feed-item-comments-view-more">
      <button @click="viewMore" class="btn btn-link">View older comments</button>
    </div>
  </div>
</template>

<script>
import FeedItemComment from '@/components/Feed/FeedItemComment.vue';
import FeedItemCommentEntry from '@/components/Feed/FeedItemCommentEntry.vue';
import { mapState } from 'vuex';

export default {
  name: 'feed-item-comments',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      end: this.item.comments.length > 3 ? 3 : this.item.comments.length
    }
  },
  computed: {
    sortedComments() {
      const comments = Array.from(this.item.comments);
      return comments.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    },
    displayedComments() {
      const comments = Array.from(this.sortedComments);
      return comments.slice(0, this.end);
    },
    showingAllComments() {
      return this.end === this.item.comments.length;
    }
  },
  methods: {
    viewMore() {
      const numComments = this.item.comments.length;
      const add = this.end + 3 < numComments ? 3 : numComments - this.end;
      this.end += add;
    }
  },
  components: {
    FeedItemComment,
    FeedItemCommentEntry
  }
}
</script>

<style lang="scss" scoped>
.feed-item-comments {
  width: 100%;
  background-color: #f3f3f3;
  padding: 10px;
  border-left: 2px solid #2d3436;

  .feed-item-comments-view-more {
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #dfe6e9;
  }
}
</style>
