<template>
	<dialog-box>
    <div style="overflow-y: hidden">
      <chat-line />
      <chat-line />
    </div>
	</dialog-box>
</template>

<script>
import DialogBox from '../DialogBox'
import Well from '../Well'
import ChatLine from '../ChatLine'

export default {
  components: {
    'dialog-box': DialogBox,
    'well': Well,
    'chat-line': ChatLine,
  }
}
</script>

<style scoped>

</style>