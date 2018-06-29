<template>
  <Content overflowY="auto">
    <UnderlineText class="animated flipInX">+祥平君為好友</UnderlineText>
    <div class="animated flipInX">
      <div class="subtitle"><i class="fab fa-steam"/> +steam好友</div>
      <b><a href="https://steamcommunity.com/profiles/76561198011182274/" target="_blank">XiangPingJun</a></b>
    </div>
    <div class="animated flipInX">
      <div class="subtitle"><i class="fab fa-playstation"/> +PSN好友</div>
      <b><a href="https://my.playstation.com/profile/xiang-ping-jun" target="_blank">xiang-ping-jun</a></b>
    </div>
    <div class="animated flipInX" style="margin-bottom:10px">
      <div class="subtitle"><i class="fab fa-nintendo-switch"/> +switch好友</div>
      <b><a>8131-5117-4922</a></b>
    </div>
    <div class="animated flipInX green"><b>\ 上線別吝嗇! 找我一起玩! /</b></div>
  </Content>
</template>

<script>
import UnderlineText from '../UnderlineText'
import Content from './Content'
import { mapMutations } from 'vuex'

export default {
  components: { UnderlineText, Content },
  methods: { ...mapMutations(['updateUiMode']) }
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: flex-start;
}
.subtitle {
  margin-top: 10px;
  margin-bottom: 5px;
}
.padding-line {
  margin-bottom: 20px;
}
</style>