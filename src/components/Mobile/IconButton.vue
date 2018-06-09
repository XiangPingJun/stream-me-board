<template>
  <div class="icon-btn">
    <i :class="icon"/>
  </div>
</template>

<script>
import Button from '../Button'

export default {
  components: { Button },
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
