<template>
  <div>
		<div style="margin-bottom:10px;">歡迎！怎麼稱呼呢？</div>
		<div><input-box placeholder="輸入暱稱吧：" class="input" focusAtStart="true" /></div>
  </div>
</template>

<script>
import UnderlineText from '../UnderlineText'
import DialogBox from '../DialogBox'
import Button from '../Button'
import InputBox from '../InputBox'

export default {
	components: {
		'underline-text': UnderlineText,
		'input-box': InputBox,
	}
}
</script>

<style scoped>

</style>