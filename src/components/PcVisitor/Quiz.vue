<template>
  <dialog-box>
    <div><underline-text>動漫通問答遊戲</underline-text></div>          
    截至目前「真●三國無雙7帝王傳」系列遊戲中，哪位無雙臉女將並沒有配對的夫君轉正登場？
    <div>    <img src="../../assets/thumbnail-border.png"></div>
    <div>    <img src="../../assets/thumbnail-border.png"></div>
    <div>    <img src="../../assets/thumbnail-border.png"></div>
    <div>    <img src="../../assets/thumbnail-border.png"></div>
  </dialog-box>
</template>

<script>
import UnderlineText from '../UnderlineText'
import DialogBox from '../DialogBox'

export default {
  components: {
    'underline-text': UnderlineText,
    'dialog-box': DialogBox
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