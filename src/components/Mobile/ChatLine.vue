<template>
	<div class="line">
    <Avatar :index="user.avatarSelected" :preserved="user.preserved" style="vertical-align: middle;"/>
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
.line {
  margin-top: 2px;
  word-break: break-all;
}
</style>