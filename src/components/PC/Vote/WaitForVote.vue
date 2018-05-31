<template>
  <div>
    <UnderlineText>投票開始啦！</UnderlineText>
  </div>
</template>

<script>
import UnderlineText from '../../UnderlineText'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { UnderlineText },
  methods: { ...mapActions(['sendVote']) },
  computed: { ...mapGetters(['vote']) }
}
</script>

<style scoped>
</style>