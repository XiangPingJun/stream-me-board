<template>
	<span class="name" :style="nameStyle">{{user.name}}</span>
</template>

<script>
import { AVATAR_COLORS, PRESERVED_AVATAR_COLORS } from '../common'

export default {
  props: ['user'],
  computed: {
    nameStyle() {
      let colors = this.user.preserved ? PRESERVED_AVATAR_COLORS : AVATAR_COLORS
      return {
        'background-color': `#${colors[this.user.avatarSelected]}`
      }
    }
  }
}
</script>

<style scoped>
.line {
  margin-top: 2px;
  word-break: break-all;
}
.name {
  margin-left: -3px;
  border-radius: 5px;
  color: white;
  padding: 5px 3px 3px 3px;
  text-shadow: 1px 1px 0 #705749, -1px 1px 0 #705749, 1px -1px 0 #705749,
    -1px -1px 0 #705749, 0px 1px 0 #705749, 0px -1px 0 #705749,
    -1px 0px 0 #705749, 1px 0px 0 #705749, 1px 1px 0 #705749, -1px 1px 0 #705749,
    1px -1px 0 #705749, -1px -1px 0 #705749, 0px 1px 0 #705749,
    0px -1px 0 #705749, -1px 0px 0 #705749, 1px 0px 0 #705749, 1px 1px 0 #705749,
    -1px 1px 0 #705749, 1px -1px 0 #705749, -1px -1px 0 #705749,
    1px 1px 0 #705749, -1px 1px 0 #705749, 1px -1px 0 #705749,
    -1px -1px 0 #705749;
  box-shadow: 2px 2px #86674d;
}
</style>