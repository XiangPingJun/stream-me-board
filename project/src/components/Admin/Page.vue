<template>
  <div>
    <div v-if="false==isAdmin">
      <form @submit.prevent="loginAdmin({name,password}); sending=true;">
        <h2>無管理權限，登入暱稱:<input v-model="name"/>密碼<input type="password" v-model="password"/></h2>
        <input type="submit" :value="sending ? 'sending...' : ''"/>
      </form>
    </div>
    <div v-if="isAdmin">
      <h1 v-if="'WILL_START'==stream.status">沒有直播</h1>
      <h1 v-if="'STARTED'==stream.status">直播中</h1>
      <h1 v-if="'ENDED'==stream.status">沒有直播</h1>
      <p/>
      
      <div>影片網址:</div>
      <input :value="stream.videoUrl" @change="e => saveVideoUrl(e.target.value.trim())" onfocus="this.select()">
      <div>預計開始時間:</div>
      <input :value="stream.planToStartAt" @change="e => savePlanToStartAt(e.target.value.trim())" onfocus="this.select()">
      <p/>

      <div>今天跟大家一起玩的是:</div>
      <input :value="stream.gameTitle" @change="e => saveGameTitle(e.target.value.trim())" onfocus="this.select()">
      <div>連結:</div>
      <input :value="stream.gameUrl" @change="e => saveGameUrl(e.target.value.trim())" onfocus="this.select()">
      <div>簡述:</div>
      <input :value="stream.gameDescription" @change="e => saveGameDescription(e.target.value.trim())" onfocus="this.select()">
      <p/>

      <button @click="streamWillStart" :disabled="'WILL_START'==stream.status||'STARTED'==stream.status">即將開始</button>
      <button @click="startStream" :disabled="'STARTED'==stream.status||'ENDED'==stream.status">開始</button>
      <button @click="stopStream" :disabled="'ENDED'==stream.status">結束</button>
      <p/>

      <label>選項數:</label>
      <label v-for="(item, i) in new Array(4)" :key="i">
        <input type="radio" v-model="voteOptionCount" :value="i+2" :disabled="!voteInfo.ended" name="vote-option-count"/> {{i+2}}個 
      </label>
      <button v-if="voteInfo.ended" @click="startVote(voteOptionCount)"><i class="fa fa-chart-bar"/> 投票</button>
      <button v-if="!voteInfo.ended" :disabled="true"><i class="fas fa-spinner fa-pulse"/> 投票進行中</button>
      <p/>

      <div>尋找uid:</div>
      <input v-model="userSearch"/>
      <div style="height:200px; overflow-y:auto;">
        <div v-for="uid in filteredUid" :key="uid">{{allUsers[uid].name}}　　<i>{{uid}}</i></div>
      </div>
      <p/>

      <div>跑測試:</div>
      <button @click="showRunTestConfirm=true" :disabled="showRunTestConfirm">跑測試</button>
      <button v-if="showRunTestConfirm" @click="runTest">確認測試</button>
      <p/>

    </div>
    <Notify :large="true"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Notify from '../Notify'

export default {
  data() { return { name: '', password: '', sending: null, voteOptionCount: 2, userSearch: ' ', filteredUid: [], showRunTestConfirm: false } },
  created() { this.subscribeData() },
  components: { Notify },
  methods: { ...mapActions(['subscribeData', 'loginAdmin', 'streamWillStart', 'startStream', 'stopStream', 'saveVideoUrl', 'saveGameTitle', 'saveGameUrl', 'saveGameDescription','savePlanToStartAt', 'startVote', 'sendChat', 'runTest']) },
  computed: { ...mapState(['voteInfo', 'isAdmin', 'stream', 'voteRoster', 'quizRoster', 'quizInfo', 'allUsers']) },
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
      if (undefined == val.status || undefined == oldVal.status || val.status == oldVal.status)
        return
      if ('WILL_START' == val.status)
        setTimeout(() => this.sendChat({ uid: 'system', text: '直播即將開始～快點先來卡個位吧！' }), 3000)
      else if ('STARTED' == val.status)
        setTimeout(() => this.sendChat({ uid: 'system', text: '直播開始囉！大家坐穩啦！' }), 3000)
      else if ('ENDED' == val.status)
        this.sendChat({ uid: 'system', text: '直播結束囉！每周五22:00試撥中！其餘加開次請參考上方 "如何追蹤我們的頻道？"' })
    },
    userSearch(val, oldVal) {
      val = val.trim().toLowerCase()
      if (!val) {
        this.filteredUid = Object.keys(this.allUsers)
      } else {
        this.filteredUid = []
        for (const [uid, user] of Object.entries(this.allUsers))
          if (user.name.toLowerCase().indexOf(val) >= 0 || uid.toLowerCase().indexOf(val) >= 0)
            this.filteredUid.push(uid)
      }
    },
    allUsers(val, oldVal) {
      if (0 == Object.keys(oldVal).length)
        this.userSearch = ''
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
