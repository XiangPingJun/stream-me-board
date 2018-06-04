<template>
  <DialogBox overflowY="auto">
    <div><UnderlineText>本日主題</UnderlineText></div>
    <i>
      哈囉，今天來跟大家一起玩<br/>
      <span v-if="!stream.gameUrl">{{stream.gameTitle}}</span>
      <div style="margin:2px 0px"><a v-if="stream.gameUrl" :href="stream.gameUrl" target="_blank">{{stream.gameTitle}}</a></div>
      <div>{{stream.gameDescription}}，</div>
      快點來加入一起聊天吧！<br/>
    </i>
    <div class="padding-line"/>

    <div><UnderlineText>線上的網友們</UnderlineText></div>
    <Well style="margin-bottom:20px;">
      <div style="display:flex;">
        <UserAvatar v-for="(user, i) in onlineUser" :user="user" :key="i"/>
      </div>
    </Well>
  </DialogBox>
</template>

<script>
import UnderlineText from '../UnderlineText'
import Well from '../Well'
import UserAvatar from './UserAvatar'
import DialogBox from '../DialogBox'
import WhiteBorder from '../WhiteBorder'
import { mapState } from 'vuex'

export default {
  components: { UnderlineText, Well, UserAvatar, DialogBox, },
  computed: { ...mapState(['stream', 'onlineUser']) }
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: flex-start;
}
.subtitle {
  margin-top: 15px;
  margin-bottom: 5px;
}
.padding-line {
  margin-bottom: 20px;
}
</style>