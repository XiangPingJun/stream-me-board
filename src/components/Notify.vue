<template>
  <notifications group="notify" position="top left" width="auto" style="margin-top: 5px;">
    <template slot="body" slot-scope="props">
      <div class="notification vue-notification" :class="props.item.type" :style="style">
        <i v-if="props.item.data.symbol" :class="`fas fa-${props.item.data.symbol}`"/>
        <Avatar v-if="undefined!=props.item.data.avatar" :index="props.item.data.avatar"/>
        <span v-html="props.item.text" style="margin-left:5px;"/>
      </div>
    </template>
  </notifications>
</template>

<script>
import Avatar from './Avatar'
export default {
  components: { Avatar },
  props: ['large'],
  computed: {
    style() {
      return this.large ? {
        'font-size': '130%',
        'line-height': '20px'
      } : ''
    }
  }
}
</script>

<style>
.notification {
  text-shadow: none;
  display: flex;
  align-items: center;
}
</style>