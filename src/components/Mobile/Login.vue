<template>
  <Content>
		<div class="animated flipInX">
			<div style="display:flex; justify-content:center; align-items:center;">
				<InputBox ref="input" placeholder="輸入暱稱吧:↵" @submit="onSubmit" :loading="loading" class="input"/>
			</div>
			<div style="margin-top:10px;">ヽ(ﾟ▽ﾟ)ノ 歡迎！怎麼稱呼呢？</div>
		</div>
		<Invisible ref="invisible">{{userNameTest}}</Invisible>
  </Content>
</template>

<script>
import Content from './Content'
import InputBox from './InputBox'
import Invisible from '../Invisible'
import { mapActions } from 'vuex'

export default {
	components: { InputBox, Invisible, Content },
	data() { return { userNameTest: '', loading: false } },
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
}
</script>

<style scoped>
.input {
  width: calc(100vw - 20px);
}
</style>