<template>
  <notifications group="notify" position="top left" width="auto" style="margin-top: 5px;">
    <template slot="body" slot-scope="props">
      <div class="notification vue-notification" :class="props.item.type">
        <i class="symbol" v-if="props.item.data.symbol" :class="`fas fa-${props.item.data.symbol}`" />
        <Avatar v-if="undefined!=props.item.data.avatar" :index="props.item.data.avatar" />
        <div class="notification-content" v-html="props.item.text" />
      </div>
    </template>
  </notifications>
</template>

<script>
import Avatar from '../Avatar'
export default {
  components: { Avatar }
}
</script>

<style>
.notification-content {
  font-size: 130%;
  line-height: 20px;
  margin-left: 5px;
}
.notification {
  display: flex;
  align-items: flex-end;
}
.symbol {
  font-size: 20px;
}
</style>