<template>
  <div class="icon-btn" @click="$emit('click')">
    <i :class="icon"/>
  </div>
</template>

<script>
export default {
  props: ['icon'],
}
</script>

<style scoped>
.icon-btn {
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
