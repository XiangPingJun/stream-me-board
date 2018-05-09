<template>
  <div>
    <NightSkyBackground />
    <div class="page">
      <VideoBox ref="video" :height="videoHeight" :width="videoWidth" />
      <div class="right-side">
        <!-- top section -->
        <MyInfo v-if="showMyInfo" class="top animated flipInX" />
        <AnonymousInfo v-if="showAnonymous" class="top animated flipInX" />
        <Login v-if="showLogin" class="top animated flipInX" />
        <!-- login arrow -->
        <Arrow ref="arrow" v-if="'LOGIN' == uiMode.account" class="login-arrow" />

        <!-- middle section -->
        <Quiz v-if="showQuiz" class="middle animated flipInY" />
        <ThumbnailPicker v-if="showThumbnailPicker" class="middle animated flipInY" />

        <!-- bottom section -->
        <ChatBox v-if="uiMode.chat" class="bottom animated flipInX" />
      </div>
    </div>
    <notifications position="bottom center" />
    <Notify />
  </div>
</template>

<script>
import DialogBox from '../DialogBox'
import VideoBox from './VideoBox'
import NightSkyBackground from './NightSkyBackground'
import ChatBox from './ChatBox'
import Quiz from './Quiz'
import MyInfo from './MyInfo'
import AnonymousInfo from './AnonymousInfo'
import Login from './Login'
import Arrow from './Arrow'
import ThumbnailPicker from './ThumbnailPicker'
import Notify from './Notify'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      videoWidth: 0,
      videoHeight: 0,
      unsubscribeAction: () => { },
    }
  },
  components: { DialogBox, VideoBox, NightSkyBackground, ChatBox, Quiz, MyInfo, AnonymousInfo, Login, Arrow, ThumbnailPicker, Notify },
  created() { this.subscribeData() },
  mounted() {
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    this.videoWidth = width - 420
    setTimeout(() => {
      if (this.$refs.video.$refs.iframe.clientHeight > document.documentElement.clientHeight) {
        this.videoWidth = undefined
        this.videoHeight = height - 50
      }
    })
    this.unsubscribeAction = this.$store.subscribeAction((action, state) => {
      switch (action.type) {
        case 'promptLogin':
          return setTimeout(() => this.$refs.arrow.animate())
        case 'notify':
          return this.$notify({
            group: 'notify',
            data: { ...action.payload.data },
            ...action.payload
          })
      }
    })
  },
  beforeDestroy() {
    this.unsubscribeAction()
  },
  watch: {
    systemInfo(val, oldVal) {
      if (null !== val && null !== oldVal && val.version != oldVal.version)
        window.location.reload(true)
    }
  },
  computed: {
    showMyInfo() { return 'MY_INFO' == this.uiMode.account },
    showAnonymous() { return 'ANONYMOUS' == this.uiMode.account },
    showLogin() { return 'LOGIN' == this.uiMode.account },
    showQuiz() { return !this.uiMode.selectThumbnail && this.uiMode.quiz },
    showThumbnailPicker() { return this.uiMode.selectThumbnail },
    ...mapGetters(['systemInfo', 'uiMode', 'videoUrl'])
  },
  methods: { ...mapActions(['subscribeData']) }
}
</script>

<style scoped>
.page {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
}
.right-side {
  align-self: stretch;
  width: 325px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px 5px;
}
.right-side .top {
  flex-shrink: 0;
}
.right-side .middle {
  flex-shrink: 1;
}
.right-side .bottom {
  flex-grow: 1;
  flex-shrink: 9999999;
  min-height: 150px;
}
.login-arrow {
  top: 60px;
  right: 380px;
}
</style>