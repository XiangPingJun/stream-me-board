<template>
  <div style="margin-bottom:5px;">
		<div style="margin-bottom:10px;">ヽ(ﾟ▽ﾟ)ノ 歡迎！怎麼稱呼呢？</div>
		<div><InputBox ref="input" placeholder="輸入暱稱吧:↵" @submit="login" class="input" /></div>
  </div>
</template>

<script>
import DialogBox from '../DialogBox'
import Button from '../Button'
import InputBox from '../InputBox'
import { mapActions } from 'vuex'

export default {
	components: { InputBox, },
	mounted() {
		this.$refs.input.focus()
		this.$store.subscribeAction((action, state) => {
			if ('promptLogin' === action.type)
				this.$refs.input.focus()
		})
	},
	methods: { ...mapActions(['login']) },
}
</script>

<style scoped>

</style>