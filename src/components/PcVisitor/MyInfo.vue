<template>
  <div class="container" @click="onClickMyInfo">
    <div class="thumbnail-box" :style="{'background-image': 'url(static/thumbnail-border.png)'}">
      <thumbnail index="0" large="true" whoAmI="true" />
    </div>
    <div class="right">
      <div><underline-text>{{myName}}</underline-text></div>
      <div>{{levelMsg}}</div>
    </div>
  </div>
</template>

<script>
import UnderlineText from '../UnderlineText'
import DialogBox from '../DialogBox'
import Thumbnail from '../Thumbnail'
import Button from '../Button'

export default {
  components: {
    'underline-text': UnderlineText,
    'dialog-box': DialogBox,
    'thumbnail': Thumbnail,
    'btn': Button,
  },
  data: () => {
    return {
      myName: '不知名的訪客',
      levelMsg: '(輸入暱稱一起來玩吧!)',
    }
  },
  mounted() {
  },
  methods: {
    onClickMyInfo() {
      if (null === this.$store.state.myInfo)
        this.$store.commit('showLoginDialog')
    },
    createUser(name) {
      firebase.auth().createUserWithEmailAndPassword(encodeURI(name) + '@email.com', 'dummy password')
        .catch(error => new Notyf().alert(error.message))
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
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
}
</style>