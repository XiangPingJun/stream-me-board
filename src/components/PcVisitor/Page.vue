<template>
  <div>
    <background></background>
    <div class="page">
      <video-box ref="video" :height="videoHeight" :width="videoWidth"></video-box>
      <div class="right-side">
        <dialog-box class="top animated flipInY" :style="topAnimationStyle">
          <my-info />
        </dialog-box>
        <dialog-box v-if="'QUIZ' == mainDialogType" overflowY="auto" class="middle animated flipInY" :style="middleAnimationStyle">
          <quiz />
        </dialog-box>
        <dialog-box v-if="'LOGIN' == mainDialogType" overflowY="auto" class="middle animated flipInY" :style="middleAnimationStyle">
          <chat-box />
        </dialog-box>
        <dialog-box overflowY="auto" class="bottom animated flipInY" :style="bottomAnimationStyle">
          <chat-box />
        </dialog-box>
      </div>
    </div>
  </div>
</template>

<script>
import Well from '../Well'
import DialogBox from '../DialogBox'
import VideoBox from '../VideoBox'
import NightSkyBackground from './NightSkyBackground'
import ChatBox from './ChatBox'
import Quiz from './Quiz'
import MyInfo from './MyInfo'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      videoWidth: 0,
      videoHeight: 0,
      topAnimationStyle: { 'animation-delay': '0.5s' },
      middleAnimationStyle: { 'animation-delay': '1s' },
      bottomAnimationStyle: { 'animation-delay': '1.5s' },
    }
  },
  components: {
    'well': Well,
    'dialog-box': DialogBox,
    'video-box': VideoBox,
    'background': NightSkyBackground,
    'chat-box': ChatBox,
    'quiz': Quiz,
    'my-info': MyInfo,
  },
  created() {
    this.$store.dispatch('getRealtimeUpdates')
  },
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
    setTimeout(() => this.topAnimationStyle = this.middleAnimationStyle = this.bottomAnimationStyle = {}, 5000)
  },
  computed: {
    ...mapGetters(['systemInfo', 'mainDialogType'])
  },
  watch: {
    systemInfo(val, oldVal) {
      if (null !== val && null !== oldVal && val.version != oldVal.version)
        window.location.reload(true)
    }
  }
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
  width: 320px;
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
  min-height: 120px;
}
</style>