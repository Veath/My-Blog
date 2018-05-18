<template>
  <svg class="loading" width="44px" height="44px" viewBox="0 0 44 44" v-show="show">
    <circle class="path" fill="none" stroke-width="4" stroke-linecap="round" cx="22" cy="22" r="20"></circle>
  </svg>
</template>

<script>
// const loading = Vue.prototype.loading = new Vue(dafyLoading).$mount()
// document.body.appendChild(loading.$el)
export default {
  name: 'loading',
  data () {
    return {
      show: false
    }
  },
  methods: {
    start () {
      this.timer = setTimeout(() => {
        this.show = true
      }, 200)
    },
    end () {
      clearTimeout(this.timer)
      this.show = false
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss">
  $offset: 126;
  $duration: 1.4s;

  .loading {
    width: 44px;
    height: 44px;
    animation: rotator $duration linear forwards infinite;

    .path {
      stroke: #6c6a6c;
      /*
        虚线
       */
      stroke-dasharray: $offset;
      stroke-dashoffset: $offset / 2;
      transform-origin: center;
      animation: dash $duration ease forwards infinite
    }
  }

  @keyframes rotator {
    0% {
      transform: rotate(0deg) translateZ(0);
    }
    100% {
      transform: rotate(360deg) translateZ(0);
    }
  }

  @keyframes dash {
    0% {
      stroke-dashoffset: $offset;
      transform: rotate(0deg) translateZ(0);
    }
    50% {
      stroke-dashoffset: ($offset / 2);
      transform: rotate(125deg) translateZ(0);
    }
    100% {
      stroke-dashoffset: $offset;
      transform: rotate(360deg) translateZ(0);
    }
  }
</style>
