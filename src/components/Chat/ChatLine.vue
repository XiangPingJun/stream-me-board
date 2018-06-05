<template>
	<div class="line">
		<Avatar :index="user.avatarSelected" class="vertical" :preserved="user.preserved"/>
    <NameBadge :user="user"/>
    <span>{{text}}</span>
	</div>
</template>

<script>
import Avatar from '../Avatar'
import NameBadge from '../NameBadge'

export default {
  props: ['text', 'user'],
  components: { Avatar, NameBadge },
}
</script>

<style scoped>
* {
  font-size: 50px;
  color: white;
}
.line {
  word-break: break-all;
  margin-left: 15px;
  line-height: 125%;
}
.avatar {
  transform: scale(2.5, 2.5);
  vertical-align: middle;
}
</style>