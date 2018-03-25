<template>
  <div class="outer">
    <iframe ref="iframe" frameBorder="0" allowFullScreen="true" :src="src" :style="videoSize" />
  </div>
</template>

<script>
export default {
  props: ['width', 'height', 'src'],
  computed: {
    videoSize: function () {
      return {
        width: `${this.width || this.height * (16 / 9)}px`,
        height: `${this.height || this.width * (9 / 16)}px`,
      }
    }
  }
}
</script>

<style scoped>
iframe {
  display: block;
  box-shadow: 0px -4px #2a2e30, -4px 0px #2a2e30, 0px 4px #2a2e30,
    4px 0px #2a2e30, -4px -4px #705749, 4px -4px #705749, 4px 4px #705749,
    -4px 4px #705749;
}
.outer {
  padding: 4px;
  box-shadow: 0px -4px #86674d, -4px 0px #86674d, 0px 4px #aa8c6e,
    4px 0px #aa8c6e, -4px -4px #f8ecd5, 4px -4px #f8ecd5, 4px 4px #f8ecd5,
    -4px 4px #f8ecd5;
}
</style>