<template>
  <DialogBox overflowY="auto">
    <div><UnderlineText>動漫通問答遊戲</UnderlineText></div>          
    <div class="question">截至目前「真●三國無雙7帝王傳」系列遊戲中，哪位無雙臉女將並沒有配對的夫君轉正登場？</div>
    <Well>
      <div>&lt;小喬大喬&gt;</div>
      <div style="display:flex;">
        <Avatar index="11" whoAmI="true"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12" whoAmI="true"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
      </div>
    </Well>
    <Well>
      <div>&lt;小喬大喬&gt;</div>
      <div style="display:flex;">
        <Avatar index="11"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
      </div>
    </Well>
    <Well>
      <div>&lt;小喬大喬&gt;</div>
      <div style="display:flex;">
        <Avatar index="11"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
      </div>
    </Well>
    <Well>
      <div>&lt;小喬大喬&gt;</div>
      <div style="display:flex;">
        <Avatar index="11"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
        <Avatar index="12"/>
      </div>
    </Well>
  </DialogBox>
</template>

<script>
import UnderlineText from '../UnderlineText'
import Well from '../Well'
import Avatar from '../Avatar'
import DialogBox from '../DialogBox'

export default {
  components: { UnderlineText, Well, Avatar, DialogBox, }
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
</style>