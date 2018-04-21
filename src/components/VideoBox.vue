<template>
  <div class="video-box animated" :class="{flipInX: loaded}" :style="{visibility: loaded ? 'visible': 'hidden'}">
    <div class="container">
      <iframe ref="iframe" frameBorder="0" allowFullScreen="true" :src="src" :style="videoSize" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['width', 'height', 'src'],
  data() {
    return {
      loaded: false
    }
  },
  mounted() {
    this.$refs.iframe.onload = () => {
      this.loaded = true
      this.setupYoutube()
    }
  },
  computed: {
    videoSize: function () {
      return {
        width: `${this.width || this.height * (16 / 9)}px`,
        height: `${this.height || this.width * (9 / 16)}px`,
      }
    }
  },
  methods: {
    setupYoutube() {
      if ('undefined' === typeof YT || !YT.Player)
        return setTimeout(() => this.setupYoutube(), 1000)
      const player = new YT.Player(this.refs.iframe, {
        events: {
          'onReady': () => {
            if (this.props.autoPlay)
              player.playVideo()
            player.setPlaybackQuality(isMobileDevice() ? 'medium' : 'hd720')
          }
        }
      })
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
.video-box .container {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}
.video-box .container iframe {
  margin: 0 0 -7px 0;
}
</style>