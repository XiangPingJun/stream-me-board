<template>
  <DialogBox overflowY="auto" :class="dialogClass">
		<div style="display:flex; width:100%;">
      <UnderlineText>追蹤我們的直播</UnderlineText>
      <div class="close">
        <DarkButton @click="updateUiMode({followUs:false})" v-tooltip.left="{content:'關閉', offset:3}"><i class="fas fa-times" style="margin:0 2px;"/></DarkButton>
      </div>
    </div>
    <div class="subtitle"><i class="fab fa-line"/> 追蹤LINE官方帳號</div>
    <i>搜尋用戶ID『@sgs5099b』追蹤，或掃描條碼加入 "新注音新聞"</i>
    <img src="static/line-qr.png"/>
    <div class="subtitle"><i class="fab fa-facebook"/> 追蹤臉書粉絲團</div>
    <i>請至 <a href="https://www.facebook.com/255223767942122/" target="_blank">新注音新聞粉絲團</a> 按讚追蹤，
    擔心訊息被其他貼文洗掉的朋友可設定搶先看喲！</i><br/>
    <img src="static/fb-see-first.png" style="margin-top:5px;"/>
    <div class="subtitle"><i class="fas fa-parking"/> 追蹤祥平君的噗浪</div>
    <i>也歡迎來 <a href="https://www.plurk.com/shouhei" target="_blank">祥平君的噗浪</a><br/>ヽ( ﾟ▽ﾟ)ノ</i>
  </DialogBox>
</template>

<script>
import UnderlineText from '../UnderlineText'
import Well from '../Well'
import DialogBox from '../DialogBox'
import WhiteBorder from '../WhiteBorder'
import DarkButton from '../DarkButton'
import { mapMutations } from 'vuex'

export default {
  data() { return { dialogClass: 'animated flipInY' } },
  mounted() { this.$el.addEventListener("animationend", () => this.dialogClass = '') },
  components: { UnderlineText, Well, DialogBox, DarkButton },
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
.close {
  flex-grow: 2;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
}
</style>