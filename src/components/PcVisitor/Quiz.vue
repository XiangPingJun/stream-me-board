<template>
  <div>
    <div><underline-text>動漫通問答遊戲</underline-text></div>          
    <div class="question">截至目前「真●三國無雙7帝王傳」系列遊戲中，哪位無雙臉女將並沒有配對的夫君轉正登場？</div>
    <well>
      <div>&lt;小喬大喬&gt;</div>
      <div style="display:flex;">
        <thumbnail index="11" whoAmI="true" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" whoAmI="true" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
      </div>
    </well>
    <well>
      <div>&lt;小喬大喬&gt;</div>
      <div style="display:flex;">
        <thumbnail index="11" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
      </div>
    </well>
    <well>
      <div>&lt;小喬大喬&gt;</div>
      <div style="display:flex;">
        <thumbnail index="11" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
      </div>
    </well>
    <well>
      <div>&lt;小喬大喬&gt;</div>
      <div style="display:flex;">
        <thumbnail index="11" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
        <thumbnail index="12" />
      </div>
    </well>
  </div>
</template>

<script>
import UnderlineText from '../UnderlineText'
import Well from '../Well'
import Thumbnail from '../Thumbnail'

export default {
  components: {
    'underline-text': UnderlineText,
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
  margin-bottom: 10px;
}
.option {
  display: inline-block;
  padding-top: 9px;
  margin-right: 5px;
}
.player-list {
  display: flex;
}
</style>