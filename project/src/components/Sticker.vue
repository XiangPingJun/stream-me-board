<template>
	<img class="sticker" :style="style" src="static/blank.png" :align="align"/>
</template>

<script>
export default {
	props: ['index', 'category', 'size', 'align'],
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