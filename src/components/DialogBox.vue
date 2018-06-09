<template>
  <div class="dialog-border">
    <div class="dialog-content" :style="contentStyle" ref="content">
      <slot></slot>
    </div>
    <div class="stroke color-bg" style="width: 100%; top:2px; right:2px;"></div>    
    <div class="stroke color-2" style="top:-2px; right:2px;"></div>
    <div class="stroke color-2" style="top:2px; right:-2px;"></div>
    <div class="stroke color-1" style="top:-2px; left:2px;"></div>
    <div class="stroke color-1" style="top:2px; left:-2px;"></div>
    <div class="stroke color-2" style="bottom:-2px; left:2px;"></div>
    <div class="stroke color-2" style="bottom:2px; left:-2px;"></div>
    <div class="stroke color-2" style="bottom:-2px; right:2px;"></div>
    <div class="stroke color-2" style="bottom:2px; right:-2px;"></div>
    <div class="stroke color-bg" style="width:30%; top:-2px; right:6px;"></div>
    <div class="stroke color-bg" style="width:20px; top:-2px; left:14px;"></div>
    <div class="stroke color-bg" style="width:44px; top:-2px; left:54px;"></div>
    <div class="stroke color-bg" style="width:8px; top:-2px; left:108px;"></div>
    <div class="stroke color-2" style="width:8px; top:-2px; right:20%;"></div>
    <div class="stroke color-2" style="width:4px; top:-2px; right:10%;"></div>
    <div class="stroke color-bg" style="height:50%; bottom:2px; left:-2px;"></div>
    <div class="stroke color-2" style="bottom:40%; left:-2px;"></div>    
    <div class="stroke color-2" style="bottom:25%; left:-2px;"></div>
    <div class="stroke color-bg" style="bottom:-2px; left:6px;"></div>
    <div class="stroke color-3" style="bottom:-2px; left:10px;"></div>
    <div class="stroke color-bg" style="bottom:-2px; right:6px;"></div>
    <div class="stroke color-3" style="bottom:-2px; right:10px;"></div>
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
.dialog-border {
  display: flex;
  position: relative;
  flex-direction: column;
  margin-top: 8px;
  margin-bottom: 8px;
  transition-property: width, height;
  transition-duration: 0.25s;
}
.stroke {
  position: absolute;
  width: 0px;
  height: 0px;
  transition-duration: 0.25s;
}
.color-bg {
  box-shadow: 0 0 0 2px #927964;
}
.color-1 {
  box-shadow: 0 0 0 2px #c19d6f;
}
.color-2 {
  box-shadow: 0 0 0 2px #aa8c6e;
}
.color-3 {
  box-shadow: 0 0 0 2px #86674d;
}
.dialog-content {
  flex-grow: 1;
  min-width: 120px;
  color: #f8ecd5;
  text-shadow: 0px 3px #705749, 3px 3px #86674d;
  background-color: #927964;
  padding: 8px;
  box-shadow: 0px -4px #aa8c6e, -4px 0px #aa8c6e, 0px 4px #705749,
    0px 8px #2a2e30, 4px 0px #927964, -4px -4px #264e4a, -4px 4px #264e4a,
    4px -4px #57332d, 4px 4px #57332d;
  box-sizing: border-box;
  line-height: 20px;
  transition-property: width, height;
  transition-duration: 0.25s;
  line-height: 1.1em;
}
s {
  text-decoration: none;
  background-image: linear-gradient(
    transparent 7px,
    #cc1f1f 7px,
    #cc1f1f 9px,
    transparent 9px
  );
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