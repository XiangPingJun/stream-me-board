<template>
	<dialog-box ref="dialog">
    <div class="msgList">
      <chat-line />
      <chat-line />
    </div>
    <input-box />
	</dialog-box>
</template>

<script>
import DialogBox from '../DialogBox'
import Well from '../Well'
import ChatLine from '../ChatLine'
import InputBox from '../InputBox'

export default {
  components: {
    'dialog-box': DialogBox,
    'well': Well,
    'chat-line': ChatLine,
    'input-box': InputBox,
  },
  computed: {
    msgList() {
      console.log(this.$refs)
      return {
        'height': '70px',
        'overflow-y': 'auto'
      }
    }
  }
}
</script>

<style scoped>

</style>