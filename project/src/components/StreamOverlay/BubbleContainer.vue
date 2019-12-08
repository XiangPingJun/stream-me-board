<template>
  <div>
    <ChatBubble
      v-for="chat in chats"
      ref="bubbles"
      :chat="chat"
      :sticker="chat.sticker"
      :stickerCategory="chat.stickerCategory"
      :key="chat.id"
      :dummy="dummy"
    />
  </div>
</template>

<script>
import { getWindowWidth, getWindowHeight, DISPLAY_TIMEOUT } from '../../common'
import ChatBubble from './ChatBubble'
import { mapActions, mapState } from 'vuex'

export default {
  data() { return { chats: [], dummy: null, history: {} } },
  components: { ChatBubble },
  computed: { ...mapState(['chatLines']) },
  watch: {
    chatLines(val, oldVal) {
      val.forEach(chatLine => {
        if (!this.history[chatLine.id]) {
          this.chats.push({ ...chatLine, displayTime: new Date().getTime() })
          this.history[chatLine.id] = true
        }
      })
      this.rmObsolete()
      this.$nextTick(() => this.placeChat())
    }
  },
  methods: {
    rmObsolete() {
      this.chats = this.chats.filter(chat => new Date().getTime() - chat.displayTime < DISPLAY_TIMEOUT)
    },
    placeChat() {
      this.chats.forEach((chat, i) => {
        chat.width = this.$refs.bubbles[i].width
        chat.height = this.$refs.bubbles[i].height
      })
      this.chats.forEach(chat => {
        if (undefined != chat.x)
          return
        const chatHasPosition = this.chats.filter(chat => chat.x)
        let farest = -1
        const degrees = [
          toDegree(0, getWindowHeight()), toDegree(getWindowWidth(), getWindowHeight())
          , ...chatHasPosition.map(chat => toDegree(chat.centerX, chat.centerY))
        ].sort((a, b) => a > b)
        let freeSpaceDegree
        let largest = -1
        for (let i = 0; i < degrees.length - 1; i++) {
          const diff = degrees[i + 1] - degrees[i]
          if (diff > largest) {
            freeSpaceDegree = (degrees[i] + degrees[i + 1]) / 2
            largest = diff
          }
        }
        let closestDistance = Infinity
        let closestCandidate = null
        new Array(30).fill(0).map(() => {
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
          closestCandidate = closestCandidate || candidate
          const degree = toDegree(candidate.centerX, candidate.centerY)
          const distance = Math.abs(freeSpaceDegree - degree)
          if (distance < closestDistance) {
            closestCandidate = candidate
            closestDistance = distance
          }
        })
        chat.x = closestCandidate.x
        chat.y = closestCandidate.y
        chat.centerX = closestCandidate.centerX
        chat.centerY = closestCandidate.centerY
      })

      function toDegree(x, y) {
        const [xx, yy] = [x - getWindowWidth() / 2, getWindowHeight() / 2 - y]
        let degree = Math.atan2(yy, xx) * 180 / Math.PI
        return Math.floor((degree + 360 + 90) % 360)
      }
      this.dummy = Math.random()
    }
  },
  mounted() {
    this.rmObsoleteHandler = setInterval(() => this.rmObsolete(), 1000)
  },
  beforeDestroy() { clearInterval(this.rmObsoleteHandler) }
}
</script>