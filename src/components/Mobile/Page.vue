<template>
  <div>
    <div v-show="preLoaded && dialog">
      <div style="display:flex">
        <VideoBox ref="video" :width="videoWidth"/>
        <div class="tool-bar animated flipInY" v-if="undefined!=stream.status">
          <IconButton icon="fas fa-comments" v-if="'CHAT_BOX'==dialog"/>
          <IconButton icon="far fa-comments" v-if="'CHAT_BOX'!=dialog" @click="setUiMode({chatBox:true})"/>
          <IconButton icon="fas fa-list-alt" v-if="'HISTORY_VIDEO'==dialog&&'ENDED'==stream.status"/>
          <IconButton icon="far fa-list-alt" v-if="'HISTORY_VIDEO'!=dialog&&'ENDED'==stream.status" @click="setUiMode({})"/>
          <IconButton icon="fas fa-compass" v-if="'PLAYGROUND'==dialog&&'ENDED'!=stream.status"/>
          <IconButton icon="far fa-compass" v-if="'PLAYGROUND'!=dialog&&'ENDED'!=stream.status" @click="setUiMode({playground:true})"/>
          <IconButton icon="fas fa-user" v-if="'MY_INFO'==dialog||'LOGIN'==dialog" />
          <IconButton icon="far fa-user" v-if="'MY_INFO'!=dialog&&'LOGIN'!=dialog" @click="setUiMode({showAccount:true})"/>
          <IconButton icon="fas fa-bell" v-if="'FOLLOW_US'==dialog" />
          <IconButton icon="far fa-bell" v-if="'FOLLOW_US'!=dialog" @click="setUiMode({followUs:true})"/>
        </div>
      </div>
      <div style="margin: 8px 4px 0px 4px">
        <MyInfo v-if="'MY_INFO'==dialog" :style="dialogStyle()"/>
        <Login v-if="'LOGIN'==dialog" :style="dialogStyle()"/>
        <Vote v-if="'VOTE'==dialog" :style="dialogStyle()"/>
        <Quiz v-if="'QUIZ'==dialog" :style="dialogStyle()"/>
        <HistoryVideo v-if="'HISTORY_VIDEO'==dialog" :style="dialogStyle()"/>
        <ChatBox v-show="'CHAT_BOX'==dialog" :visible="'CHAT_BOX'==dialog" :style="dialogStyle()"/>
        <Playground v-if="'PLAYGROUND'==dialog" :style="dialogStyle()"/>
        <FollowUs v-if="'FOLLOW_US'==dialog" :style="dialogStyle()"/>
      </div>
    </div>
    <div v-show="!preLoaded || !dialog" class="loading-container infinite"><Loader/></div>
    <Notify/>
  </div>
</template>

<script>
import HistoryVideo from './HistoryVideo'
import VideoBox from './VideoBox'
import IconButton from './IconButton'
import MyInfo from './MyInfo'
import Login from './Login'
import Notify from '../Notify'
import ChatBox from './ChatBox'
import Quiz from './Quiz'
import Vote from './Vote'
import Playground from './Playground'
import FollowUs from './FollowUs'
import Loader from '../Loader'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import { setInterval } from 'timers';

export default {
  components: { VideoBox, IconButton, HistoryVideo, MyInfo, Login, Notify, ChatBox, Quiz, Vote, Playground, FollowUs, Loader },
  computed: {
    videoWidth() { return document.documentElement.clientWidth - 40 },
    dialog() {
      if (!this.stream.status)
        return
      if (this.uiMode.vote)
        return 'VOTE'
      if (this.uiMode.quiz)
        return 'QUIZ'
      if (this.uiMode.showAccount)
        return this.myInfo.name ? 'MY_INFO' : 'LOGIN'
      if (this.uiMode.followUs)
        return 'FOLLOW_US'
      if (this.uiMode.chatBox)
        return 'CHAT_BOX'
      if (this.uiMode.playground)
        return 'PLAYGROUND'
      if ('ENDED' == this.stream.status)
        return 'HISTORY_VIDEO'
      if ('ENDED' != this.stream.status)
        return 'CHAT_BOX'
    },
    ...mapState(['uiMode', 'stream', 'historyVideo']), ...mapGetters(['onlineUsers', 'myInfo', 'preLoaded'])
  },
  mounted() {
    this.subscribeData()
    this.unsubscribeAction = this.$store.subscribeAction((action, state) => {
      if ('notify' == action.type)
        this.$notify({
          group: 'notify',
          data: { ...action.payload.data },
          ...action.payload
        })
      else if ('promptLogin' == action.type)
        this.setUiMode({ showAccount: true })
    })
    this.scrollInterval = setInterval(() => {
      if (window.scrollY > 0)
        window.scrollTo(0, 0)
    }, 500)
    this.handleResize = () => this.$forceUpdate()
    window.addEventListener('resize', this.handleResize, false)
  },
  beforeDestroy() {
    this.unsubscribeAction()
    clearInterval(this.scrollInterval)
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    dialogStyle() {
      return { height: document.documentElement.clientHeight - this.videoWidth * (9 / 16) - 10 + 'px' }
    },
    ...mapActions(['subscribeData']), ...mapMutations(['setUiMode', 'updateUiMode'])
  },
}
</script>

<style scoped>
.tool-bar {
  display: flex;
  flex-direction: column;
}
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
