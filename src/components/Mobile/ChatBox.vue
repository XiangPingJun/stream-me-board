<template>
	<Content overflowY="auto" ref="chatBox">
    <div class="chat-list animated fadeIn">
      <ChatLine v-for="(line, i) in chatLines.slice(-150)" :key="i" :user="allUsers[line.uid]" :text="line.text" :class="lineClass(line.id)"/>
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
  data() { return { showScrollToBottom: false, scrollContent: null, height: 0, newLineIds: [] } },
  components: { ChatLine, InputBox, Content, DarkButton },
  computed: { ...mapState(['allUsers', 'chatLines']), ...mapGetters(['myInfo']) },
  mounted() {
    this.scrollContent = this.$refs.chatBox.$refs.content
    this.scrollContent.addEventListener('scroll', () => {
      setTimeout(() => this.showScrollToBottom = !this.isScrollBottom())
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
      return this.scrollContent.offsetHeight + this.scrollContent.scrollTop < this.scrollContent.scrollHeight + 200
    },
    scrollToBottom() {
      this.scrollContent.scrollTo(0, this.scrollContent.scrollHeight)
      this.showScrollToBottom = false
    },
    submit(text) {
      this.sendChat({
        uid: this.myInfo.uid,
        text: text,
      })
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
        setTimeout(() => this.scrollToBottom())
      if (oldVal.length > 0)
        this.newLineIds = newVal.filter(newLine => !oldVal.find(oldLine => oldLine.id == newLine.id)).map(line => line.id)
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