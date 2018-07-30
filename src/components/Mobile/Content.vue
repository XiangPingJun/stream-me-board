<template>
  <div class="content-border">
    <div class="content-content" :style="contentStyle" ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['overflowX', 'overflowY'],
  computed: {
    contentStyle() {
      return {
        'overflow-x': this.overflowX,
        'overflow-y': this.overflowY
      }
    }
  }
}
</script>


<style scoped>
.content-border {
  display: flex;
  position: relative;
  flex-direction: column;
}
.content-content {
  flex-grow: 1;
  box-sizing: border-box;
  line-height: 25px;
  overflow-y: auto;
  padding: 4px 4px;
}
</style>