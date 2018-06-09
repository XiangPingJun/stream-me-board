<template>
  <div :style="videoSize" style="display:flex; justify-content:center;">
    <iframe ref="iframe" frameBorder="0" allowFullScreen="true" :src="videoUrl" :style="videoSize" v-show="loaded && videoUrl"/>
    <img src="static/thank.png" v-if="null===videoUrl && false===stream.streaming" :style="{height:videoSize.height}"/>
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
          onReady: () => player.playVideo()
        }
      })
      setVideoPlayer(player)
    }
  }
}
</script>