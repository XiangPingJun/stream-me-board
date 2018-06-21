<template>
  <DialogBox overflowY="auto" :class="dialogClass">
    <div><UnderlineText><i class="fas fa-bullhorn"/> 本日主題</UnderlineText></div>
    <i>
      哈囉，今天來跟大家一起玩<br/>
      <span v-if="!stream.gameUrl">{{stream.gameTitle}}</span>
      <div style="margin:2px 0px">
        【<a :href="stream.gameUrl" target="_blank">{{stream.gameTitle}}</a>】
      </div>
      <div>是{{stream.gameDescription}}</div>
      快點來加入一起聊天吧！<br/>
    </i>
    <div class="padding-line"/>

    <div><UnderlineText><i class="fas fa-users"/> 線上的網友們</UnderlineText></div>
    <Well>
      <UserAvatar v-for="(user, i) in onlineUsers" :user="user" :key="i"/>
    </Well>
    <div class="padding-line"/>    

    <a @click="updateUiMode({followUs:true})">
      <i class="fas fa-bell"/> 如何追蹤我們的頻道？    
    </a>
  </DialogBox>
</template>

<script>
import UnderlineText from '../UnderlineText'
import Well from '../Well'
import UserAvatar from './UserAvatar'
import DialogBox from '../DialogBox'
import WhiteBorder from '../WhiteBorder'
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  data() { return { dialogClass: 'animated flipInY' } },
  mounted() { this.$el.addEventListener("animationend", () => this.dialogClass = '') },
  components: { UnderlineText, Well, UserAvatar, DialogBox, },
  computed: { ...mapState(['stream']), ...mapGetters(['onlineUsers']) },
  methods: { ...mapMutations(['updateUiMode']) }
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
  margin-bottom: 15px;
}
</style>