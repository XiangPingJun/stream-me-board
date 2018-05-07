<template>
	<DialogBox overflowY="auto" ref="chatBox">
    <div class="chat-list">
      <ChatLine v-for="(line, key) in chatLines" :key="key" :data="line" class="animated flipInX" />
    </div>
    <div class="mask top"></div>
    <div class="mask bottom"></div>
    <InputBox placeholder="說點什麼吧:↵" ref="input" @focus="onInputFocus" @submit="submit" class="input" maxlength="140" />
    <div v-if="showScrollToBottom" class="scroll-to-bottom">
      <DarkButton v-tooltip.left="{content:'查看新留言', offset:3}" @click="scrollToButton"><i class="fas fa-chevron-down" /></DarkButton>
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
  computed: { ...mapGetters(['myInfo', 'chatLines']) },
  mounted() {
    this.scrollContent = this.$refs.chatBox.$refs.content
    this.scrollToButton()
  },
  methods: {
    onInputFocus() {
      if (null !== this.myInfo)
        return
      this.promptLogin()
      this.$refs.input.unfocus()
    },
    isScrollBottom() {
      return this.scrollContent.offsetHeight + this.scrollContent.scrollTop == this.scrollContent.scrollHeight
    },
    scrollToButton() {
      this.scrollContent.scrollTo(0, this.scrollContent.scrollHeight)
      this.showScrollToBottom = false
    },
    submit(text) {
      this.submitChat({
        name: this.myInfo.name,
        thumbnail: this.myInfo.thumbnailSelected,
        text: text,
      })
      this.$refs.input.text = ''
      this.scrollToButton()
    },
    ...mapActions(['promptLogin', 'submitChat'])
  },
  watch: {
    chatLines(newVal, oldVal) {
      if (this.isScrollBottom())
        setTimeout(() => this.scrollToButton())
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