<template>
  <div @click="toTop" class="to-top" :class="{ show }">
    <font-awesome-icon :icon="['fas', 'caret-up']" class="to-top-icon"/>
  </div>
</template>

<script>
export default {
  name: 'to-top',
  data() {
    return {
      show: false,
    };
  },
  beforeMount() {
    window.addEventListener('scroll', (ev) => {
      this.show = window.scrollY > 100;
    });
  },
  methods: {
    toTop() {
      window.scrollTo(0, 0);
    }
  }
}
</script>

<style lang="scss">
.to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: $outerSpace;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  box-shadow: 0px 0px 122px -34px rgba(0,0,0,0.75);
  color: $white;

  .to-top-icon {
    color: $white;
    font-size: 18px;

    > path {
      color: $white;
    }
  }

  &.show {
    opacity: 1;
    visibility: visible;
    pointer-events: unset;
    cursor: pointer;
  }
}

.dark {
  .to-top {
    background-color: $outerSpaceDark;
    box-shadow: 0px 0px 122px -34px rgba(0,0,0,0.75);
    color: $whiteDark;

    .to-top-icon {
      color: $whiteDark;

      > path {
        color: $whiteDark;
      }
    }
  }
}
</style>
