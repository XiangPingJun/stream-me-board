<template>
	<div class="intro" v-if="imgLoaded">
    <div class="MobileFont welcome animated flipInX">
      Welcome to our show !!
    </div>
		<img src="static/us.png" class="animated flipInY">
		<div class="animated infinite pulse dismiss blue">
      <a>( Click to continue )</a>
    </div>
	</div>
</template>

<script>
export default {
	data() { return { imgLoaded: false } },
	mounted() {
		const img = new Image()
		img.src = 'static/us.png'
		img.onload = () => this.imgLoaded = true
		document.body.style.cursor = 'pointer'
	},
	beforeDestroy() {
		document.body.style.cursor = 'default'
	}
}
</script>

<style scoped>
.intro {
  text-align: center;
}
.welcome {
  font-size: 60px;
  font-weight: bold;
}
.dismiss {
  font-size: 20px;
  font-weight: bold;
  animation-duration: 3s;
}
</style>