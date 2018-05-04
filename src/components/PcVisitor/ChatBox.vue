<template>
	<DialogBox overflowY="auto">
    <div class="chat-list">
      <ChatLine />
      <ChatLine />
      <ChatLine />
    </div>
    <div class="mask top"></div>
    <div class="mask bottom"></div>    
    <InputBox placeholder="說點什麼吧:↵" ref="input" @focus="onInputFocus" class="input" maxlength="140" />
	</DialogBox>
</template>

<script>
import ChatLine from '../ChatLine'
import InputBox from '../InputBox'
import DialogBox from '../DialogBox'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  components: { ChatLine, InputBox, DialogBox },
  computed: { ...mapGetters(['myInfo']) },
  methods: {
    onInputFocus() {
      if (null !== this.myInfo)
        return
      this.promptLogin()
      this.$refs.input.unfocus()
    },
    ...mapActions(['promptLogin'])
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
  padding-bottom: 35px;
}
</style>