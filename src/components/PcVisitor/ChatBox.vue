<template>
	<dialog-box ref="dialog">
    <div>
      <chat-line />
    </div>
    <input-box placeholder="說點什麼吧…" style="margin-top: 10px; margin-bottom: 5px;" />
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
  }
}
</script>

<style scoped>

</style>