<template>
	<div class="line">
    <Avatar :index="user.avatarSelected" :preserved="user.preserved" style="vertical-align: middle;"/>
    <NameBadge :user="user"/>
    <span>{{text}}</span>
    <Sticker v-if="!isNaN(sticker)" :index="sticker" :category="stickerCategory" size="80" align='middle' style="margin-left:5px" />
	</div>
</template>

<script>
import Avatar from '../Avatar'
import NameBadge from '../NameBadge'
import Sticker from '../Sticker'

export default {
  props: ['text', 'user', 'sticker', 'stickerCategory'],
  components: { Avatar, NameBadge, Sticker },
}
</script>

<style scoped>
.line {
  margin-top: 2px;
  word-break: break-all;
}
</style>