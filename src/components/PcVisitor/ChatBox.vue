<template>
	<dialog-box>
    <div class="container">
      <well>qwq</well>
      <div class="right">
        <div>(輸入暱稱一起來玩吧!)</div>
        <div>(輸入暱稱一起來玩吧!)</div>
      </div>
    </div>
	</dialog-box>
</template>

<script>
import DialogBox from '../DialogBox'
import Well from '../Well'

export default {
  components: {
    'dialog-box': DialogBox,
    'well': Well
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