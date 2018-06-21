<template>
	<div class="sticker" :style="style"/>
</template>

<script>
export default {
	props: ['index', 'category', 'size'],
	computed: {
		style() {
			let rate = 1
			if (this.size)
				rate = this.size / 100
			return {
				'background-image': 'url(static/sticker.png)',
				'background-size': `${200 * rate}px ${1900 * rate}px`,
				'background-position-x': `${-100 * rate * this.category}px`,
				'background-position-y': `${-100 * rate * this.index}px`,
				'width': `${this.size}px`,
				'height': `${this.size}px`,
			}
		}
	}
}
</script>

<style scoped>
.sticker {
  display: inline-block;
  border: none;
}
</style>