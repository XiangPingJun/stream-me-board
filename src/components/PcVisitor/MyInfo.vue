<template>
	<div class="container">
    <img src="../../assets/thumbnail-border.png">
    <div class="right">
		  <div><underline-text>未登錄的訪客</underline-text></div>
      <div>(輸入暱稱一起來玩吧!)</div>
    </div>
	</div>
</template>

<script>
import UnderlineText from '../UnderlineText'

export default {
  components: {
    'underline-text': UnderlineText
  }
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: flex-start;
}
.right {
  margin-left: 10px;
  align-self: center;
}
</style>