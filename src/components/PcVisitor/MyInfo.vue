<template>
  <DialogBox>
    <div class="container">
      <div v-tooltip.left="{content:'更換角色', offset:3}" class="thumbnail-box" @click="promptSelectThumbnail" :style="{'background-image': 'url(static/thumbnail-border.png)'}">
        <Thumbnail :index="myInfo.thumbnailSelected" :large="true" />
      </div>
      <div class="info">
        <UnderlineText>{{myInfo.name}}</UnderlineText>
        <div v-tooltip.bottom="{content:'一起聊聊天、參加小遊戲就可以解鎖更多新角色！', offset:3}"
          style="cursor:default">Lv {{myInfo.level}}. ({{myInfo.exp}}%){{levelMsg}}</div>
      </div>
      <div class="logout">
        <DarkButton @click="logout" v-tooltip.left="{content:'登出', offset:3}"><i class="fa fa-sign-out-alt" /></DarkButton>
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
  methods: { ...mapActions(['promptLogin', 'logout', 'promptSelectThumbnail']) },
  computed: {
    levelMsg() { return '' },
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