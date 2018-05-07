<template>
  <notifications group="notify" position="top left" width="auto" style="margin-top: 5px;">
    <template slot="body" slot-scope="props">
      <div class="notification vue-notification" :class="props.item.type">
        <i class="symbol" v-if="props.item.data.symbol" :class="`fas fa-${props.item.data.symbol}`" />
        <Thumbnail v-if="undefined!=props.item.data.thumbnail" :index="props.item.data.thumbnail" />
        <div class="notification-content" v-html="props.item.text" />
      </div>
    </template>
  </notifications>
</template>

<script>
import Thumbnail from '../Thumbnail'
export default {
  components: { Thumbnail }
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