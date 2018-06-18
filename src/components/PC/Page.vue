<template>
  <div>
    <Background/>
    <div class="page" v-show="preLoaded">
      <VideoBox ref="video" :height="videoHeight" :width="videoWidth"/>
      <div class="right-side">
        <!-- top section -->
        <MyInfo v-if="'MY_INFO'==topDialog" class="top animated flipInX"/>
        <AnonymousInfo v-if="'ANONYMOUS'==topDialog" class="top animated flipInX"/>
        <Login v-if="'LOGIN'==topDialog" class="top animated flipInX"/>
        <Arrow ref="loginArrow" v-if="'LOGIN'==arrow" class="login-arrow"/>

        <!-- middle section -->
        <Vote v-if="'VOTE'==middleDialog" class="middle"/>
        <Arrow v-if="'VOTE'==arrow" class="vote-arrow"/>
        <Quiz v-if="'QUIZ'==middleDialog" class="middle animated flipInY"/>
        <Playground v-if="'PLAYGROUND'==middleDialog" class="middle animated flipInY"/>
        <AvatarPicker v-if="'AVATAR_PICKER'==middleDialog" class="middle animated flipInY"/>
        <FollowUs v-if="'FOLLOW_US'==middleDialog" class="middle animated flipInY"/>
        <HistoryVideo v-if="'HISTORY_VIDEO'==middleDialog" class="middle animated flipInY"/>

        <!-- bottom section -->
        <ChatBox ref="chatBox" v-if="chatLines.length" class="bottom animated flipInX"/>
      </div>
    </div>
    <div v-show="!preLoaded" class="page loading-container">
      <span style="margin-right:5px;">Loading... </span><i class="fas fa-spinner fa-pulse"/>
    </div>
    <Notify :large="true"/>
  </div>
</template>

<script>
import VideoBox from './VideoBox'
import ChatBox from './ChatBox'
import Quiz from './Quiz'
import MyInfo from './MyInfo'
import AnonymousInfo from './AnonymousInfo'
import Login from './Login'
import Arrow from './Arrow'
import AvatarPicker from './AvatarPicker'
import Playground from './Playground'
import Notify from '../Notify'
import HistoryVideo from './HistoryVideo'
import FollowUs from './FollowUs'
import Vote from './Vote'
import Background from './Background'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  data() { return { videoWidth: 0, videoHeight: 0 } },
  components: { Background, VideoBox, ChatBox, Quiz, MyInfo, AnonymousInfo, Login, Arrow, AvatarPicker, Notify, Playground, HistoryVideo, FollowUs, Vote },
  mounted() {
    this.subscribeData()
    this.unsubscribeAction = this.$store.subscribeAction((action, state) => {
      if ('notify' == action.type)
        return this.$notify({
          group: 'notify',
          data: { ...action.payload.data },
          ...action.payload
        })
    })
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    this.videoWidth = width - 390
    this.$nextTick(() => {
      const videoHeight = parseInt(this.$refs.video.videoSize.height)
      if (videoHeight > height - 50) {
        this.videoWidth = undefined
        this.videoHeight = height - 50
      }
    })
  },
  beforeDestroy() { this.unsubscribeAction() },
  computed: {
    topDialog() {
      if (this.myInfo.name && 'MY_INFO' == this.uiMode.account)
        return 'MY_INFO'
      if ('LOGIN' == this.uiMode.account)
        return 'LOGIN'
      if ('ANONYMOUS' == this.uiMode.account)
        return 'ANONYMOUS'
    },
    middleDialog() {
      if (this.uiMode.selectAvatar)
        return 'AVATAR_PICKER'
      if (this.uiMode.vote)
        return 'VOTE'
      if (this.uiMode.quiz)
        return 'QUIZ'
      if (this.uiMode.followUs)
        return 'FOLLOW_US'
      if (false == this.stream.streaming && this.historyVideo)
        return 'HISTORY_VIDEO'
      if (this.stream.streaming && this.onlineUsers)
        return 'PLAYGROUND'
    },
    arrow() {
      if ('LOGIN' == this.topDialog)
        return 'LOGIN'
      if ('VOTE' == this.middleDialog && !this.voted)
        return 'VOTE'
    },
    ...mapState(['stream', 'uiMode', 'historyVideo', 'chatLines']), ...mapGetters(['myInfo', 'voted', 'onlineUsers', 'preLoaded'])
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
  min-height: 220px;
}
.login-arrow {
  top: 60px;
  right: 380px;
}
.vote-arrow {
  top: 160px;
  right: 380px;
}
.loading-container {
  font-size: 2em;
}
.loading-container i {
  text-shadow: none;
}
</style>