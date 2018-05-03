<template>
  <div style="margin-bottom:5px;">
		<div style="margin-bottom:10px;">ヽ(ﾟ▽ﾟ)ノ 歡迎！怎麼稱呼呢？</div>
		<div><InputBox ref="input" placeholder="輸入暱稱吧:↵" @submit="onSubmit" :loading="loading" class="input" /></div>
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
			userNameTest: '',
			unsubscribeAction: () => { },
			loading: false,
		}
	},
	mounted() {
		this.$refs.input.focus()
		this.unsubscribeAction = this.$store.subscribeAction((action, state) => {
			if ('promptLogin' === action.type)
				this.$refs.input.focus()
		})
	},
	methods: {
		onSubmit(text) {
			this.loading = true
			this.userNameTest = text
			setTimeout(() => {
				if (this.$refs.invisible.getWidth() > 210)
					return this.errMsg('暱稱太長了喲！')
				this.login(text)
			})
		},
		...mapActions(['login', 'errMsg'])
	},
	beforeDestroy() {
		this.unsubscribeAction()
	}
}
</script>

<style scoped>

</style>