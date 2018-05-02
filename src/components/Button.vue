<template>
  <div class="border">
    <div class="content"><slot></slot></div>
    <div class="stroke color-4" style="height:calc(100% - 16px); top:14px; right:-2px;"></div>    
    <div class="stroke color-3" style="top:10px; right:-2px;"></div>    
    <div class="stroke color-4" style="bottom:-2px; right:2px;"></div>
    <div class="stroke color-5" style="bottom:2px; right:2px;"></div>    
    <div class="stroke color-5" style="width: calc(100% - 12px); bottom:-2px; left:6px;"></div>    
    <div class="stroke color-5" style="bottom:2px; left:2px;"></div>
    <div class="stroke color-bg" style="bottom:2px; left:10px;"></div>        
    <div class="stroke color-bg" style="bottom:2px; right:10px;"></div> 
    <div class="stroke color-3" style="width: calc(100% - 28px); bottom:2px; left:14px;"></div>        
    <div class="stroke color-1" style="top:2px; left:6px;"></div>
    <div class="stroke color-1" style="height:12px; top:6px; left:2px;"></div>        
  </div>
</template>

<style scoped>
.border {
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
.content {
  display: flex;
  flex-grow: 1;
  color: #f8ecd5;
  text-shadow: 0px 3px #705749;
  background-color: #927964;
  padding: 2px;
  margin: 4px;
  box-shadow: 0px -4px #aa8c6e, 0px 4px #aa8c6e, 4px 0px #aa8c6e,
    -4px 0px #aa8c6e;
  box-sizing: border-box;
  line-height: 120%;
}
</style>