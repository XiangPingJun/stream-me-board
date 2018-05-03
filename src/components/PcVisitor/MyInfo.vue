<template>
  <DialogBox>
    <div class="container">
      <div v-tooltip.left="'更換頭像'" class="thumbnail-box" @click="onClickThumbnail" :style="{'background-image': 'url(static/thumbnail-border.png)'}">
        <Thumbnail :index="randomNextThumbnail" :large="true" :whoAmI="null == myInfo" />
      </div>
      <div class="info">
        <UnderlineText>{{myName}}</UnderlineText>
        <div>{{levelMsg}}</div>
      </div>
      <div v-if="myInfo" class="logout" @click="logout">
        <DarkButton v-tooltip.left="'登出'"><i class="fa fa-sign-out-alt" /></DarkButton>
      </div>
    </div>
  </DialogBox>
</template>

<script>
import UnderlineText from '../UnderlineText'
import DialogBox from '../DialogBox'
import Thumbnail from '../Thumbnail'
import DarkButton from '../DarkButton'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { UnderlineText, DialogBox, Thumbnail, DarkButton, },
  data: () => {
    return {
      levelMsg: '(輸入暱稱一起來玩吧!)',
    }
  },
  methods: {
    onClickThumbnail() {
      if (null === this.myInfo)
        this.promptLogin()
    },
    ...mapActions(['promptLogin', 'trophyMsg', 'logout'])
  },
  computed: {
    myName() { return this.myInfo ? this.myInfo.name : '不知名的訪客' },
    ...mapGetters(['myInfo', 'randomNextThumbnail'])
  }
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: flex-start;
}
.info {
  margin-left: 10px;
  align-self: center;
}
.thumbnail-box {
  width: 48px;
  height: 51px;
  padding-top: 15px;
  padding-left: 15px;
  display: inline-block;
  cursor: pointer;
}
.logout {
  flex-grow: 2;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
</style>