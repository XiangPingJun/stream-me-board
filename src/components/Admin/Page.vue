<template>
  <div>
    <div v-if="false==isAdmin">
      <form @submit.prevent="loginAdmin({name,password}); sending=true;">
        <h2>無管理權限，登入暱稱:<input v-model="name"/>密碼<input type="password" v-model="password"/></h2>
        <input type="submit" :value="sending ? 'sending...' : ''"/>
      </form>
    </div>
    <div v-if="isAdmin">
      <h1 v-if="stream.streaming">直播中</h1>
      <h1 v-if="!stream.streaming">沒有直播</h1>
      <p/>
      
      <div>影片網址:</div>
      <input :value="stream.videoUrl" @change="e => saveVideoUrl(e.target.value.trim())" onfocus="this.select()">
      <p/>

      <div>今天跟大家一起玩的是:</div>
      <input :value="stream.gameTitle" @change="e => saveGameTitle(e.target.value.trim())" onfocus="this.select()">
      <div>連結:</div>
      <input :value="stream.gameUrl" @change="e => saveGameUrl(e.target.value.trim())" onfocus="this.select()">
      <div>簡述:</div>
      <input :value="stream.gameDescription" @change="e => saveGameDescription(e.target.value.trim())" onfocus="this.select()">
      <p/>

      <button @click="startStream" :disabled="stream.streaming"><i class="fas fa-link"/> 開始</button>
      <button @click="stopStream" :disabled="!stream.streaming"><i class="fas fa-unlink"/> 結束</button>
      <p/>

      <label>選項數:</label>
      <label v-for="(item, i) in new Array(4)" :key="i">
        <input type="radio" v-model="voteOptionCount" :value="i+2" :disabled="!voteInfo.ended" name="vote-option-count"/> {{i+2}}個 
      </label>
      <button v-if="voteInfo.ended" @click="startVote(voteOptionCount)"><i class="fa fa-chart-bar"/> 投票</button>
      <button v-if="!voteInfo.ended" :disabled="true"><i class="fas fa-spinner fa-pulse"/> 投票進行中</button>
    </div>
    <Notify :large="true"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Notify from '../Notify'

export default {
  data() {
    return { name: '', password: '', sending: null, voteOptionCount: 2 }
  },
  created() { this.subscribeData() },
  methods: { ...mapActions(['subscribeData', 'loginAdmin', 'startStream', 'stopStream', 'saveVideoUrl', 'saveGameTitle', 'saveGameUrl', 'saveGameDescription', 'startVote', 'sendChat']) },
  computed: { ...mapState(['voteInfo', 'isAdmin', 'stream', 'voteRoster', 'quizRoster', 'quizInfo']) },
  mounted() {
    this.unsubscribeAction = this.$store.subscribeAction((action, state) => {
      if ('notify' == action.type)
        return this.$notify({
          group: 'notify',
          data: { ...action.payload.data },
          ...action.payload
        })
    })
  },
  beforeDestroy() {
    this.unsubscribeAction()
  },
  watch: {
    stream(val, oldVal) {
      if (undefined == val.streaming || undefined == oldVal.streaming || val.streaming == oldVal.streaming)
        return
      if (val.streaming)
        setTimeout(() => this.sendChat({ uid: 'system', text: '直播開始囉！大家坐穩啦！', }), 3000)
      else
        this.sendChat({ uid: 'system', text: '直播結束囉！期待下次與大家相會！', })
    },
    voteInfo(val, oldVal) {
      if (!val.ended)
        return
      let text = ''
      this.voteRoster.forEach(item => text += ` ${item.option}(${item.total}票)`)
      this.sendChat({ uid: 'system', text: text })
    },
    quizInfo(val, oldVal) {
      if (val.ended) {
        this.sendChat({ uid: 'system', text: `A: ${this.quizInfo.OP[this.quizInfo.A]}` })
      } else {
        let text = `Q: ${this.quizInfo.Q}`
        this.quizInfo.OP.forEach(op => text += ` [${op}]`)
        this.sendChat({ uid: 'system', text: text })
      }
    }
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
label {
  font-size: 40px;
  cursor: pointer;
}
input[type="radio"] {
  width: auto;
  transform: scale(2);
  vertical-align: middle;
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
