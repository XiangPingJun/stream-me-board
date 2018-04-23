<template>
	<dialog-box>
    <chat-line />
    <chat-line />
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