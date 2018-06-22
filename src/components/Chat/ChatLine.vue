<template>
	<div class="line">
		<Avatar :index="user.avatarSelected" class="vertical" :preserved="user.preserved"/>
    <NameBadge :user="user"/>
    <span>{{text}}</span>
    <Sticker v-if="!isNaN(sticker)" :index="sticker" :category="stickerCategory" size="100" align='middle' style="margin-left:5px" />
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