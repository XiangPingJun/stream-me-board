<template>
  <div>
    <BubbleContainer />
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
