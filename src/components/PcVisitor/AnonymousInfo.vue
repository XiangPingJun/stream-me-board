<template>
  <DialogBox>
    <div class="container" @click="promptLogin">
      <div class="thumbnail-box" :style="{'background-image': 'url(static/thumbnail-border.png)'}">
        <Thumbnail :index="anonymousThumbnail" :large="true" :whoAmI="true" />
      </div>
      <div class="info">
        <UnderlineText>不知名的訪客</UnderlineText>
        <div>(輸入暱稱一起來玩吧!)</div>
      </div>
    </div>
  </DialogBox>
</template>

<script>
import UnderlineText from '../UnderlineText'
import DialogBox from '../DialogBox'
import Thumbnail from '../Thumbnail'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { UnderlineText, DialogBox, Thumbnail, },
  methods: {
    ...mapActions(['promptLogin'])
  },
  computed: {
    ...mapGetters(['anonymousThumbnail'])
  }
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
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
}
.logout {
  flex-grow: 2;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
</style>