<template>
  <div>
    <NightSkyBackground />
    <div class="page">
      <VideoBox ref="video" :height="videoHeight" :width="videoWidth" />
      <div class="right-side">
        <!-- top section -->
        <MyInfo v-if="sectionVisible.myInfo" :style="topAnimationStyle" />
        <DialogBox v-if="sectionVisible.login" class="top animated flipInX">
          <Login />
        </DialogBox>
        <!-- login arrow -->
        <Arrow ref="arrow" v-if="sectionVisible.login" class="login-arrow" />

        <!-- middle section -->
        <DialogBox v-if="sectionVisible.quiz" overflowY="auto" class="middle animated flipInY" :style="middleAnimationStyle">
          <quiz />
        </DialogBox>

        <!-- bottom section -->
        <DialogBox overflowY="auto" class="bottom animated flipInY" :style="bottomAnimationStyle">
          <ChatBox />
        </DialogBox>
      </div>
    </div>
  </div>
</template>

<script>
import DialogBox from '../DialogBox'
import VideoBox from '../VideoBox'
import NightSkyBackground from './NightSkyBackground'
import ChatBox from './ChatBox'
import Quiz from './Quiz'
import MyInfo from './MyInfo'
import Login from './Login'
import Arrow from './Arrow'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      videoWidth: 0,
      videoHeight: 0,
      topAnimationStyle: { 'animation-delay': '0.5s' },
      middleAnimationStyle: { 'animation-delay': '1s' },
      bottomAnimationStyle: { 'animation-delay': '1.5s' },
    }
  },
  components: { DialogBox, VideoBox, NightSkyBackground, ChatBox, Quiz, MyInfo, Login, Arrow, },
  created() { this.observeUpdates() },
  mounted() {
    const width = document.documentElement.clientWidth
    const height = document.documentElement.clientHeight
    this.videoWidth = width - 420
    setTimeout(() => {
      if (this.$refs.video.$refs.iframe.clientHeight > document.documentElement.clientHeight) {
        this.videoWidth = undefined
        this.videoHeight = height - 50
      }
    })
    setTimeout(() => this.topAnimationStyle = this.middleAnimationStyle = this.bottomAnimationStyle = {}, 5000)

    this.$store.subscribeAction((action, state) => {
      if ('promptLogin' === action.type)
        setTimeout(() => this.$refs.arrow.animate())
    })
  },
  watch: {
    systemInfo(val, oldVal) {
      if (null !== val && null !== oldVal && val.version != oldVal.version)
        window.location.reload(true)
    }
  },
  computed: { ...mapGetters(['systemInfo', 'sectionVisible']) },
  methods: { ...mapActions(['observeUpdates']) }
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
  padding: 10px 5px;
}
.right-side .top {
  flex-shrink: 0;
}
.right-side .middle {
  flex-shrink: 1;
}
.right-side .bottom {
  flex-grow: 1;
  flex-shrink: 9999999;
  min-height: 120px;
}
.login-arrow {
  top: 60px;
  right: 380px;
}
</style>