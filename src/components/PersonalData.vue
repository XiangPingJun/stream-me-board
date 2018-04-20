<template>
	<div>
		<underline-text>未登錄的訪客</underline-text>
	</div>
</template>

<script>
import UnderlineText from './UnderlineText'

export default {
	components: {
		'underline-text': UnderlineText
	}
}
</script>

<style scoped>
.underline {
  padding-bottom: 3px;
  border-bottom: 3px solid #dbccb6;
}
.underline > span {
  padding-bottom: 6px;
  border-bottom: 3px solid #705749;
}
.underline-dot {
  width: 3px;
  display: inline-block;
}
</style>