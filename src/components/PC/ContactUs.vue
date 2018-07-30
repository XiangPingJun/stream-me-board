<template>
  <DialogBox overflowY="auto" :class="dialogClass">
    <div style="display:flex; width:100%;">
      <UnderlineText>+祥平君為好友</UnderlineText>
      <div class="close">
        <DarkButton @click="updateUiMode({contactUs:false})" v-tooltip.left="{content:'關閉', offset:3}"><i class="fas fa-times" style="margin:0 2px;"/></DarkButton>
      </div>
    </div>
    <div>
      <div class="subtitle"><i class="fab fa-steam"/> +steam好友</div>
      <b><a href="https://steamcommunity.com/profiles/76561198011182274/" target="_blank">XiangPingJun</a></b>
    </div>
    <div>
      <div class="subtitle"><i class="fab fa-playstation"/> +PSN好友</div>
      <b><a href="https://my.playstation.com/profile/xiang-ping-jun" target="_blank">xiang-ping-jun</a></b>
    </div>
    <div style="margin-bottom:10px">
      <div class="subtitle"><i class="fab fa-nintendo-switch"/> +switch好友</div>
      <b><a>8131-5117-4922</a></b>
    </div>
    <div class="green"><b>\ 上線別吝嗇! 找我一起玩! /</b></div>
  </DialogBox>
</template>

<script>
import UnderlineText from '../UnderlineText'
import DialogBox from '../DialogBox'
import DarkButton from '../DarkButton'
import { mapMutations } from 'vuex'

export default {
  data() { return { dialogClass: 'animated flipInY' } },
  mounted() { this.$el.addEventListener("animationend", () => this.dialogClass = '') },
  components: { UnderlineText, DialogBox, DarkButton },
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
.close {
  flex-grow: 2;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}
</style>