<template>
  <div>
    <div style="display:flex">
      <VideoBox ref="video" :width="videoWidth"/>
      <div class="tool-bar">
        <IconButton icon="fas fa-user"/>
        <IconButton icon="fas fa-comment-alt"/>
        <IconButton icon="fab fa-fort-awesome"/>
      </div>
    </div>
    <div style="padding: 8px 4px 0px 8px">
      <HistoryVideo :style="dialogStyle"/>
    </div>
  </div>
</template>

<script>
import HistoryVideo from './HistoryVideo'
import VideoBox from './VideoBox'
import IconButton from './IconButton'
import { mapActions, mapState } from 'vuex'

export default {
  components: { VideoBox, IconButton, HistoryVideo },
  computed: {
    videoWidth() { return document.documentElement.clientWidth - 40 },
    dialogStyle() {
      return { height: document.documentElement.clientHeight - this.videoWidth * (9 / 16) - 10 + 'px' }
    },
    ...mapState(['allUsers'])
  },
  mounted() {
    this.subscribeData()
  },
  methods: { ...mapActions(['subscribeData']) },
}
</script>

<style scoped>
.tool-bar {
  display: flex;
  flex-direction: column;
}
</style>
