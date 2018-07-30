<template>
	<div>
  	<ComicBubble ref="bubble" :x="chat.x" :y="chat.y" :dummy="dummy"
			:style="{visibility:chat.x?'visible':'hidden'}" :class="{jello:chat.x, animated:chat.x}">
			<Avatar :index="user.avatarSelected" :preserved="user.preserved" style="vertical-align: middle;"/>
			<NameBadge :user="user"/>
			<span class="text">{{chat.text}}</span>
			<Sticker v-if="!isNaN(sticker)" :index="sticker" :category="stickerCategory" size="75" align='top' style="margin-left:5px"/>
		</ComicBubble>
	</div>
</template>

<script>
import ComicBubble from './ComicBubble'
import Avatar from '../Avatar'
import NameBadge from '../NameBadge'
import Sticker from '../Sticker'
import { mapGetters, mapState } from 'vuex'

export default {
	props: ['chat', 'dummy', 'sticker', 'stickerCategory'],
	components: { ComicBubble, NameBadge, Avatar, Sticker },
	computed: {
		user() { return this.allUsers[this.chat.uid] },
		width() { return this.$refs.bubble.width },
		height() { return this.$refs.bubble.height },
		...mapState(['allUsers']),
	},
}
</script>

<style>
.text {
  word-break: break-all;
  line-height: 23px;
}
</style>