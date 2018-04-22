<template>
  <dialog-box>
    <div class="container">
      <div class="thumbnail-box">
        <thumbnail index="0" />
      </div>
      <div class="right">
        <div><underline-text>未登錄的訪客</underline-text></div>
        <div>(輸入暱稱一起來玩吧!)</div>
      </div>
    </div>
  </dialog-box>
</template>

<script>
import UnderlineText from '../UnderlineText'
import DialogBox from '../DialogBox'
import Thumbnail from '../Thumbnail'

export default {
  components: {
    'underline-text': UnderlineText,
    'dialog-box': DialogBox,
    'thumbnail': Thumbnail,
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
.thumbnail-box {
  width: 48px;
  height: 51px;
  padding-top: 15px;
  padding-left: 15px;
  display: inline-block;
  background-image: url(../../assets/thumbnail-border.png);
}
</style>