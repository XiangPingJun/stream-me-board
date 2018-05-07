<template>
  <div v-if="stream">
    <h1 v-if="stream.streaming">直播中</h1>
    <h1 v-if="!stream.streaming">沒有直播</h1>
    <div>影片網址:</div>
    <input v-model="videoUrl" :placeholder="stream.videoUrl" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return { videoUrl: '' }
  },
  created() { this.subscribeData() },
  methods: { ...mapActions(['subscribeData']) },
  computed: { ...mapGetters(['stream', 'systemInfo']) },
  watch: {
    systemInfo(val, oldVal) {
      if (null !== val && null !== oldVal && val.version != oldVal.version)
        window.location.reload(true)
    },
  }
}
</script>

<style>
h1 {
  color: gray;
}
input {
  width: 100%;
  font-size: 200%;
}
</style>
