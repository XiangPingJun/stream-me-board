<template>
  <div class="border">
    <div class="content"><slot></slot></div>
    <div class="stroke color-4" style="top:2px; left:2px;"></div>    		
    <div class="stroke color-4" style="top:2px; right:2px;"></div>    		
		<div class="stroke color-4" style="bottom:2px; left:2px;"></div>    		
    <div class="stroke color-4" style="bottom:2px; right:2px;"></div> 
    <div class="stroke color-6" style="width:calc(100% - 12px); top:2px; left:6px;"></div> 
    <div class="stroke color-6" style="top:6px; left:2px;"></div> 
    <div class="stroke color-6" style="top:6px; right:2px;"></div> 
  </div>
</template>

<style scoped>
.border {
  display: flex;
  position: relative;
  flex-direction: column;
  margin: 0px;
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
  box-shadow: 0 0 0 2px #2a2e30;
}
.content {
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  color: #927964;
  text-shadow: 0px 3px #2a2e30;
  background-color: #3d3933;
  padding: 4px;
  box-sizing: border-box;
  line-height: 120%;
}
</style>