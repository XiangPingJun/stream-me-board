<template>
  <DialogBox class="top animated flipInY">
    <div class="container" @click="onClickMyInfo">
      <div class="thumbnail-box" :style="{'background-image': 'url(static/thumbnail-border.png)'}">
        <Thumbnail index="0" large="true" whoAmI="true" />
      </div>
      <div class="right">
        <div><UnderlineText>{{myName}}</UnderlineText></div>
        <div>{{levelMsg}}</div>
      </div>
    </div>
  </DialogBox>
</template>

<script>
import UnderlineText from '../UnderlineText'
import DialogBox from '../DialogBox'
import Thumbnail from '../Thumbnail'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  components: { UnderlineText, DialogBox, Thumbnail, },
  data: () => {
    return {
      myName: '不知名的訪客',
      levelMsg: '(輸入暱稱一起來玩吧!)',
    }
  },
  methods: {
    onClickMyInfo() {
      if (null === this.myInfo)
        this.promptLogin()
    },
    createUser(name) {
      firebase.auth().createUserWithEmailAndPassword(encodeURI(name) + '@email.com', 'dummy password')
        .catch(error => new Notyf().alert(error.message))
    },
    ...mapActions(['promptLogin'])
  },
  computed: { ...mapGetters(['myInfo']) }
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