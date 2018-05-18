<template>
  <div>
    <form v-if="!isAdmin" @submit.prevent="loginAdmin({name,password})">
      <h2>無管理權限，登入暱稱:<input v-model="name" />密碼<input type="password" v-model="password" /></h2>
      <input type="submit" style="display:none;" />
    </form>
    <h5>(※直播時請不要關閉此頁)</h5>
    <h1 v-if="stream.streaming">直播中</h1>
    <h1 v-if="!stream.streaming">沒有直播</h1>
    <div>影片網址:</div>
    <input v-model="videoUrl" :placeholder="videoUrlPlaceholder" />
    <button @click="startStream(videoUrl)" :disabled="!videoUrl"><i class="fas fa-link" /> 開始</button>
    <button @click="stopStream" :disabled="!stream.streaming"><i class="fas fa-unlink" /> 結束</button>
    <notifications position="bottom left" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return { videoUrl: '', name: '', password: '' }
  },
  created() {
    this.subscribeData()
    this.subscribeAdminData()
  },
  methods: { ...mapActions(['subscribeData', 'loginAdmin', 'startStream', 'stopStream', 'subscribeAdminData']) },
  computed: {
    videoUrlPlaceholder() {
      return this.stream.streaming ? this.stream.videoUrl : ''
    },
    ...mapGetters(['stream', 'systemInfo', 'isAdmin'])
  },
  watch: {
    systemInfo(val, oldVal) {
      if (null !== val && null !== oldVal && val.version != oldVal.version)
        window.location.reload(true)
    },
  },
  mounted() {
    this.unsubscribeAction = this.$store.subscribeAction((action, state) => {
      switch (action.type) {
        case 'notify':
          return this.$notify(action.payload)
      }
    })
  }
}
</script>

<style>
h1,
h2,
h5 {
  color: gray;
  margin: 0px;
}
input {
  width: 100%;
  font-size: 200%;
}
button {
  font-size: 200%;
  margin: 5px;
  cursor: pointer;
}
</style>
