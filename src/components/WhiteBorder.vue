<template>
  <div class="white-border">
    <div class="white-content"></div>
    <div class="stroke color-6" style="width:calc(100% - 16px); top:2px; left:6px;"></div>
    <div class="stroke color-4" style="width:calc(100% - 16px); top:6px; left:6px;"></div>
    <div class="stroke color-3" style="height:calc(100% - 16px); top:6px; left:6px;"></div>
    <div class="stroke color-6" style="width:calc(100% - 16px); bottom:6px; left:6px;"></div>    
    <div class="stroke color-6" style="height:calc(100% - 16px); top:6px; left:2px;"></div>    
    <div class="stroke color-6" style="height:calc(100% - 16px); top:6px; right:6px;"></div>        
    <div class="stroke color-2" style="top:2px; left:2px;"></div>
    <div class="stroke color-2" style="bottom:6px; left:2px;"></div>
    <div class="stroke color-2" style="top:2px; right:6px;"></div>
    <div class="stroke color-2" style="bottom:6px; right:6px;"></div>
    <div class="stroke color-4" style="width:calc(100% - 16px); bottom:2px; left:6px;"></div>    
    <div class="stroke color-3" style="bottom:2px; right:6px;"></div>
    <div class="stroke color-3" style="height:calc(100% - 16px); top:10px; right:2px;"></div>        
  </div>
</template>

<style scoped>
.white-border {
  display: flex;
  position: relative;
  flex-direction: column;
}
.stroke {
  position: absolute;
  width: 0px;
  height: 0px;
}
.color-red {
  box-shadow: 0 0 0 2px red;
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
.color-4 {
  box-shadow: 0 0 0 2px #705749;
}
.color-5 {
  box-shadow: 0 0 0 2px #544035;
}
.color-6 {
  box-shadow: 0 0 0 2px #f8ecd5;
}
.white-content {
  display: flex;
  margin: 8px;
}
</style>