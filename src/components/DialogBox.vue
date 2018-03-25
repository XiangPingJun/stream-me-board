<template>
  <div style="margin:8px;">
    <div style="position:relative;">
      <div class="content">
        <slot></slot>
      </div>
      <div class="stroke color-2" style="top:-2px; right:2px;"></div>
      <div class="stroke color-2" style="top:2px; right:-2px;"></div>
      <div class="stroke color-1" style="top:-2px; left:2px;"></div>
      <div class="stroke color-1" style="top:2px; left:-2px;"></div>
      <div class="stroke color-2" style="bottom:-2px; left:2px;"></div>
      <div class="stroke color-2" style="bottom:2px; left:-2px;"></div>
      <div class="stroke color-2" style="bottom:-2px; right:2px;"></div>
      <div class="stroke color-2" style="bottom:2px; right:-2px;"></div>
      <div class="stroke color-bg" style="width:30%; top:-2px; right:6px;"></div>
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
  </div>
</template>

<style scoped>
.stroke {
  position: absolute;
  width: 0px;
  height: 0px;
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
.content {
  font-weight: bold;
  color: #f8ecd5;
  text-shadow: 0px 4px #705749;
  background-color: #927964;
  padding: 12px;
  box-shadow: 0px -4px #aa8c6e, -4px 0px #aa8c6e, 0px 4px #705749,
    0px 8px #2a2e30, 4px 0px #927964, -4px -4px #264e4a, -4px 4px #264e4a,
    4px -4px #57332d, 4px 4px #57332d;
  box-sizing: border-box;
}
</style>