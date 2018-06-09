<template>
  <div>
		<div style="margin-bottom:10px;" class="yellow">{{notifyText}}</div>
		<div><InputBox ref="input" placeholder="輸入暱稱吧:↵" @submit="onSubmit" :loading="loading" class="input"/></div>
		<Invisible ref="invisible">{{userNameTest}}</Invisible>
  </div>
</template>

<script>
import InputBox from '../InputBox'
import Invisible from '../Invisible'
import { mapActions } from 'vuex'

export default {
	components: { InputBox, Invisible },
	data() {
		return {
			userNameTest: '',
			unsubscribeAction: () => { },
			loading: false,
			notifyText: 'ヽ(ﾟ▽ﾟ)ノ 歡迎！怎麼稱呼呢？'
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
				if (this.$refs.invisible.getWidth() > 226)
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