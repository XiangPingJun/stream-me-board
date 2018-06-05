<template>
  <div>
    <Vote v-if="voting" style="opacity: 0.8"/>
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
  computed: { ...mapState(['voting']) },
  methods: { ...mapActions(['subscribeData']) },
}
</script>

<style>
</style>
