<template>
  <div>
    <background></background>
    <div class="page-container">
      <div class="page-middle">
        <div class="page-content">
          <dialog-box>
            <div style="margin-bottom: 12px;"><i style="font-size:-1px;" class="fas fa-video"></i> 新注音實況台</div>
            <!-- //www.youtube.com/embed/Xzv7eh2VaNI?enablejsapi=1 -->
            <video-box :height="videoHeight" :width="videoWidth" src="todo"></video-box>
          </dialog-box>
          <div class="page-right-side">
            <dialog-box>
              <personal-data />
            </dialog-box>
          </div>          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Well from './Well'
import DialogBox from './DialogBox'
import VideoBox from './VideoBox'
import NightSkyBackground from './NightSkyBackground'
import PersonalData from './PersonalData'

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
    'background': NightSkyBackground,
    'personal-data': PersonalData
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
.page-container {
  display: flex;
  height: 100vh;
  justify-content: center;
}
.page-middle {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.page-content {
  display: flex;
  justify-content: center;
}
.page-right-side {
  width: 320px;
  margin-left: 10px;
}
</style>