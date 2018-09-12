<template>
	<Content overflowY="auto" ref="chatBox">
    <div class="chat-list">
      <div v-for="(line, key) in chatLines.slice(-300)" :key="key">
        <ChatLine v-if="allUsers[line.uid]" :user="allUsers[line.uid]" :text="line.text" :sticker="line.sticker" :stickerCategory="line.stickerCategory" :class="lineClass(line.id)"/>
      </div>
    </div>
    <div class="mask"></div>
    <div style="display:flex; justify-content: center;">
      <InputBox placeholder="說點什麼吧:↵" ref="input" @focus="onInputFocus" @submit="submit" class="input animated flipInX" maxlength="140"/>
    </div>
    <div v-if="showScrollToBottom" class="scroll-to-bottom">
      <DarkButton @click="scrollToBottom"><i class="fas fa-chevron-down"/></DarkButton>
    </div>
	</Content>
</template>

<script>
import ChatLine from './ChatLine'
import InputBox from './InputBox'
import Content from './Content'
import DarkButton from '../DarkButton'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  props: ['visible'],
  data() { return { showScrollToBottom: false, scrollContent: null, height: 0, newLineIds: [] } },
  components: { ChatLine, InputBox, Content, DarkButton },
  computed: { ...mapState(['allUsers', 'chatLines']), ...mapGetters(['myInfo']) },
  mounted() {
    this.scrollContent = this.$refs.chatBox.$refs.content
    this.scrollContent.addEventListener('scroll', () => {
      this.$nextTick(() => this.showScrollToBottom = !this.isScrollBottom())
    })
    this.scrollToBottom()
    this.heightInterval = setInterval(() => {
      if (this.$el.clientHeight == this.height)
        return
      this.scrollToBottom()
      this.height = this.$el.clientHeight
    })
  },
  beforeDestroy() { clearInterval(this.heightInterval) },
  methods: {
    onInputFocus() {
      if (this.myInfo.name)
        return
      this.promptLogin()
    },
    isScrollBottom() {
      return this.scrollContent.offsetHeight + this.scrollContent.scrollTop + 100 > this.scrollContent.scrollHeight
    },
    scrollToBottom() {
      this.scrollContent.scrollTo(0, this.scrollContent.scrollHeight)
      this.showScrollToBottom = false
    },
    submit(text) {
      this.sendChat({ text: text })
      this.$refs.input.text = ''
      this.$refs.input.unfocus()
      this.scrollToBottom()
    },
    lineClass(id) {
      if (this.newLineIds.indexOf(id) >= 0)
        return 'animated flipInX'
    },
    ...mapActions(['promptLogin', 'sendChat'])
  },
  watch: {
    chatLines(newVal, oldVal) {
      if (!this.showScrollToBottom)
        this.$nextTick(() => this.scrollToBottom())
      if (oldVal.length > 0)
        this.newLineIds = newVal.filter(newLine => !oldVal.find(oldLine => oldLine.id == newLine.id)).map(line => line.id)
    },
    visible(newVal, oldVal) {
      if (newVal && this.$refs.input.text)
        this.$refs.input.focus()
    }
  }
}
</script>

<style scoped>
.input {
  margin-top: 4px;
  position: absolute;
  top: 0px;
  width: calc(100% - 12px);
}
.mask {
  box-shadow: 0 0 0 22px #917863;
  position: absolute;
  width: calc(100%);
  top: 18px;
}
.scroll-to-bottom {
  position: absolute;
  bottom: 10px;
  right: 4px;
  display: flex;
  opacity: 0.8;
}
.fas.fa-chevron-down {
  margin: 3px;
}
.chat-list {
  padding-top: 35px;
}
</style>