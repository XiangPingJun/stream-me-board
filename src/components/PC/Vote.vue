<template>
  <DialogBox overflowY="auto" class="animated flipInY">
    <UnderlineText><i class="fas fa-dice"/> 暴力投票系統</UnderlineText>
    <div v-if="!submitted" class="caption yellow">一人有多票！滑鼠點越快投越多票！</div>
    <div v-if="submitted" class="caption">已經投過票囉！</div>
    <Well v-for="(roster, i) in voteRoster" @click.native="addClick(i)" :style="optionStyle(i)" class="option" :key="i">
      <i class="fas fa-angle-right"/> {{roster.option}} ({{fliper[i]}}票)
      <span v-if="!submitted&&clickCount[i]" class="green">+{{clickCount[i]}}</span>
      <span v-if="clickable" class="click red"><i class="fas fa-arrow-left"/> Click!!</span>
      <div style="display:flex;">
        <UserAvatar v-for="(user, i) in roster.users" :user="user" :key="i"/>
      </div>
    </Well>
  </DialogBox>
</template>

<script>
import DialogBox from '../DialogBox'
import UnderlineText from '../UnderlineText'
import UserAvatar from './UserAvatar'
import Well from '../Well'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() { return { fliper: [], clickCount: [], submitted: null, clickable: true, flipInterval: null, timeout: null } },
  components: { DialogBox, UnderlineText, Well, UserAvatar },
  mounted() {
    this.flipInterval = setInterval(() => {
      this.voteRoster.forEach((roster, i) => {
        if (undefined == this.fliper[i])
          this.$set(this.fliper, i, 0)
        if (this.fliper[i] < roster.total)
          this.$set(this.fliper, i, this.fliper[i] + Math.ceil((roster.total - this.fliper[i]) / 5))
        if (this.fliper[i] > roster.total)
          this.$set(this.fliper, i, roster.total)
      })
    }, 100)
  },
  beforeDestroy() { clearInterval(this.flipInterval) },
  computed: { ...mapGetters(['voteRoster', 'myInfo']) },
  methods: {
    optionStyle(i) {
      return {
        cursor: this.clickable ? 'pointer' : 'default',
        'user-select': 'none'
      }
    },
    addClick(i) {
      if (!this.clickable)
        return
      if (!this.myInfo.name) {
        this.promptLogin()
        return
      }
      this.$set(this.clickCount, i, this.clickCount[i] + 1 || 1)
      if (!this.timeout) {
        this.timeout = setTimeout(() => {
          this.clickable = false
          this.sendVote(this.clickCount)
        }, 2000)
      }
    },
    ...mapActions(['sendVote', 'promptLogin'])
  },
  watch: {
    voteRoster(val) {
      val.forEach((roster, i) => {
        if (roster.users.find(user => user.uid == this.myInfo.uid)) {
          this.submitted = true
          this.clickable = false
        }
      })
    }
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
</style>