<template>
  <div class="feed-controls">
    <span class="feed-controls-label">Channel</span>
    <div v-if="selectedChannel" @click="toggleChannelDropdown" class="feed-controls-selected">
      <span class="feed-controls-selected-label">{{ selectedChannel.name }}</span>
      <font-awesome-icon :icon="['fas', 'caret-down']" class="feed-controls-selected-icon"/>
    </div>
    <div v-if="channelDropdownOpen" class="feed-controls-channels">
      <div
        @click="selectChannel(channel)"
        v-for="(channel, ind) of channels"
        :key="ind"
        class="feed-controls-channels-item"
        :class="{ selected: isSelectedChannel(channel) }">
        {{ channel.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'feed-controls',
  data() {
    return {
      channelDropdownOpen: false
    };
  },
  computed: {
    ...mapState({
      channels: state => state.channels,
      selectedChannel: state => state.selectedChannel
    })
  },
  methods: {
    toggleChannelDropdown() {
      this.channelDropdownOpen = !this.channelDropdownOpen;
    },
    isSelectedChannel(channel) {
      return channel._id === this.selectedChannel._id;
    },
    selectChannel(channel) {
      this.$store.dispatch('SET_SELECTED_CHANNEL', channel);
      this.channelDropdownOpen = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.feed-controls {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  .feed-controls-label {
    margin-right: 10px;
    padding: 5px;
    border-bottom: 1px solid transparent;
  }

  .feed-controls-selected {
    padding: 5px;
    border-bottom: 1px solid transparent;

    .feed-controls-selected-label {
      font-weight: bold;
      margin-right: 5px;
    }

    &:hover {
      cursor: pointer;
      border-bottom: 1px solid $outerSpace;
    }
  }

  .feed-controls-channels {
    position: absolute;
    top: 27px;
    left: 50px;
    background-color: $white;
    box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0);
    border-left: 2px solid $outerSpace;

    .feed-controls-channels-item {
      padding: 10px 25px;

      &.selected {
        background-color: $concrete;
        pointer-events: none;
        font-weight: bold;
      }

      &:hover {
        cursor: pointer;
        background-color: $concrete;
      }
    }
  }
}

.dark {
  .feed-controls {
    .feed-controls-selected {
      &:hover {
        border-bottom: 1px solid $outerSpaceDark;
      }
    }

    .feed-controls-channels {
      background-color: $whiteDark;
      box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0);
      border-left: 2px solid $outerSpaceDark;

      .feed-controls-channels-item {
        &.selected {
          background-color: $concreteDark;
        }

        &:hover {
          background-color: $concreteDark;
        }
      }
    }
  }
}
</style>
