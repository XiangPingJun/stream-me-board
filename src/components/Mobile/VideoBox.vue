<template>
  <div :style="videoSize" style="display:flex; justify-content:center; align-items:center;">
    <iframe ref="iframe" frameBorder="0" allowFullScreen="true" :src="videoUrl" :style="videoSize" v-show="loaded && videoUrl"/>
    <div v-if="null===videoUrl&&'ENDED'===stream.status" class="thank-you yellow MobileFont animated flipInX">
      Thanks for watching !!
    </div>
    <div v-if="null===videoUrl&&'WILL_START'===stream.status" class="will-start red MobileFont animated infinite pulse">
      Show will be started !!
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
.thank-you,
.will-start {
  font-size: 40px;
  line-height: 45px;
  font-weight: bold;
  text-align: center;
  padding: 15px;
}
.will-start {
  animation-duration: 3s;
}
</style>