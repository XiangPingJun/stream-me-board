<template>
  <DialogBox overflowY="auto">
    <UnderlineText><i class="fas fa-dice"/> 暴力投票系統</UnderlineText>
    <div v-if="!submitted" class="caption yellow">一人有多票！滑鼠點幾下就投幾票！</div>
    <div v-if="submitted" class="caption">已經投過票囉！</div>
    <Well v-for="(roster, i) in voteRoster" @click.native="addClick(i)" :style="optionStyle(i)" class="option" :key="i">
      &lt;{{roster.option}}&gt; {{fliper[i]}}票 <span v-if="!submitted&&clickCount[i]" class="green">+{{clickCount[i]}}</span>
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
  data() { return { fliper: [], clickCount: [], submitted: null, clickEnded: null, flipInterval: null } },
  components: { DialogBox, UnderlineText, Well, UserAvatar },
  mounted() {
    this.flipInterval = setInterval(() => {
      this.voteRoster.forEach((roster, i) => {
        if (undefined == this.fliper[i])
          this.$set(this.fliper, i, 0)
        if (this.fliper[i] < roster.total)
          this.$set(this.fliper, i, this.fliper[i] + 7)
        if (this.fliper[i] > roster.total)
          this.$set(this.fliper, i, roster.total)
      })
    }, 200)
    this.notify({ text: '投票開始啦！一人有多票！狂點你的滑鼠！按幾下就幾票！' })
  },
  beforeDestroy() { clearInterval(this.flipInterval) },
  computed: { ...mapGetters(['voteRoster', 'myInfo']) },
  methods: {
    optionStyle(i) {
      return {
        cursor: this.submitted ? 'default' : 'pointer',
        'user-select': 'none'
      }
    },
    addClick(i) {
      if (this.submitted)
        return
      if (!this.clickEnded)
        this.$set(this.clickCount, i, this.clickCount[i] + 1 || 1)
      if (null === this.clickEnded)
        setTimeout(() => {
          this.clickEnded = true
          this.sendVote(this.clickCount)
        }, 2000)
    },
    ...mapActions(['notify', 'sendVote'])
  },
  watch: {
    voteRoster(val) {
      val.forEach((roster, i) => {
        if (roster.users.find(user => user.uid == this.myInfo.uid))
          this.submitted = true
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
</style>