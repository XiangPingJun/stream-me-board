<template>
  <Content ref="dialog" overflowY="auto" :class="dialogClass">
    <UnderlineText><i class="fas fa-dice"/> 暴力投票系統<PieChart :rate="timerRate" style="margin:0 3px"/></UnderlineText>
    <div v-if="!voted" class="caption yellow">抓準時機按下，投出最多票吧！</div>
    <div v-if="voted" class="caption">已經投過票囉！</div>
    <Well v-for="(roster, i) in voteRoster" @click.native="addClick(i)" :class="optionClass(i)" class="option" :key="i">
      <i class="fas fa-angle-right"/> {{roster.option}} ({{fliper[i]}}票)
      <span v-if="clickCount[i]" class="green">+{{("0"+clickCount[i]).slice(-2)}}</span>
      <span v-if="clickable" class="click red"><i class="fas fa-arrow-left"/> SELECT ME!!</span>
      <div style="display:flex;">
        <Avatar v-for="(uid, i) in roster.uids" :index="allUsers[uid].avatarSelected" :preserved="allUsers[uid].preserved" :key="i"/>
      </div>
    </Well>
  </Content>
</template>

<script>
import Content from './Content'
import UnderlineText from '../UnderlineText'
import Avatar from '../Avatar'
import Well from '../Well'
import PieChart from '../PieChart'
import { VOTE_TIMEOUT } from '../../common'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  data() { return { fliper: [], clickCount: [], clickable: true, timeout: null, dialogClass: 'animated flipInY', timerRate: 0 } },
  components: { Content, UnderlineText, Well, Avatar, PieChart },
  mounted() {
    this.$el.addEventListener("animationend", () => this.dialogClass = '')
    this.clickCount = this.voteRoster.map(() => 5)
    this.flipInterval = setInterval(() => {
      const add = Math.floor(Math.random() * 4) + 4
      this.voteRoster.forEach((roster, i) => {
        if (undefined == this.fliper[i])
          this.$set(this.fliper, i, 0)
        if (this.fliper[i] < roster.total)
          this.$set(this.fliper, i, this.fliper[i] + Math.ceil((roster.total - this.fliper[i]) / 5))
        if (this.fliper[i] > roster.total)
          this.$set(this.fliper, i, roster.total)
        if (!this.clickable)
          return
        this.clickCount[i] += add
        if (this.clickCount[i] > 23)
          this.clickCount[i] = 5
      })
      this.timerRate = 1 - ((new Date().getTime() - this.voteStartTime) / VOTE_TIMEOUT)
    }, 100)
  },
  beforeDestroy() { clearInterval(this.flipInterval) },
  computed: { ...mapState(['voteRoster', 'voteInfo', 'allUsers']), ...mapGetters(['voteStartTime', 'myInfo', 'voted']) },
  watch: {
    voted: {
      immediate: true,
      handler(val) {
        if (!val)
          return
        this.clickable = false
        setTimeout(() => this.clickCount.fill(0), 500)
      }
    }
  },
  methods: {
    optionStyle(i) { return { cursor: this.clickable ? 'pointer' : 'default' } },
    optionClass(i) {
      if (!this.voteInfo.ended)
        return 'option'
      if (Math.max(...this.voteRoster.map(roster => roster.total)) != this.voteRoster[i].total)
        return 'option animated zoomOutLeft'
    },
    addClick(i) {
      if (!this.clickable)
        return
      if (!this.myInfo.name) {
        this.promptLogin()
        return
      }
      this.clickCount = this.clickCount.map((count, j) => i == j ? count : 0)
      this.clickable = false
      this.sendVote(this.clickCount)
    },
    ...mapActions(['sendVote', 'promptLogin'])
  }
}
</script>

<style scoped>
.caption {
  margin-bottom: 10px;
  font-weight: bold;
}
.click {
  animation: blinker 0.2s step-start infinite;
  font-weight: bold;
}
@keyframes blinker {
  50% {
    opacity: 0;
  }
}
.option {
  margin-right: 5px;
  user-select: none;
}
</style>