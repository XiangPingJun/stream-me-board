<template>
	<div>
  	<ChatBubble v-for="chat in chats" :key="chat.id" ref="bubbles" :chat="chat" :dummy="dummy"/>
	</div>
</template>

<script>
import { getWindowWidth, getWindowHeight } from '../../common'
import ChatBubble from './ChatBubble'
import { mapGetters, mapActions } from 'vuex'
import { clearInterval, setTimeout, setInterval } from 'timers';

const CHAT_TIMEOUT = 5000

export default {
	data() { return { chats: [], rmObsoleteHandler: null, dummy: null } },
	components: { ChatBubble },
	computed: { ...mapGetters(['chatLines']) },
	watch: {
		chatLines(val, oldVal) {
			val.forEach(chatLine => {
				if (!this.chats.find(chat => chat.id == chatLine.id))
					this.chats.push({ ...chatLine })
			})
			this.rmObsolete()
			setTimeout(() => this.placeChat())
			setTimeout(() => this.placeChat())
		}
	},
	methods: {
		rmObsolete() {
			this.chats = this.chats.filter(chat => new Date().getTime() - chat.time.seconds * 1000 < CHAT_TIMEOUT)
		},
		placeChat() {
			this.chats.forEach((chat, i) => {
				chat.width = this.$refs.bubbles[i].width
				chat.height = this.$refs.bubbles[i].height
			})
			const chatHasPosition = this.chats.filter(chat => chat.x)
			this.chats.forEach(chat => {
				if (undefined != chat.x)
					return
				let farest = -1
				let farestCandidate = null
				Array.apply(null, new Array(20)).map(() => {
					const randX = Math.random() * (getWindowWidth() - chat.width - 20)
					const randY = Math.random() * (getWindowHeight() - chat.height - 20)
					let x = 1, y = 1
					const rand = Math.floor(Math.random() * 3)
					if (0 == rand) {
						x = getWindowWidth() - chat.width - 20
						y = randY
					} else if (1 == rand)
						x = randX
					else
						y = randY
					return {
						x, y,
						centerX: x + chat.width / 2,
						centerY: y + chat.height / 2,
					}
				}).forEach(candidate => {
					farestCandidate = farestCandidate || candidate
					let totalDistance = 0
					chatHasPosition.forEach(item => {
						const xDiff = candidate.centerX - item.centerX
						const yDiff = candidate.centerY - item.centerY
						totalDistance += Math.sqrt(xDiff * xDiff + yDiff * yDiff)
					})
					if (totalDistance > farest) {
						farestCandidate = candidate
						farest = totalDistance
					}
				})
				chat.x = farestCandidate.x
				chat.y = farestCandidate.y
				chat.centerX = farestCandidate.centerX
				chat.centerY = farestCandidate.centerY
			})
			this.dummy = Math.random()
		}
	},
	mounted() {
		this.rmObsoleteHandler = setInterval(() => this.rmObsolete(), 1000)
	},
	beforeDestroy() {
		clearInterval(this.rmObsoleteHandler)
	}
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
</style>