<template>
  <div class="pie-wrapper">
    <div class="pie" :class="{'over-half': rate > 0.5}">
      <div :style="leftStyle" class="half-circle shadow"></div>
      <div :style="leftStyle" class="half-circle"></div>
      <div v-if="rate > 0.5" class="half-circle right-side shadow"></div>			
      <div v-if="rate > 0.5" class="half-circle right-side"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rate'],
  computed: {
    leftStyle() { return { transform: `rotate(${360 * this.rate}deg)` } }
  }
}
</script>

<style>
.pie-wrapper *,
.pie-wrapper *:before,
.pie-wrapper *:after {
  box-sizing: border-box;
}
.pie-wrapper {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  height: 1em;
  width: 1em;
  position: relative;
}
.pie-wrapper:nth-child(3n + 1) {
  clear: both;
}
.pie-wrapper .pie {
  height: 100%;
  width: 100%;
  clip: rect(0, 1.1em, 1.1em, 0.5em);
  left: 0;
  position: absolute;
  top: 0;
}
.pie-wrapper .pie.over-half {
  clip: rect(0, 1.1em, 1.1em, 0em);
}
.pie-wrapper .pie .half-circle {
  height: 100%;
  width: 100%;
  border: 0.175em solid #f8ecd5;
  border-radius: 50%;
  clip: rect(0, 0.5em, 1em, 0);
  left: 0;
  position: absolute;
  top: 0;
}
.pie-wrapper .pie .half-circle.shadow {
  border: 0.175em solid #86674d;
  top: 3px;
}
/*.pie-wrapper .bg {
  height: 100%;
  width: 100%;
  border: 0.2em solid #f8ecd5;
  border-radius: 50%;
}*/
.pie-wrapper .pie .right-side {
  transform: rotate(180deg);
}
</style>