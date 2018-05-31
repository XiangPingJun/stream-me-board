<template>
	<img :class="cssClass" src="static/arrow.png"/>
</template>

<script>
export default {
	data() {
		return {
			cssClass: ''
		}
	},
	mounted() {
		this.cssClass = 'animated jello'
	},
	methods: {
		animate() {
			this.cssClass = ''
			setTimeout(() => {
				this.cssClass = 'animated jello'
			}, 100)
		}
	}
}
</script>

<style scoped>
img {
  position: fixed;
  z-index: 99999;
}
</style>