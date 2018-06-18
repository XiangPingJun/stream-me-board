<template>
  <div style="display:flex; justify-content:center;" :style="{width:videoSize.width}">
    <div class="video-box animated" :class="{flipInX: loaded}" v-show="loaded && videoUrl">
      <div class="video-container">
        <iframe ref="iframe" frameBorder="0" allow="autoplay; encrypted-media" :src="videoUrl" :style="videoSize"/>
      </div>
    </div>
    <div class="MobileFont thank-you animated flipInX" v-if="null===videoUrl && false===stream.streaming">
      Thanks for watching!
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { setVideoPlayer } from '../../common'

export default {
  props: ['width', 'height'],
  data() { return { loaded: false } },
  computed: {
    videoSize() {
      return {
        width: `${this.width || this.height * (16 / 9)}px`,
        height: `${this.height || this.width * (9 / 16)}px`,
      }
    },
    ...mapState(['stream']), ...mapGetters(['videoUrl'])
  },
  watch: {
    videoUrl(val, oldVal) {
      if (null === val)
        return
      this.loaded = false
      this.$refs.iframe.onload = () => {
        this.loaded = true
        this.setupYoutube()
      }
    }
  },
  methods: {
    setupYoutube() {
      if ('undefined' === typeof YT || !YT.Player)
        return setTimeout(() => this.setupYoutube(), 1000)
      const player = new YT.Player(this.$refs.iframe, {
        events: {
          onReady: () => {
            player.playVideo()
            setTimeout(() => player.playVideo(), 500)
            setTimeout(() => player.playVideo(), 1000)
            setTimeout(() => player.playVideo(), 3000)
          }
        }
      })
      setVideoPlayer(player)
    }
  }
}
</script>

<style scoped>
.video-box {
  position: relative;
}
.video-box:before,
.video-box:after {
  z-index: -1;
  position: absolute;
  content: "";
  bottom: 15px;
  left: 10px;
  width: 50%;
  top: 80%;
  max-width: 378px;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.5);
  transform: rotate(-5deg);
  margin: 5px;
}
.video-box:after {
  transform: rotate(5deg);
  right: 10px;
  left: auto;
}
.video-box .video-container {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}
.video-box .video-container iframe {
  margin: 0 0 -7px 0;
}
.thank-you {
  font-size: 70px;
  text-align: center;
}
</style>