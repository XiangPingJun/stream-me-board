<template>
	<div class="line">
		<Avatar :index="data.avatar" class="vertical" />
    <b class="name" :style="nameStyle">{{data.name}}</b>
    <span>{{data.text}}</span>
	</div>
</template>

<script>
import Avatar from './Avatar'
import { AVATAR_COLORS } from '../common'

export default {
  props: ['data'],
  components: { Avatar },
  computed: {
    nameStyle() {
      return {
        'background-color': `#${AVATAR_COLORS[this.data.avatar - 1]}`
      }
    }
  }
}
</script>

<style scoped>
.line {
  margin-top: 5px;
}
.avatar {
  vertical-align: middle;
}
b {
  margin-left: -3px;
  border-radius: 5px;
  color: white;
  padding: 5px;
  font-weight: normal;
  text-shadow: none;
}
</style>