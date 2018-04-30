<template>
  <div style="margin-bottom:5px;">
		<div style="margin-bottom:10px;">ヽ(ﾟ▽ﾟ)ノ 歡迎！怎麼稱呼呢？</div>
		<div><input-box ref="input" placeholder="輸入暱稱吧:↵" :submit="login" class="input" /></div>
  </div>
</template>

<script>
import UnderlineText from '../UnderlineText'
import DialogBox from '../DialogBox'
import Button from '../Button'
import InputBox from '../InputBox'
import { mapActions } from 'vuex'

export default {
	components: {
		'underline-text': UnderlineText,
		'input-box': InputBox,
	},
	methods: { ...mapActions(['login']) },
	mounted() {
		this.$store.subscribe((mutation, state) => {
			if ('showLoginDialog' === mutation.type)
				this.$refs.input.focus()
		})
	}
}
</script>

<style scoped>

</style>