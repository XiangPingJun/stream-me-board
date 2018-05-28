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
    chatLines() {
      setTimeout(() => {
        console.log(document.body.scrollHeight, document.body.scrollTo)
        document.body.scrollTo(document.body.scrollHeight, document.body.scrollHeight)
      }, 1000)
    }
  }
}
</script>

<style>
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
