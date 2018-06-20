<template>
  <Content overflowY="auto">
    <div class="animated flipInX"><UnderlineText><i class="fas fa-bullhorn"/> 本日主題</UnderlineText></div>
    <div class="animated flipInYY section" style="font-style:italic">
      哈囉，今天來跟大家一起玩<br/>
      <span v-if="!stream.gameUrl">{{stream.gameTitle}}</span>
      <div style="margin:2px 0px">
        【<a :href="stream.gameUrl" target="_blank">{{stream.gameTitle}}</a>】
      </div>
      <div>是{{stream.gameDescription}}</div>
      快點來加入一起聊天吧！<br/>
    </div>

    <div class="animated flipInX"><UnderlineText><i class="fas fa-users"/> 線上的網友們</UnderlineText></div>
    <Well class="animated flipInYY section">
      <Avatar v-for="(user, i) in onlineUsers" :index="user.avatarSelected" :preserved="user.preserved" :whoAmI="!user.name" :key="i"/>
    </Well>

    <div class="animated flipInX section">
      <a @click="updateUiMode({followUs:true})">
        <i class="fas fa-bell"/> 如何追蹤我們的頻道？    
      </a>
    </div>
  </Content>
</template>

<script>
import UnderlineText from '../UnderlineText'
import Well from '../Well'
import Avatar from '../Avatar'
import Content from './Content'
import WhiteBorder from '../WhiteBorder'
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  components: { UnderlineText, Well, Avatar, Content, },
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
.section {
  margin-bottom: 15px;
}
</style>