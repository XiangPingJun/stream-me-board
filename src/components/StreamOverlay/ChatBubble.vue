<template>
	<div>
  	<ComicBubble ref="bubble" :x="chat.x" :y="chat.y" style="opacity:0.75" :dummy="dummy"
			:style="{visibility:chat.x?'visible':'hidden'}" :class="{jello:chat.x, animated:chat.x}">
			<Avatar :index="user.selectedAvatar" style="vertical-align: middle;"/>
			<NameBadge :user="user"/>
			<span class="text">{{chat.text}}</span>
		</ComicBubble>
	</div>
</template>

<script>
import ComicBubble from './ComicBubble'
import Avatar from '../Avatar'
import NameBadge from '../NameBadge'
import { mapGetters } from 'vuex'

export default {
	props: ['chat', 'dummy'],
	components: { ComicBubble, NameBadge, Avatar },
	computed: {
		user() { return this.allUsers[this.chat.uid] },
		width() { return this.$refs.bubble.width },
		height() { return this.$refs.bubble.height },
		...mapGetters(['allUsers']),
	},
}
</script>

<style>
.text {
  word-break: break-all;
  line-height: 23px;
}
</style>