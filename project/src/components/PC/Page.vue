<template>
  <div>
    <div class="page" v-show="'PAGE'==pageMode">
      <VideoBox ref="video" :height="videoHeight" :width="videoWidth"/>
      <div class="right-side">
        <!-- top section -->
        <MyInfo v-if="'MY_INFO'==topDialog" class="top animated flipInX"/>
        <AnonymousInfo v-if="'ANONYMOUS'==topDialog" class="top animated flipInX"/>
        <Login v-if="'LOGIN'==topDialog" class="top animated flipInX"/>
        <Arrow v-if="'LOGIN'==arrow" class="login-arrow"/>

        <!-- middle section -->
        <Vote v-if="'VOTE'==middleDialog" class="middle"/>
        <Arrow v-if="'VOTE'==arrow" class="vote-arrow"/>
        <Quiz v-if="'QUIZ'==middleDialog" class="middle"/>
        <Playground v-if="'PLAYGROUND'==middleDialog" class="middle"/>
        <AvatarPicker v-if="'AVATAR_PICKER'==middleDialog" class="middle"/>
        <FollowUs v-if="'FOLLOW_US'==middleDialog" class="middle"/>
        <HistoryVideo v-if="'HISTORY_VIDEO'==middleDialog" class="middle"/>
        <ContactUs v-if="'CONTACT_US'==middleDialog" class="middle"/>

        <!-- bottom section -->
        <ChatBox ref="chatBox" v-if="'CHAT_BOX'==bottomDialog" class="bottom chat-box"/>
        <StickerPicker v-if="'STICKER_PICKER'==bottomDialog" class="bottom sticker-picker"/>
      </div>
    </div>
    <div class="page" v-if="'INTRO'==pageMode"><Intro/></div>
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
import StickerPicker from './StickerPicker'
import ContactUs from './ContactUs'
import Intro from './Intro'
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'

export default {
  data() { return { videoWidth: 0, videoHeight: 0, introDismissed: false } },
  components: { VideoBox, ChatBox, Quiz, MyInfo, AnonymousInfo, Login, Arrow, AvatarPicker, Notify, Playground, HistoryVideo, FollowUs, Vote, StickerPicker, ContactUs, Intro },
  mounted() {
    this.preLoadImg('static/reputation.png')
    this.preLoadImg('static/arrow.png')
    setTimeout(() => this.donePreLoadAll(), 10000)

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
      if (!this.stream.status)
        return
      if (this.uiMode.selectAvatar)
        return 'AVATAR_PICKER'
      if (this.uiMode.vote)
        return 'VOTE'
      if (this.uiMode.quiz)
        return 'QUIZ'
      if (this.uiMode.followUs)
        return 'FOLLOW_US'
      if (this.uiMode.contactUs)
        return 'CONTACT_US'
      if ('ENDED' == this.stream.status && this.historyVideo)
        return 'HISTORY_VIDEO'
      if ('ENDED' != this.stream.status && this.onlineUsers)
        return 'PLAYGROUND'
    },
    bottomDialog() {
      if (this.uiMode.stickerPicker)
        return 'STICKER_PICKER'
      if (this.chatLines.length)
        return 'CHAT_BOX'
    },
    arrow() {
      if ('LOGIN' == this.topDialog)
        return 'LOGIN'
      if ('VOTE' == this.middleDialog && !this.voted)
        return 'VOTE'
    },
    pageMode() {
      if (!this.preLoaded)
        return 'LOADER'
      if (!this.introDismissed)
        return 'INTRO'
      if (this.topDialog || this.middleDialog)
        return 'PAGE'
      return 'LOADER'
    },
    ...mapState(['stream', 'uiMode', 'historyVideo', 'chatLines']), ...mapGetters(['myInfo', 'voted', 'onlineUsers', 'preLoaded'])
  },
  watch: {
    pageMode: {
      immediate: true,
      handler(newVal) {
        if ('INTRO' == newVal)
          document.body.addEventListener('click', this.dismissIntro, false)
        else
          document.body.removeEventListener('click', this.dismissIntro, false)
        document.getElementById('loader').style.display = 'LOADER' == newVal ? 'flex' : 'none'
      }
    }
  },
  methods: {
    preLoadImg(src) {
      const img = new Image()
      img.src = src
      this.addPreLoadItem(src)
      img.onload = () => this.donePreLoadItem(src)
    },
    dismissIntro() {
      this.introDismissed = true
    },
    ...mapActions(['subscribeData']), ...mapMutations(['addPreLoadItem', 'donePreLoadItem', 'donePreLoadAll'])
  }
}
</script>

<style scoped>
.page {
  display: flex;
  width: 100vw;
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
  height: calc(100vh - 390px);
}
.right-side .bottom {
  flex-grow: 1;
  flex-shrink: 9999999;
}
.right-side .bottom.chat-box {
  min-height: 240px;
}
.right-side .bottom.sticker-picker {
  min-height: 240px;
}
.login-arrow {
  top: 60px;
  right: 380px;
}
.vote-arrow {
  top: 160px;
  right: 380px;
}
</style>