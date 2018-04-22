<template>
  <dialog-box>
    <div><underline-text>動漫通問答遊戲</underline-text></div>          
    <div class="question">截至目前「真●三國無雙7帝王傳」系列遊戲中，哪位無雙臉女將並沒有配對的夫君轉正登場？</div>
    <well>
      <div style="display: flex;">
        <div class="option">&lt;小喬大喬&gt;</div>
        <thumbnail index="11" />
        <thumbnail index="12" />
      </div>
    </well>
  </dialog-box>
</template>

<script>
import UnderlineText from '../UnderlineText'
import DialogBox from '../DialogBox'
import Well from '../Well'
import Thumbnail from '../Thumbnail'

export default {
  components: {
    'underline-text': UnderlineText,
    'dialog-box': DialogBox,
    'well': Well,
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
.question {
  margin-bottom: 5px;
}
.option {
  display: inline-block;
  padding: 0px 5px;
}
</style>