<template>
	<div class="line">
    <UserAvatar :user="user" style="vertical-align: middle;"/>
    <NameBadge :user="user"/>
    <span>{{text}}</span>
	</div>
</template>

<script>
import UserAvatar from './UserAvatar'
import NameBadge from '../NameBadge'

export default {
  props: ['text', 'user'],
  components: { UserAvatar, NameBadge },
}
</script>

<style scoped>
.line {
  margin-top: 2px;
  word-break: break-all;
}
</style>