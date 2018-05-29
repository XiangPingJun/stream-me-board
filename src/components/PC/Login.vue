<template>
  <DialogBox style="margin-bottom:5px;">
		<div style="margin-bottom:10px;">ヽ(ﾟ▽ﾟ)ノ 歡迎！怎麼稱呼呢？</div>
		<div><InputBox ref="input" placeholder="輸入暱稱吧:↵" @submit="onSubmit" :loading="loading" class="input" /></div>
		<Invisible ref="invisible">
			<DialogBox>{{userNameTest}}</DialogBox>
		</Invisible>
  </DialogBox>
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
			if ('promptLogin' === action.type) {
				this.$refs.input.focus()
				this.$refs.input.text = ''
				this.loading = false
			}
		})
	},
	methods: {
		onSubmit(text) {
			this.userNameTest = text
			setTimeout(() => {
				if (this.$refs.invisible.getWidth() > 210)
					return this.notify({ type: 'error', text: '暱稱太長了喲！' })
				this.loading = true
				this.loginVisitor(text)
			})
		},
		...mapActions(['loginVisitor', 'notify'])
	},
	beforeDestroy() {
		this.unsubscribeAction()
	}
}
</script>

<style scoped>
</style>