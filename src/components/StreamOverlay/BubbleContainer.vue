<template>
	<div>
  	<ComicBubble v-for="(chat, key) in chats" :key="key" ref="bubbles" :x="chat.x" :y="chat.y">
			{{chat.text}}
		</ComicBubble>
	</div>
</template>

<script>
import { getWindowWidth, getWindowHeight } from '../../common'
import ComicBubble from './ComicBubble'
import { mapGetters, mapActions } from 'vuex'
import { clearInterval, setTimeout } from 'timers';
import Vue from 'vue';

const CHAT_TIMEOUT = 5000

export default {
	data() { return { chats: [], rmObsoleteHandler: null } },
	components: { ComicBubble },
	computed: { ...mapGetters(['chatLines']) },
	watch: {
		chatLines(val, oldVal) {
			val.forEach(chatLine => {
				if (!this.chats.find(chat => chat.id == chatLine.id))
					this.chats.push({ ...chatLine })
			})
			this.rmObsolete()
			setTimeout(() => this.placeChats())
		}
	},
	methods: {
		rmObsolete() {
			//this.chats = this.chats.filter(chat => new Date().getTime() - chat.time.seconds * 1000 < CHAT_TIMEOUT)
		},
		placeChats() {
			for (let k = 0; k < this.chats.length; k++) {
				const chatHasPosition = this.$refs.bubbles.filter(bubble => bubble.hasPosition)
				const chatVueObj = this.$refs.bubbles[k]
				const candidate = Array.apply(null, new Array(20)).map(() => {
					const x = Math.random() * (getWindowWidth() - chatVueObj.width)
					const y = Math.random() * (getWindowHeight() - chatVueObj.height)
					return {
						x, y,
						centerX: x + chatVueObj.width,
						centerY: y + chatVueObj.height,
					}
				})
				let farest = -1
				let farestCandidate = candidate[0]
				for (let i = 0; i < candidate.length; i++) {
					for (let j = 0; j < chatHasPosition.length; j++) {
						const xDiff = candidate[i].centerX - chatHasPosition[j].centerX
						const yDiff = candidate[i].centerY - chatHasPosition[j].centerY
						const distance = xDiff * xDiff + yDiff * yDiff
						if (distance > farest) {
							farestCandidate = candidate[i]
							farest = distance
						}
					}
				}
				this.chats[k].x = farestCandidate.x
				this.chats[k].y = farestCandidate.y
			}
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