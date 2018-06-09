<template>
  <div v-show="preLoaded">
    <div style="display:flex">
      <VideoBox ref="video" :width="videoWidth"/>
      <div class="tool-bar">
        <IconButton @click="updateUiMode({showAccount:true})" icon="fas fa-user"/>
        <IconButton icon="fas fa-comment-alt"/>
        <IconButton @click="setUiMode({})" v-if="false==stream.streaming" icon="fab fa-youtube"/>
      </div>
    </div>
    <div style="margin: 8px 4px 0px 4px">
      <HistoryVideo v-if="'HISTORY_VIDEO'==dialog" :style="dialogStyle"/>
      <MyInfo v-if="'MY_INFO'==dialog" :style="dialogStyle"/>
      <Login v-if="'ANONYMOUS'==dialog||'LOGIN'==dialog" :style="dialogStyle"/>
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
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'

export default {
  components: { VideoBox, IconButton, HistoryVideo, MyInfo, Login, Notify },
  computed: {
    videoWidth() { return document.documentElement.clientWidth - 40 },
    dialogStyle() {
      return { height: document.documentElement.clientHeight - this.videoWidth * (9 / 16) - 10 + 'px' }
    },
    dialog() {
      if (this.uiMode.vote)
        return 'VOTE'
      if (this.uiMode.quiz)
        return 'QUIZ'
      if (this.uiMode.showAccount)
        return this.myInfo.name ? 'MY_INFO' : 'ANONYMOUS'
      if (this.uiMode.followUs)
        return 'FOLLOW_US'
      if (false == this.stream.streaming && this.historyVideo)
        return 'HISTORY_VIDEO'
      if (this.stream.streaming && this.onlineUsers)
        return 'PLAYGROUND'
    },
    ...mapState(['uiMode', 'stream', 'preLoaded', 'historyVideo']), ...mapGetters(['onlineUsers', 'myInfo'])
  },
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
  },
  beforeDestroy() { this.unsubscribeAction() },
  methods: { ...mapActions(['subscribeData']), ...mapMutations(['setUiMode', 'updateUiMode']) },
}
</script>

<style scoped>
.tool-bar {
  display: flex;
  flex-direction: column;
}
</style>
