<template>
	<img class="avatar" :style="style" src="static/blank.png" :align="align"/>
</template>

<script>
export default {
	props: ['index', 'large', 'whoAmI', 'preserved', 'align'],
	computed: {
		style() {
			let sideLen, size
			const name = this.preserved ? 'preserved' : 'character'
			if (this.large) {
				sideLen = 32
				size = 'large'
			} else {
				sideLen = 24
				size = 'small'
			}
			return {
				'background-image': `url(static/${name}-${size}.png)`,
				'background-position-x': -1 * sideLen * (this.index % 10) + 'px',
				'background-position-y': -1 * sideLen * Math.floor(this.index / 10) + 'px',
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