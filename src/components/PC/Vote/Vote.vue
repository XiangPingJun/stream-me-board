<template>
  <DialogBox>
    <Voted v-if="voted"/>
    <WaitForVote v-if="!voted"/>
  </DialogBox>
</template>

<script>
import DialogBox from '../../DialogBox'
import WaitForVote from './WaitForVote'
import { mapGetters } from 'vuex'

export default {
  components: { WaitForVote, DialogBox, },
  computed: { ...mapGetters(['voted']) }
}
</script>

<style scoped>
</style>