<template>
	<DialogBox overflowY="auto" ref="chatBox">
    <div class="chat-list">
      <ChatLine v-for="(line, key) in chatLines" :key="key" :user="allUsers[line.uid]" :text="line.text" class="animated flipInX" />
    </div>
    <div class="mask top"></div>
    <div class="mask bottom"></div>
    <InputBox placeholder="說點什麼吧:↵" ref="input" @focus="onInputFocus" @submit="submit" class="input" maxlength="140" />
    <div v-if="showScrollToBottom" class="scroll-to-bottom">
      <DarkButton v-tooltip.left="{content:'查看新留言', offset:3}" @click="scrollToBottom"><i class="fas fa-chevron-down" /></DarkButton>
    </div>
	</DialogBox>
</template>

<script>
import ChatLine from '../ChatLine'
import InputBox from '../InputBox'
import DialogBox from '../DialogBox'
import DarkButton from '../DarkButton'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      showScrollToBottom: false,
      scrollContent: null,
    }
  },
  components: { ChatLine, InputBox, DialogBox, DarkButton },
  computed: { ...mapGetters(['myInfo', 'chatLines', 'allUsers']) },
  mounted() {
    this.scrollContent = this.$refs.chatBox.$refs.content
    this.scrollToBottom()
  },
  methods: {
    onInputFocus() {
      if (this.myInfo.name)
        return
      this.promptLogin()
      this.$refs.input.unfocus()
    },
    isScrollBottom() {
      return this.scrollContent.offsetHeight + this.scrollContent.scrollTop == this.scrollContent.scrollHeight
    },
    scrollToBottom() {
      this.scrollContent.scrollTo(0, this.scrollContent.scrollHeight)
      this.showScrollToBottom = false
    },
    submit(text) {
      this.submitChat({
        uid: this.myInfo.uid,
        text: text,
      })
      this.$refs.input.text = ''
      this.scrollToBottom()
    },
    ...mapActions(['promptLogin', 'submitChat'])
  },
  watch: {
    chatLines(newVal, oldVal) {
      if (this.isScrollBottom())
        setTimeout(() => this.scrollToBottom())
      else
        this.showScrollToBottom = !this.isScrollBottom()
    }
  }
}
</script>

<style scoped>
.input {
  margin-top: 10px;
  margin-bottom: 5px;
  position: absolute;
  bottom: 5px;
  width: calc(100% - 24px);
}
.mask {
  box-shadow: 0 0 0 8px #917863;
  position: absolute;
  width: calc(100% - 28px);
}
.mask.top {
  bottom: 40px;
}
.mask.bottom {
  bottom: 8px;
}
.chat-list {
  padding-bottom: 40px;
}
.scroll-to-bottom {
  position: absolute;
  bottom: 45px;
  display: flex;
}
.fas.fa-chevron-down {
  margin: 3px;
  opacity: 0.75;
}
</style>