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
  line-height: 20px;
}
::-webkit-scrollbar-track {
  background-color: #aa8c6e;
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: #3d3933;
}
::-webkit-scrollbar-button {
  width: 7px;
  height: 7px;
}
</style>