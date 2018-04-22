<template>
  <div>
    <background></background>
    <div class="page">
      <!-- //www.youtube.com/embed/Xzv7eh2VaNI?enablejsapi=1 -->
      <video-box :height="videoHeight" :width="videoWidth" src="//www.youtube.com/embed/Xzv7eh2VaNI?enablejsapi=1"></video-box>
      <div class="right-side">
        <my-info />
        <quiz />
        <chat-box style="flex-grow:1" />
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
  created() {
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    if (width / height < 16 / 9)
      this.videoWidth = width - 420
    else
      this.videoHeight = height - 120
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
  padding: 15px 0px;
}
</style>