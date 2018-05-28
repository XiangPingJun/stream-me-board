<template>
	<div class="line">
		<Avatar :index="user.avatarSelected" class="vertical" :preserved="user.preserved" />
    <span class="name" :style="nameStyle">{{user.name}}</span>
    <span>{{text}}</span>
	</div>
</template>

<script>
import Avatar from './Avatar'
import { AVATAR_COLORS, PRESERVED_AVATAR_COLORS } from '../common'

export default {
  props: ['text', 'user'],
  components: { Avatar },
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
  margin-top: 5px;
  word-break: break-all;
}
.avatar {
  vertical-align: middle;
}
.name {
  margin-left: -3px;
  border-radius: 5px;
  color: white;
  padding: 5px;
  text-shadow: 1px 1px 0 #705749, -1px 1px 0 #705749, 1px -1px 0 #705749,
    -1px -1px 0 #705749, 0px 1px 0 #705749, 0px -1px 0 #705749,
    -1px 0px 0 #705749, 1px 0px 0 #705749, 1px 1px 0 #705749, -1px 1px 0 #705749,
    1px -1px 0 #705749, -1px -1px 0 #705749, 0px 1px 0 #705749,
    0px -1px 0 #705749, -1px 0px 0 #705749, 1px 0px 0 #705749, 1px 1px 0 #705749,
    -1px 1px 0 #705749, 1px -1px 0 #705749, -1px -1px 0 #705749,
    1px 1px 0 #705749, -1px 1px 0 #705749, 1px -1px 0 #705749,
    -1px -1px 0 #705749;
}
</style>