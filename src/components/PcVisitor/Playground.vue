<template>
  <DialogBox overflowY="auto">
    <div><UnderlineText>線上的網友們</UnderlineText></div>
    <Well style="margin-bottom:20px;">
      <div style="display:flex;">
        <UserAvatar v-for="(user, key) in onlineUser" :user="user" :key="key" />
      </div>
    </Well>
    <div><UnderlineText>追蹤我們的實況</UnderlineText></div>
    <div class="subtitle"><i class="fas fa-bookmark" /> 追蹤LINE官方帳號</div>
    <i>搜尋用戶ID『@sgs5099b』追蹤，或掃描條碼加入 "新注音新聞"</i>
    <img src="static/line-qr.png" />
    <div class="subtitle"><i class="fas fa-bookmark" /> 追蹤臉書粉絲團</div>
    <i>請至 <a href="https://www.facebook.com/255223767942122/" target="_blank">新注音新聞粉絲團</a> 按讚追蹤，擔心訊息被其他貼文洗掉的朋友可設定搶先看喲！</i>
    <div class="subtitle"><i class="fas fa-bookmark" /> 追蹤祥平君的噗浪</div>
    <i>也歡迎來 <a href="https://www.plurk.com/shouhei" target="_blank">祥平君的噗浪</a>～ヽ( ﾟ▽ﾟ)ノ</i>
    
  </DialogBox>
</template>

<script>
import UnderlineText from '../UnderlineText'
import Well from '../Well'
import UserAvatar from './UserAvatar'
import DialogBox from '../DialogBox'
import WhiteBorder from '../WhiteBorder'
import { mapGetters } from 'vuex'

export default {
  components: { UnderlineText, Well, UserAvatar, DialogBox, },
  computed: { ...mapGetters(['onlineUser']) }
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
</style>