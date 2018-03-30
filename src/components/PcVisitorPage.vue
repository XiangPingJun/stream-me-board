<template>
  <div>
    <background></background>
    <div class="page-container">
      <div class="middle">
        <dialog-box>
          <div style="margin-bottom: 12px;">&gt; 新注音實況台</div>
          <video-box :height="videoHeight" :width="videoWidth" src="//www.youtube.com/embed/Xzv7eh2VaNI?enablejsapi=1"></video-box>
        </dialog-box>
      </div>
    </div>
  </div>
</template>

<script>
import Well from './Well.vue'
import DialogBox from './DialogBox.vue'
import VideoBox from './VideoBox.vue'
import NightSkyBackground from './NightSkyBackground.vue'

export default {
  data() {
    return {
      videoWidth: 0,
      videoHeight: 0
    }
  },
  components: {
    well: Well,
    'dialog-box': DialogBox,
    'video-box': VideoBox,
    'background': NightSkyBackground
  },
  created() {
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    console.log(width / height < 16 / 9)
    if (width / height < 16 / 9)
      this.videoWidth = width - 400
    else
      this.videoHeight = height - 120
  }
}
</script>

<style scoped>
.page-container {
  display: flex;
  height: 100vh;
  justify-content: center;
}
.middle {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>