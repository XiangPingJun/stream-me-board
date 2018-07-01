<template>
  <Content>
    <UnderlineText><i class="fas fa-question"/> 益智問答通<PieChart :rate="timerRate" style="margin:0 3px"/></UnderlineText>
    <div class="question">{{quizInfo.Q}}</div>
    <Well v-for="(roster, i) in quizRoster" @click.native="select(i)" 
      :style="{cursor: clickable?'pointer':'default'}" :class="optionClass(i)" class="option" :key="i"
    >
      <i class="fas fa-angle-right"/> {{roster.option}}
      <div style="display:flex;">
        <Avatar v-for="(uid, i) in roster.uids" :index="allUsers[uid].avatarSelected" :preserved="allUsers[uid].preserved" :key="i"/>
      </div>
    </Well>
  </Content>
</template>

<script>
import UnderlineText from '../UnderlineText'
import Well from '../Well'
import Avatar from '../Avatar'
import PieChart from '../PieChart'
import Content from './Content'
import { QUIZ_TIMEOUT } from '../../common'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data() { return { clickable: true, dialogClass: 'animated flipInY', timerRate: 0 } },
  components: { UnderlineText, Well, Avatar, PieChart, Content },
  mounted() {
    this.$el.addEventListener("animationend", () => this.dialogClass = '')
    this.flipInterval = setInterval(() => this.timerRate = 1 - ((new Date().getTime() - this.quizStartTime) / QUIZ_TIMEOUT), 100)
  },
  beforeDestroy() { clearInterval(this.flipInterval) },
  computed: { ...mapState(['quizRoster', 'quizInfo', 'allUsers']), ...mapGetters(['quizStartTime', 'myInfo', 'quizAnswered']) },
  watch: {
    quizAnswered: {
      immediate: true,
      handler(val) {
        if (undefined != val)
          this.clickable = false
      }
    }
  },
  methods: {
    optionClass(i) {
      if (!this.quizInfo.ended)
        return
      if (this.quizInfo.A != i)
        return 'animated zoomOutLeft'
    },
    select(i) {
      if (!this.clickable)
        return
      this.clickable = false
      if (!this.myInfo.name) {
        this.promptLogin()
        return
      }
      this.sendAnswer(i)
    },
    ...mapActions(['sendAnswer', 'promptLogin']), ...mapMutations(['setUiMode', 'updateUiMode'])
  }
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: flex-start;
}
.question {
  margin-bottom: 10px;
}
.option {
  margin-right: 5px;
  user-select: none;
}
</style>