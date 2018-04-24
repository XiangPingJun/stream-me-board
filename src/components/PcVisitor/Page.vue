<template>
  <div>
    <background></background>
    <div class="page">
      <!-- //www.youtube.com/embed/Xzv7eh2VaNI?enablejsapi=1 -->
      <video-box ref="video" :height="videoHeight" :width="videoWidth" src="//www.youtube.com/embed/Xzv7eh2VaNI?enablejsapi=1"></video-box>
      <div class="right-side">
        <my-info style="flex-shrink: 0" />
        <dialog-box overflowY="auto" style="flex-grow:10; flex-shrink:0; min-height: 120px;">
          <quiz />
        </dialog-box>        
        <dialog-box overflowY="auto" style="flex-grow:5; flex-shrink:1; min-height: 120px;">
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
</style>