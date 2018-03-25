<template>
  <div style="display:flex">
    <dialog-box>
      <div style="margin-bottom: 12px;">&gt; 新注音實況台</div>
      <video-box :height="vidoeHeight" src="//www.youtube.com/embed/Xzv7eh2VaNI?enablejsapi=1"></video-box>
    </dialog-box>
  </div>
</template>

<script>
import Well from './Well.vue'
import DialogBox from './DialogBox.vue'
import VideoBox from './VideoBox.vue'

export default {
  data() {
    return {
      vidoeHeight: 0
    }
  },
  components: {
    well: Well,
    'dialog-box': DialogBox,
    'video-box': VideoBox
  },
  created() {
    this.vidoeHeight = document.documentElement.clientHeight - 100
  }
}
</script>