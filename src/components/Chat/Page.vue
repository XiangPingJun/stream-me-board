<template>
  <div>
    <MicWarningBar/>
    <ChatLine v-for="(line, key) in chatLines" :key="key" :user="allUsers[line.uid]" :text="line.text" class="animated flipInX"/>    
  </div>
</template>

<script>
import ChatLine from './ChatLine'
import MicWarningBar from './MicWarningBar'
import { mapActions, mapState } from 'vuex'

export default {
  components: { ChatLine, MicWarningBar },
  computed: { ...mapState(['allUsers', 'chatLines']) },
  created() { this.subscribeData() },
  methods: { ...mapActions(['subscribeData']) },
  watch: {
    chatLines() { setTimeout(() => window.scrollTo(0, document.body.scrollHeight)) }
  }
}
</script>