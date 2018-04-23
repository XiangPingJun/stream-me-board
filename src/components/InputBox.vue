<template>
  <div class="border">
    <div class="content"><input /></div>
    <div class="stroke color-4" style="height:calc(100% - 16px); top:14px; right:-2px;"></div>    
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
  margin: 8px;
  box-shadow: 0px -4px #705749, 0px 4px #f8ecd5, 4px 0px #f8ecd5,
    -4px 0px #86674d, 0px -8px #f8ecd5, -8px 0px #f8ecd5;
  box-sizing: border-box;
  line-height: 120%;
}
.content input {
  background: none;
  border: none;
  width: 100%;
}
</style>