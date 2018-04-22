<template>
	<div class="thumbnail" :style="style" />
</template>

<script>
export default {
	props: ['index'],
	computed: {
		style() {
			return {
				'background-position-x': 32 * (this.index % 10) + 'px',
				'background-position-y': 32 * Math.floor(this.index / 10) + 'px',
			}
		}
	}
}
</script>

<style scoped>
.thumbnail {
  display: inline-block;
  width: 32px;
  height: 32px;
  border: none;
  background: url(../assets/character.png);
}
</style>