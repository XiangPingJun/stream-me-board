<template>
  <DialogBox overflowY="auto">
    <div><UnderlineText>動漫通問答遊戲</UnderlineText></div>          
    <div class="question">截至目前「真●三國無雙7帝王傳」系列遊戲中，哪位無雙臉女將並沒有配對的夫君轉正登場？</div>
    <Well>
      <div>&lt;小喬大喬&gt;</div>
      <div style="display:flex;">
        <Thumbnail index="11" whoAmI="true" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" whoAmI="true" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
      </div>
    </Well>
    <Well>
      <div>&lt;小喬大喬&gt;</div>
      <div style="display:flex;">
        <Thumbnail index="11" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
      </div>
    </Well>
    <Well>
      <div>&lt;小喬大喬&gt;</div>
      <div style="display:flex;">
        <Thumbnail index="11" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
      </div>
    </Well>
    <Well>
      <div>&lt;小喬大喬&gt;</div>
      <div style="display:flex;">
        <Thumbnail index="11" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
        <Thumbnail index="12" />
      </div>
    </Well>
  </DialogBox>
</template>

<script>
import UnderlineText from '../UnderlineText'
import Well from '../Well'
import Thumbnail from '../Thumbnail'
import DialogBox from '../DialogBox'

export default {
  components: { UnderlineText, Well, Thumbnail, DialogBox, }
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: flex-start;
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