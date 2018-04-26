<template>
  <div>
    <background></background>
    <div class="page">
      <video-box ref="video" :height="videoHeight" :width="videoWidth"></video-box>
      <div class="right-side">
        <dialog-box class="top">
          <my-info />
        </dialog-box>
        <dialog-box overflowY="auto" class="animated flipInX" v-if="'QUIZ' == this.$store.state.mainDialogType">
          <quiz />
        </dialog-box>
        <dialog-box overflowY="auto" class="animated flipInX" v-if="'LOGIN' == this.$store.state.mainDialogType">
          <chat-box />
        </dialog-box>
        <dialog-box overflowY="auto" class="bottom">
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
      videoHeight: 0
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
  },
  computed: {
    ...mapGetters(['systemInfo'])
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