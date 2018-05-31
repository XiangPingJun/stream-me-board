<template>
	<div>
  	<ComicBubble ref="bubble" :x="chat.x" :y="chat.y" style="opacity:0.75" :dummy="dummy"
			:style="{visibility:chat.x?'visible':'hidden'}" :class="{jello:chat.x, animated:chat.x}">
			<NameBadge :user="user"/>
			<span class="text">{{chat.text}}</span>
		</ComicBubble>
	</div>
</template>

<script>
import ComicBubble from './ComicBubble'
import NameBadge from '../NameBadge'
import { mapGetters } from 'vuex'

export default {
	props: ['chat', 'dummy'],
	components: { ComicBubble, NameBadge },
	computed: {
		user() { return this.allUsers[this.chat.uid] },
		width() { return this.$refs.bubble.width },
		height() { return this.$refs.bubble.height },
		...mapGetters(['allUsers']),
	},
}
</script>

<style>
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
  box-shadow: 2px 2px #86674d;
}
.text {
  word-break: break-all;
}
</style>