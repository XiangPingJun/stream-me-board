<template>
  <div>
    <MicWarningBar/>
    <ChatLine v-for="(line, key) in chatLines.slice(-300)" 
      :user="allUsers[line.uid]" :text="line.text" :sticker="line.sticker" :stickerCategory="line.stickerCategory"
      class="animated flipInX" :key="key"
    />
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
  watch: { chatLines() { this.$nextTick(() => window.scrollTo(0, document.body.scrollHeight)) } }
}
</script>