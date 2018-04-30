<!-- for mesure the size of content -->
<template>
	<div class="invisible" ref="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    getWidth() { return this.$refs.container.clientWidth },
    getHeight() { return this.$refs.container.clientHeight },
  }
}
</script>

<style scoped>
.invisible {
  position: fixed;
  visibility: hidden;
  z-index: -99999;
}
</style>