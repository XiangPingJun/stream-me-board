<template>
  <div>
    <div v-show="preLoaded" style="display:flex">
      <VideoBox ref="video" :width="videoWidth"/>
      <div class="tool-bar" v-if="undefined!=stream.streaming">
        <IconButton icon="fas fa-comments" v-if="'CHAT_BOX'==dialog"/>
        <IconButton icon="far fa-comments" v-if="'CHAT_BOX'!=dialog" @click="setUiMode({chatBox:true})"/>
        <IconButton icon="fas fa-list-alt" v-if="'HISTORY_VIDEO'==dialog&&!stream.streaming"/>
        <IconButton icon="far fa-list-alt" v-if="'HISTORY_VIDEO'!=dialog&&!stream.streaming" @click="setUiMode({})"/>
        <!-- <IconButton icon="fas fa-list-alt" v-if="'PLAYGROUND'==dialog&&stream.streaming"/>
        <IconButton icon="far fa-list-alt" v-if="'PLAYGROUND'!=dialog&&stream.streaming" @click="setUiMode({})"/> -->
        <IconButton icon="fas fa-user" v-if="'MY_INFO'==dialog||'LOGIN'==dialog" />
        <IconButton icon="far fa-user" v-if="'MY_INFO'!=dialog&&'LOGIN'!=dialog" @click="updateUiMode({showAccount:true})"/>
      </div>
    </div>
    <div v-show="preLoaded" style="margin: 8px 4px 0px 4px">
      <HistoryVideo v-if="'HISTORY_VIDEO'==dialog" :style="dialogStyle()"/>
      <MyInfo v-if="'MY_INFO'==dialog" :style="dialogStyle()"/>
      <Login v-if="'LOGIN'==dialog" :style="dialogStyle()"/>
      <ChatBox v-if="'CHAT_BOX'==dialog" :style="dialogStyle()"/>
      <Quiz v-if="'QUIZ'==dialog" :style="dialogStyle()"/>      
    </div>
    <div v-show="!preLoaded" class="loading-container">
      <i class="fas fa-spinner fa-10x fa-pulse"/>
    </div>
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
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import { setInterval } from 'timers';

export default {
  components: { VideoBox, IconButton, HistoryVideo, MyInfo, Login, Notify, ChatBox, Quiz },
  computed: {
    videoWidth() { return document.documentElement.clientWidth - 40 },
    dialog() {
      if (!this.preLoaded)
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
      if (this.stream.streaming)
        return 'CHAT_BOX'
      if (false === this.stream.streaming)
        return 'HISTORY_VIDEO'
    },
    ...mapState(['uiMode', 'stream', 'preLoaded', 'historyVideo']), ...mapGetters(['onlineUsers', 'myInfo'])
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
    this.resizeListener = () => this.$forceUpdate()
    window.addEventListener('resize', this.resizeListener, false)
  },
  beforeDestroy() {
    this.unsubscribeAction()
    clearInterval(this.scrollInterval)
    window.removeEventListener('resize', this.resizeListener)
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
.loading-container i {
  text-shadow: none;
  font-size: 1.5em;
}
</style>
