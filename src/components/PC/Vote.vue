<template>
  <DialogBox>
    <UnderlineText>暴力投票系統</UnderlineText>
    <div vi-if="!voted" class="caption yellow">一人有多票! 狂點滑鼠! 按幾下就幾票!</div>
    <Well v-for="(roster, i) in voteRoster" :key="i">
      {{roster.option}}: {{roster.total}}票
      <div style="display:flex;">
        <UserAvatar v-for="(user, i) in roster.users" :user="user" :key="i"/>
      </div>
    </Well>
  </DialogBox>
</template>

<script>
import DialogBox from '../DialogBox'
import UnderlineText from '../UnderlineText'
import Well from '../Well'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { DialogBox, UnderlineText, Well },
  mounted() { this.notify({ text: '投票開始啦！一人有多票！狂點你的滑鼠！按幾下就幾票！' }) },
  computed: { ...mapGetters(['voteRoster', 'voted']) },
  methods: { ...mapActions(['notify']) }
}
</script>

<style scoped>
.caption {
  margin-bottom: 10px;
}
</style>