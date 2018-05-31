<template>
  <DialogBox>
    <div class="container" @click="promptLogin">
      <div class="avatar-box" :style="{'background-image': 'url(static/avatar-border.png)'}">
        <Avatar :index="anonymousAvatar" :whoAmI="true" :large="true"/>
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
import Avatar from '../Avatar'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { UnderlineText, DialogBox, Avatar, },
  methods: {
    ...mapActions(['promptLogin'])
  },
  computed: {
    ...mapGetters(['anonymousAvatar'])
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
.avatar-box {
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