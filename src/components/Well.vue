<template>
  <div class="shadow">
    <div class="border">
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  font-weight: bold;
  color: #f8ecd5;
  background-color: #3d3933;
  padding: 0px 3px;
  box-shadow: 0 -4px #3d3933, -4px 0 #3d3933, 0 4px #3d3933, 4px 0 #3d3933,
    -4px -4px #2a2e30, -4px 4px #2a2e30, 4px -4px #2a2e30, 4px 4px #2a2e30;
  box-sizing: border-box;
}
.border {
  padding: 4px;
  box-shadow: 0 -4px #2a2e30, -4px 0 #2a2e30, 0 4px #2a2e30, 4px 0 #2a2e30,
    -4px -4px #705749, -4px 4px #705749, 4px -4px #705749, 4px 4px #705749;
  box-sizing: border-box;
}
.shadow {
  padding: 4px;
  box-shadow: 0 -4px #86674d, -4px 0 #86674d, 0 4px #86674d, 4px 0 #86674d;
  box-sizing: border-box;
  margin: 8px 0px;
}
</style>