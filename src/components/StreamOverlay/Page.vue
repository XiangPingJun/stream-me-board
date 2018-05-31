<template>
  <div>
    <BubbleContainer style="opacity: 0.75"/>
  </div>
</template>

<script>
import BubbleContainer from './BubbleContainer'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { BubbleContainer },
  created() { this.subscribeData() },
  methods: { ...mapActions(['subscribeData']) },
}
</script>

<style>
</style>
