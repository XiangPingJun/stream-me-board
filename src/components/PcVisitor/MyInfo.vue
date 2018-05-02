<template>
  <DialogBox class="top animated flipInY">
    <div class="container">
      <div class="thumbnail-box" @click="onClickThumbnail" :style="{'background-image': 'url(static/thumbnail-border.png)'}">
        <Thumbnail :index="nextThumbnail" :large="true" :whoAmI="null == myInfo" />
      </div>
      <div class="right">
        <UnderlineText>{{myName}}</UnderlineText>
        <div>{{levelMsg}}</div>
      </div>
      <Button><span class="fa fa-times"></span></Button>
    </div>
  </DialogBox>
</template>

<script>
import UnderlineText from '../UnderlineText'
import DialogBox from '../DialogBox'
import Thumbnail from '../Thumbnail'
import Button from '../Button'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { UnderlineText, DialogBox, Thumbnail, Button, },
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
    ...mapActions(['promptLogin', 'trophyMsg'])
  },
  computed: {
    myName() { return this.myInfo ? this.myInfo.name : '不知名的訪客' },
    ...mapGetters(['myInfo', 'nextThumbnail'])
  }
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: flex-start;
}
.right {
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
</style>