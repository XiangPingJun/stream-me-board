<template>
  <DialogBox>
    <div class="container">
      <div v-tooltip.left="'更換頭像'" class="thumbnail-box" @click="onClickThumbnail" :style="{'background-image': 'url(static/thumbnail-border.png)'}">
        <Thumbnail :index="myInfo.thumbnailSelected" :large="true" />
      </div>
      <div class="info">
        <UnderlineText>{{myInfo.name}}</UnderlineText>
        <div>{{levelMsg}}</div>
      </div>
      <div class="logout" @click="logout">
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
  methods: {
    onClickThumbnail() {
    },
    ...mapActions(['promptLogin', 'logout'])
  },
  computed: {
    levelMsg() { return 'Lv 1. (40%)' },
    ...mapGetters(['myInfo'])
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