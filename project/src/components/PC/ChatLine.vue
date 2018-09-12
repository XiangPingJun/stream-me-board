<template>
	<div class="line">
    <UserAvatar :user="user" style="vertical-align: middle"/>
    <NameBadge :user="user"/>
    <span>{{text}}</span>
    <Sticker v-if="!isNaN(sticker)" :index="sticker" :category="stickerCategory" size="80" align='middle' style="margin-left:5px" />
	</div>
</template>

<script>
import UserAvatar from './UserAvatar'
import NameBadge from '../NameBadge'
import Sticker from '../Sticker'

export default {
  props: ['text', 'user', 'sticker', 'stickerCategory'],
  components: { UserAvatar, NameBadge, Sticker },
}
</script>

<style scoped>
.line {
  margin-top: 2px;
  word-break: break-all;
}
.chat-sticker {
  display: block;
  margin-left: 28px;
}
</style>