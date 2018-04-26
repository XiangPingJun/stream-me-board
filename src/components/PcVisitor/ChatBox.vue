<template>
	<div>
    <div class="chat-list">
      <chat-line />
      <chat-line />
      <chat-line />
    </div>
    <div class="mask top"></div>
    <div class="mask bottom"></div>    
    <input-box placeholder="說點什麼吧：" class="input" />
	</div>
</template>

<script>
import Well from '../Well'
import ChatLine from '../ChatLine'
import InputBox from '../InputBox'

export default {
  components: {
    'well': Well,
    'chat-line': ChatLine,
    'input-box': InputBox,
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