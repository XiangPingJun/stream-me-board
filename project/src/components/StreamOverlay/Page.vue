<template>
  <div>
    <Vote v-if="uiMode.vote" style="opacity: 0.75"/>
    <BubbleContainer style="opacity: 0.75"/>
  </div>
</template>

<script>
import BubbleContainer from './BubbleContainer'
import Vote from './Vote'
import { mapState, mapActions } from 'vuex'

export default {
  components: { BubbleContainer, Vote },
  created() { this.subscribeData() },
  computed: { ...mapState(['uiMode']) },
  methods: { ...mapActions(['subscribeData']) },
}
</script>

<style>
</style>
