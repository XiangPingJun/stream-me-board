<template>
  <div style="margin-bottom:5px;">
		<div style="margin-bottom:10px;">ヽ(ﾟ▽ﾟ)ノ 歡迎！怎麼稱呼呢？</div>
		<div><InputBox ref="input" placeholder="輸入暱稱吧:↵" @submit="onSubmit" class="input" /></div>
		<Invisible ref="invisible">
			<DialogBox>{{userNameTest}}</DialogBox>
		</Invisible>
  </div>
</template>

<script>
import DialogBox from '../DialogBox'
import InputBox from '../InputBox'
import Invisible from '../Invisible'
import { mapActions } from 'vuex'

export default {
	components: { InputBox, Invisible, DialogBox },
	data() {
		return {
			userNameTest: ''
		}
	},
	mounted() {
		this.$refs.input.focus()
		this.$store.subscribeAction((action, state) => {
			if ('promptLogin' === action.type)
				this.$refs.input.focus()
		})
	},
	methods: {
		onSubmit(text) {
			this.userNameTest = text
			setTimeout(() => {
				console.log(2, this.$refs.invisible.getWidth())
			})
		},
		...mapActions(['login'])
	},
}
</script>

<style scoped>

</style>