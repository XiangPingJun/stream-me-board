<template>
	<div class="thumbnail" :style="style" />
</template>

<script>
export default {
	props: ['index', 'large', 'whoAmI'],
	computed: {
		style() {
			const sideLen = this.large ? 32 : 24
			return {
				'background-image': `url(static/character-${this.large ? 'large' : 'small'}.png)`,
				'background-position-x': sideLen * (this.index % 10) + 'px',
				'background-position-y': sideLen * Math.floor(this.index / 10) + 'px',
				'width': sideLen + 'px',
				'height': sideLen + 'px',
				'filter': this.whoAmI ? 'brightness(0%)' : 'initial',
			}
		}
	}
}
</script>

<style scoped>
.thumbnail {
  display: inline-block;
  border: none;
}
</style>