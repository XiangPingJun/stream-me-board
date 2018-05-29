<template>
  <div>
    <ChatLine v-for="(line, key) in chatLines" :key="key" :user="allUsers[line.uid]" :text="line.text" class="animated flipInX" />    
  </div>
</template>

<script>
import ChatLine from '../ChatLine'
import { mapGetters, mapActions } from 'vuex'
import { setTimeout } from 'timers';

export default {
  components: { ChatLine },
  computed: { ...mapGetters(['chatLines', 'allUsers']) },
  created() { this.subscribeData() },
  methods: { ...mapActions(['subscribeData']) },
  watch: {
    chatLines() { setTimeout(() => window.scrollTo(0, document.body.scrollHeight)) }
  }
}
</script>

<style>
.line {
  margin-left: 20px;
}
.avatar {
  transform: scale(3, 3);
  margin-right: 35px;
}
span {
  font-size: 50px;
  margin-top: 50px;
  color: white;
}
</style>
