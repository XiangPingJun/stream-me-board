<template>
	<div class="intro">
    <div class="MobileFont welcome animated flipInX">
      Welcome to our show !!
    </div>
		<img src="static/us.png" class="animated flipInY">
		<div class="MobileFont animated infinite pulse dismiss">
      &gt;&gt; Click to continue &lt;&lt;
    </div>
	</div>
</template>

<script>
export default {
	mounted() {
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
  animation-duration: 3s;
  color: #99befd !important;
  text-shadow: 0px 2px #5b6ee1 !important;
  font-size: 20px;
  font-weight: bold;
}
</style>