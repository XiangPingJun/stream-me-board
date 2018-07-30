<template>
  <Content>
    <div class="my-info-container animated flipInX">
      <div class="avatar-box" :style="{'background-image': 'url(static/avatar-border.png)'}">
        <Avatar :index="myInfo.avatarSelected" :large="true" />
      </div>
      <div class="info">
        <div style="display:flex">
          <UnderlineText>{{myInfo.name}}</UnderlineText>
        </div>
        <div>Lv {{Math.floor(myInfo.exp/100)}}. ({{myInfo.exp%100}}%){{levelMsg}}</div>
      </div>
      <div class="logout">
        <b>[<a @click="logout">登出</a>]</b>
      </div>
    </div>
    <AvatarPicker class="animated flipInY"/>
  </Content>
</template>

<script>
import Content from './Content'
import UnderlineText from '../UnderlineText'
import DialogBox from '../DialogBox'
import Avatar from '../Avatar'
import AvatarPicker from './AvatarPicker'
import DarkButton from '../DarkButton'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { UnderlineText, DialogBox, Avatar, DarkButton, AvatarPicker, Content },
  methods: { ...mapActions(['promptLogin', 'logout']) },
  computed: {
    levelMsg() { return '' },
    ...mapGetters(['myInfo'])
  }
}
</script>

<style scoped>
.my-info-container {
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
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
  cursor: pointer;
}
.logout {
  flex-grow: 2;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding-top: 5px;
}
</style>