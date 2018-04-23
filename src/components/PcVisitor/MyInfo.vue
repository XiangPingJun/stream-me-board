<template>
  <dialog-box>
    <div class="container">
      <div class="thumbnail-box" :style="{'background-image': 'url(static/thumbnail-border.png)'}">
        <thumbnail index="0" large="true" />
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
import Button from '../Button'

export default {
  components: {
    'underline-text': UnderlineText,
    'dialog-box': DialogBox,
    'thumbnail': Thumbnail,
    'btn': Button,
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
}
</style>