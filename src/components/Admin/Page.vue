<template>
  <div>
    <div v-if="false==isAdmin">
      <form @submit.prevent="loginAdmin({name,password}); sending=true;">
        <h2>無管理權限，登入暱稱:<input v-model="name" />密碼<input type="password" v-model="password" /></h2>
        <input type="submit" :value="sending ? 'sending...' : ''" />
      </form>
    </div>
    <div v-if="isAdmin">
      <h1 v-if="stream.streaming">直播中</h1>
      <h1 v-if="!stream.streaming">沒有直播</h1>
      <p />
      
      <div>影片網址:</div>
      <input :value="stream.videoUrl" @change="e => saveVideoUrl(e.target.value.trim())" onfocus="this.select()">
      <p />

      <div>今天跟大家一起玩的是:</div>
      <input :value="stream.gameTitle" @change="e => saveGameTitle(e.target.value.trim())" onfocus="this.select()">
      <div>連結:</div>
      <input :value="stream.gameUrl" @change="e => saveGameUrl(e.target.value.trim())" onfocus="this.select()">
      <div>簡述:</div>
      <input :value="stream.gameDescription" @change="e => saveGameDescription(e.target.value.trim())" onfocus="this.select()">
      <p />

      <button @click="startStream" :disabled="stream.streaming"><i class="fas fa-link" /> 開始</button>
      <button @click="stopStream" :disabled="!stream.streaming"><i class="fas fa-unlink" /> 結束</button>
    </div>
    <notifications position="bottom left" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return { name: '', password: '', sending: null }
  },
  created() { this.subscribeData() },
  methods: { ...mapActions(['subscribeData', 'loginAdmin', 'startStream', 'stopStream', 'saveVideoUrl', 'saveGameTitle', 'saveGameUrl', 'saveGameDescription']) },
  computed: { ...mapGetters(['stream', 'systemInfo', 'isAdmin']) },
  watch: {
    systemInfo(val, oldVal) {
      if (null !== val && null !== oldVal && val.version != oldVal.version)
        window.location.reload(true)
    }
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
textarea {
  height: 150px;
  width: 100%;
  font-size: 20px;
}
</style>
