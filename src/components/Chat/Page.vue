<template>
  <div>
    <MicWarningBar />
    <ChatLine v-for="(line, key) in chatLines" :key="key" :user="allUsers[line.uid]" :text="line.text" class="animated flipInX" />    
  </div>
</template>

<script>
import ChatLine from './ChatLine'
import MicWarningBar from './MicWarningBar'
import { mapGetters, mapActions } from 'vuex'
import { setTimeout } from 'timers';

export default {
  components: { ChatLine, MicWarningBar },
  computed: { ...mapGetters(['chatLines', 'allUsers']) },
  created() { this.subscribeData() },
  methods: { ...mapActions(['subscribeData']) },
  watch: {
    chatLines() { setTimeout(() => window.scrollTo(0, document.body.scrollHeight)) }
  }
}
</script>