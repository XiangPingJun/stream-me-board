<template>
  <Button class="icon-btn" style="margin-bottom:4px">
    <div class="icon-btn-content">
      <i :class="icon"/>
    </div>
  </Button>
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
}
.icon-btn-content {
  padding-top: 3px;
}
</style>
