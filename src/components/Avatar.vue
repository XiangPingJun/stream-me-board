<template>
	<div class="avatar" :style="style" />
</template>

<script>
export default {
	props: ['index', 'large', 'whoAmI'],
	computed: {
		style() {
			let sideLen, name, size, idx
			if (this.large) {
				sideLen = 32
				size = 'large'
			} else {
				sideLen = 24
				size = 'small'
			}
			if (this.index < 0) {
				name = 'special'
				idx = -1 * this.index + 1
			} else {
				name = 'character'
				idx = this.index - 1
			}
			return {
				'background-image': `url(static/${name}-${size}.png)`,
				'background-position-x': sideLen * (idx % 10) + 'px',
				'background-position-y': sideLen * Math.floor(idx / 10) + 'px',
				'width': sideLen + 'px',
				'height': sideLen + 'px',
				'filter': this.whoAmI ? 'brightness(0%)' : 'initial',
			}
		}
	}
}
</script>

<style scoped>
.avatar {
  display: inline-block;
  border: none;
}
</style>