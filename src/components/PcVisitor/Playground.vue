<template>
  <DialogBox overflowY="auto">
    <Well>
      <div class="subtitle">在線圍觀的朋友們:</div>
      <div style="display:flex;">
        <UserAvatar v-for="(user, key) in onlineUser" :user="user" :key="key" />
      </div>
    </Well>
  </DialogBox>
</template>

<script>
import UnderlineText from '../UnderlineText'
import Well from '../Well'
import UserAvatar from './UserAvatar'
import DialogBox from '../DialogBox'
import { mapGetters } from 'vuex'

export default {
  components: { UnderlineText, Well, UserAvatar, DialogBox, },
  computed: { ...mapGetters(['onlineUser']) }
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: flex-start;
}
.subtitle {
  margin-bottom: 10px;
}
</style>