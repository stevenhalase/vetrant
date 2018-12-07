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
  background-color: #2d3436;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  box-shadow: 0px 0px 122px -34px rgba(0,0,0,0.75);

  .to-top-icon {
    color: #fff;
    font-size: 18px;
  }

  &.show {
    opacity: 1;
    visibility: visible;
    pointer-events: unset;
    cursor: pointer;
  }
}
</style>
