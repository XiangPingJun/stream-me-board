<template>
  <Content overflowY="auto">
    <div class="animated flipInX">
      <div><UnderlineText>直播結束囉!來看過去的直播吧!</UnderlineText></div>
      <a @click="updateUiMode({followUs:true})">
        <i class="fas fa-bell"/> 如何追蹤我們的頻道？
      </a>
    </div>
    <div class="grid animated flipInYY">
      <WhiteBorder v-for="(video, i) in historyVideo" :key="i" style="margin: 0 5px 5px 0;">
        <div :style="thumbnailStyle()" @click="playHistory(video.id.videoId)">
          <img :style="thumbnailStyle()" :src="video.snippet.thumbnails.medium.url"/>
        </div>
      </WhiteBorder>
    </div>
  </Content>
</template>

<script>
import UnderlineText from '../UnderlineText'
import Well from '../Well'
import Content from './Content'
import WhiteBorder from '../WhiteBorder'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  components: { UnderlineText, Well, Content, WhiteBorder },
  computed: { ...mapState(['historyVideo']) },
  mounted() {
    this.resizeListener = () => this.$forceUpdate()
    window.addEventListener('resize', this.resizeListener, false)
  },
  beforeDestroy() { window.removeEventListener('resize', this.resizeListener) },
  methods: {
    thumbnailStyle() {
      const thumbnailWidth = (document.documentElement.clientWidth - 58) / 2
      return {
        width: thumbnailWidth + 'px',
        height: thumbnailWidth * (9 / 16) + 'px',
        overflow: 'hidden'
      }
    },
    ...mapActions(['playHistory']), ...mapMutations(['updateUiMode'])
  }
}
</script>

<style scoped>
.grid {
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
</style>